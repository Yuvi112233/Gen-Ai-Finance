import matplotlib.pyplot as plt
from datetime import datetime
import smtplib
import re
import os
import json
from email.message import EmailMessage
import google.generativeai as genai
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables
load_dotenv()

# Email Configuration
EMAIL_SENDER = os.getenv("EMAIL_SENDER", "")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD", "")
USER_DATA_FILE = "user_data.json"

# Set Gemini API Key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
genai.configure(api_key=GEMINI_API_KEY)

def validate_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not re.match(pattern, email):
        return False
    valid_domains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com"]
    domain = email.split('@')[-1]
    return domain in valid_domains

def validate_phone(phone):
    pattern = r'^[0-9]{10}$'
    return re.match(pattern, phone) is not None

def parse_number(value):
    try:
        return float(re.sub(r'[, ]', '', value))
    except ValueError:
        return 0

def load_user_data():
    if os.path.exists(USER_DATA_FILE):
        with open(USER_DATA_FILE, 'r') as file:
            users = json.load(file)
            for user_key, user_data in users.items():
                if 'budget_history' in user_data:
                    for i, date_str in enumerate(user_data['budget_history'].get('income_date', [])):
                        if isinstance(date_str, str):
                            user_data['budget_history']['income_date'][i] = datetime.fromisoformat(date_str)
                    for i, date_str in enumerate(user_data['budget_history'].get('expense_date', [])):
                        if isinstance(date_str, str):
                            user_data['budget_history']['expense_date'][i] = datetime.fromisoformat(date_str)
            return users
    return {}

def save_user_data(users):
    users_copy = users.copy()
    for user_key, user_data in users_copy.items():
        if 'budget_history' in user_data:
            for i, date in enumerate(user_data['budget_history'].get('income_date', [])):
                if isinstance(date, datetime):
                    user_data['budget_history']['income_date'][i] = date.isoformat()
            for i, date in enumerate(user_data['budget_history'].get('expense_date', [])):
                if isinstance(date, datetime):
                    user_data['budget_history']['expense_date'][i] = date.isoformat()
    with open(USER_DATA_FILE, 'w') as file:
        json.dump(users_copy, file, indent=4)

class Budget:
    def __init__(self, username, email, phone):
        self.username = username
        self.email = email
        self.phone = phone
        self.balance = 0
        self.expenses = {}
        self.monthly_goals = 0
        self.yearly_goals = 0
        self.monthly_bills = {}
        self.future_plans = []
        self.budget_history = {
            'income_value': [], 'income_category': [], 'income_date': [],
            'expense_value': [], 'expense_category': [], 'expense_date': []
        }
        self.savings = 0

    def ensure_budget_history(self):
        required_keys = ['income_value', 'income_category', 'income_date', 'expense_value', 'expense_category', 'expense_date']
        for key in required_keys:
            if key not in self.budget_history:
                self.budget_history[key] = []

    def to_dict(self):
        return {
            'username': self.username,
            'email': self.email,
            'phone': self.phone,
            'balance': self.balance,
            'expenses': self.expenses,
            'monthly_goals': self.monthly_goals,
            'yearly_goals': self.yearly_goals,
            'monthly_bills': self.monthly_bills,
            'future_plans': self.future_plans,
            'budget_history': self.budget_history,
            'savings': self.savings
        }

    def add_income(self):
        amount = parse_number(input("Enter income amount: "))
        category = input("Enter income source: ")
        self.balance += amount
        self.budget_history['income_value'].append(amount)
        self.budget_history['income_category'].append(category)
        self.budget_history['income_date'].append(datetime.now())
        print(f"Income added: ₹{amount:.2f} from {category}")

    def add_expenses(self):
        categories = ['Entertainment', 'Rent', 'Electricity', 'Grocery', 'Savings']
        total_expense = 0
        for category in categories:
            amount = parse_number(input(f"Enter monthly expense for {category}: "))
            if amount > 0:
                self.expenses[category] = amount
                self.budget_history['expense_value'].append(amount)
                self.budget_history['expense_category'].append(category)
                self.budget_history['expense_date'].append(datetime.now())
                total_expense += amount
                if category == 'Savings':
                    self.savings += amount
        self.balance -= total_expense
        print(f"Total expenses added: ₹{total_expense:.2f}")

    def set_goals(self):
        self.monthly_goals = parse_number(input("Enter your monthly savings goal: "))
        self.yearly_goals = parse_number(input("Enter your yearly savings goal: "))
        print(f"Goals set: Monthly: ₹{self.monthly_goals:.2f}, Yearly: ₹{self.yearly_goals:.2f}")

    def add_monthly_bill(self):
        bill_name = input("Enter bill name: ")
        bill_amount = parse_number(input("Enter bill amount: "))
        due_date = int(input("Enter due date (day of month): "))
        self.monthly_bills[bill_name] = {'amount': bill_amount, 'due_date': due_date}
        print(f"Bill added: {bill_name} - ₹{bill_amount:.2f}, due on day {due_date}")

    def check_reminders(self):
        today = datetime.today().day
        print("Upcoming Monthly Bills:")
        for bill, details in self.monthly_bills.items():
            if details['due_date'] - today <= 3:
                print(f"{bill} is due in {details['due_date'] - today} days: ₹{details['amount']:.2f}")

    def add_future_plan(self):
        plan = input("Enter your future plan (e.g., buy a car, travel, invest): ")
        amount = parse_number(input("Estimated amount required: "))
        self.future_plans.append({'plan': plan, 'amount': amount})
        print(f"Future plan added: {plan} - ₹{amount:.2f}")

    def generate_expense_chart(self):
        colors = ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#ff99cc']
        plt.figure(figsize=(6, 6))
        plt.pie(self.budget_history['expense_value'], 
                labels=self.budget_history['expense_category'], 
                autopct='%1.1f%%', 
                startangle=140, 
                colors=colors, 
                shadow=True, 
                textprops={'fontsize': 12},
                labeldistance=1.1, 
                pctdistance=0.6, 
                wedgeprops={'edgecolor': 'black', 'linewidth': 0.5})
        plt.title('Expense Allocation', fontsize=14, pad=20)
        plt.axis('equal')
        filename = "expense_chart.png"
        plt.savefig(filename, bbox_inches='tight')
        plt.close()
        print(f"Expense chart saved as {filename}. Opening now...")
        if os.name == 'nt':
            os.startfile(filename)
        else:
            print("Please open 'expense_chart.png' manually.")

    def plot_expense_evolution(self):
        if not self.budget_history['expense_value']:
            print("No expenses recorded yet.")
            return
        dates = [date.day for date in self.budget_history['expense_date']]
        values = [float(value) for value in self.budget_history['expense_value']]
        plt.figure(figsize=(8, 5))
        plt.plot(dates, values, marker='o', linestyle='-', color='b', label="Expenses")
        plt.xlabel("Day of Month")
        plt.ylabel("Expense Amount (₹)")
        plt.title("Expense Evolution Over Time")
        plt.xticks(rotation=45)
        plt.legend()
        plt.grid()
        plt.savefig("expense_evolution.png")
        plt.close()
        print("Expense evolution graph saved as 'expense_evolution.png'. Opening now...")
        if os.name == 'nt':
            os.startfile("expense_evolution.png")
        else:
            print("Please open 'expense_evolution.png' manually.")

    def send_email_summary(self, username, email):
        print("Starting email summary process")
        try:
            msg = EmailMessage()
            msg['Subject'] = "Your Monthly Budget Report"
            msg['From'] = EMAIL_SENDER
            msg['To'] = email
            print(f"Sending to: {email} from: {EMAIL_SENDER}")

            # Use provided data instead of mock data
            self.username = username
            self.email = email
            self.__dict__.update({
                k: v for k, v in self.__dict__.items() 
                if k not in ['username', 'email']  # Avoid overwriting username and email
            })

            prompt = f"""
            My current financial status:
            - Balance: ₹{self.balance}
            - Monthly Savings Goal: ₹{self.monthly_goals}
            - Yearly Savings Goal: ₹{self.yearly_goals}
            - Monthly Expenses: {[f'₹{x}' for x in self.budget_history['expense_value']]}
            - Expense Categories: {self.budget_history['expense_category']}
            - Future Plans: {self.future_plans}

            Based on this data, provide financial advice, spending optimization strategies, and savings plans in 50 words or less.
            """

            try:
                model = genai.GenerativeModel("gemini-1.5-pro")
                response = model.generate_content(prompt)
                suggestions = response.text.strip()
                print("Gemini suggestions:", suggestions)
            except Exception as e:
                suggestions = f"Could not generate suggestions due to: {str(e)}"
                print("Gemini error:", str(e))

            expenses_str = " | ".join([f"{category}: ₹{amount:.2f}" for category, amount in self.expenses.items()])
            total_expenses = sum(self.expenses.values())
            net_monthly_loss = total_expenses - self.balance if total_expenses > self.balance else 0

            summary = f"""
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Your Monthly Budget Report</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
<div style="background-color: #4a90e2; text-align: center; padding: 20px;">
<h1 style="color: #ffffff; margin: 0; font-size: 24px;">Your Monthly Budget Report</h1>
</div>
<div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
<h2 style="color: #333333; font-size: 20px;">Dear {self.username},</h2>
<p style="color: #666666; font-size: 16px; line-height: 1.5;">Here's your financial snapshot for this month:</p>
<div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
    <p style="color: #333333; font-size: 16px; margin: 5px 0;"><strong>Balance:</strong> ₹{self.balance:.2f}</p>
    <p style="color: #333333; font-size: 16px; margin: 5px 0;"><strong>Total Expenses:</strong> ₹{total_expenses:.2f}</p>
    <p style="color: #666666; font-size: 14px; margin: 5px 0 10px;">({expenses_str})</p>
    <p style="color: #333333; font-size: 16px; margin: 5px 0;"><strong>Net Loss:</strong> ₹{net_monthly_loss:.2f}</p>
    <p style="color: #333333; font-size: 16px; margin: 5px 0;"><strong>Goals:</strong> Monthly: ₹{self.monthly_goals:.2f} | Yearly: ₹{self.yearly_goals:.2f}</p>
</div>
<h3 style="color: #4a90e2; font-size: 18px; margin-bottom: 10px;">Your Financial Reality</h3>
<p style="color: #666666; font-size: 16px; line-height: 1.5;">You're spending ₹{total_expenses:.2f} per month, which exceeds your balance, resulting in a net loss of ₹{net_monthly_loss:.2f}. Immediate action is needed to align your spending with your financial goals.</p>
<h3 style="color: #4a90e2; font-size: 18px; margin-bottom: 10px;">Action Plan</h3>
<ul style="color: #666666; font-size: 16px; line-height: 1.5; padding-left: 20px; margin: 0;">
    <li><strong>Cut Expenses:</strong> Reduce entertainment and electricity by 50%.</li>
    <li><strong>Boost Income:</strong> Explore a side hustle or negotiate a raise.</li>
    <li><strong>Set Realistic Goals:</strong> Adjust savings to match your income.</li>
</ul>
<h3 style="color: #4a90e2; font-size: 18px; margin-bottom: 10px; margin-top: 20px;">Next Steps</h3>
<p style="color: #666666; font-size: 16px; line-height: 1.5;">Please share your income details for a tailored financial plan. We're here to help you achieve your goals!</p>
</div>
<div style="text-align: center; padding: 10px; background-color: #4a90e2; color: #ffffff;">
<p style="margin: 0; font-size: 14px;">Warm regards,<br>Your Budget Manager<br><a href="mailto:support@budgetmanager.com" style="color: #ffffff; text-decoration: underline;">Contact Us</a></p>
</div>
</body>
</html>
"""
            msg.set_content(summary, subtype='html')

            if os.path.exists("expense_chart.png"):
                with open("expense_chart.png", 'rb') as file:
                    msg.add_attachment(file.read(), maintype='image', subtype='png', filename='expense_chart.png')

            with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
                print("Logging into SMTP server")
                server.login(EMAIL_SENDER, EMAIL_PASSWORD)
                print("Sending email")
                server.send_message(msg)
                print("Email sent successfully")
                return {"success": True, "message": "Email sent successfully!"}

        except smtplib.SMTPAuthenticationError as e:
            print("SMTP Authentication Error:", str(e))
            return {"success": False, "message": f"Authentication failed: {str(e)}. Ensure App Password is used with 2FA or enable Less Secure Apps."}
        except smtplib.SMTPException as e:
            print("SMTP Error:", str(e))
            return {"success": False, "message": f"SMTP error: {str(e)}. Check internet connection or try port 587 with STARTTLS."}
        except Exception as e:
            print("Unexpected Error:", str(e))
            return {"success": False, "message": f"Unexpected error: {str(e)}"}

    def get_suggestions_from_gemini(self):
        prompt = f"""
        My current financial status:
        - Balance: ₹{self.balance}
        - Monthly Savings Goal: ₹{self.monthly_goals}
        - Yearly Savings Goal: ₹{self.yearly_goals}
        - Monthly Expenses: {[f'₹{x}' for x in self.budget_history['expense_value']]}
        - Expense Categories: {self.budget_history['expense_category']}
        - Future Plans: {self.future_plans}

        Based on this data, provide financial advice, spending optimization strategies, and savings plans. Suggest how I can meet my goals efficiently.
        """

        try:
            model = genai.GenerativeModel("gemini-1.5-pro")
            response = model.generate_content(prompt)
            suggestions = response.text.strip()

            with open("financial_suggestions.txt", "w", encoding="utf-8") as file:
                file.write(suggestions)

            print("\nFinancial analysis and suggestions saved as 'financial_suggestions.txt'. Opening now...")
            if os.name == 'nt':
                os.startfile("financial_suggestions.txt")
        except Exception as e:
            print(f"Failed to get suggestions: {str(e)}")

    @staticmethod
    def process_form(form_data):
        try:
            username = form_data['name'].split()[0]
            email = form_data['email']
            phone = form_data['phone']
            
            if not validate_email(email):
                return {"success": False, "message": "Invalid email format or domain"}
            
            if not validate_phone(phone):
                return {"success": False, "message": "Invalid phone number format"}
                
            user_key = f"{username}-{email}-{phone}"
            users = load_user_data()
            
            if user_key in users:
                return {"success": True, "message": "User already exists", "existing_user": True}
            
            budget = Budget(username, email, phone)
            users[user_key] = budget.to_dict()
            save_user_data(users)
            
            return {"success": True, "message": "User registered successfully", "user_key": user_key}
        except Exception as e:
            return {"success": False, "message": f"Error processing form: {str(e)}"}

app = FastAPI()

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://gen-ai-finance-front-end.onrender.com/"],  # Match your frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
async def root():
    return {"message": "Budget Management API is running"}

@app.post("/simple_test_email")
async def simple_test_email(data: dict):
    email = data.get("email")
    username = data.get("username", "User")
    if not email or not validate_email(email):
        return {"success": False, "message": "Invalid email address"}
    try:
        msg = EmailMessage()
        msg['Subject'] = "Test Email"
        msg['From'] = EMAIL_SENDER
        msg['To'] = email
        msg.set_content(f"Hello {username}, this is a test email from your Budget Manager.")
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(EMAIL_SENDER, EMAIL_PASSWORD)
            server.send_message(msg)
        return {"success": True, "message": "Test email sent successfully!"}
    except smtplib.SMTPAuthenticationError as e:
        return {"success": False, "message": f"Authentication failed: {str(e)}"}
    except smtplib.SMTPException as e:
        return {"success": False, "message": f"SMTP error: {str(e)}"}
    except Exception as e:
        return {"success": False, "message": f"Unexpected error: {str(e)}"}

@app.post("/send_email_summary")
async def send_email_summary(data: dict):
    print("Request received at /send_email_summary")
    print("Received data:", data)
    username = data.get("username", "User")
    email = data.get("email")
    if not email or not validate_email(email):
        print("Invalid email detected")
        return {"success": False, "message": "Invalid email address"}
    budget = Budget(username, email, data.get("phone", "1234567890"))
    print("Budget object created:", budget.to_dict())
    budget.__dict__.update(data)
    print("Budget updated with data:", budget.to_dict())
    try:
        result = budget.send_email_summary(username, email)
        print("Email summary result:", result)
        return result
    except Exception as e:
        print("Error in send_email_summary:", str(e))
        return {"success": False, "message": f"Error: {str(e)}"}

@app.post("/process_form")
async def process_form_endpoint(form_data: dict):
    return Budget.process_form(form_data)

if __name__ == "__main__":
    pass  # Empty block to avoid running CLI when using uvicorn