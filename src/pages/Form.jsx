import React, { useState } from "react";
import ExpenseChart from "../components/ExpenseChart";

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    occupation: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState({ success: null, message: "" });
  const [submittedData, setSubmittedData] = useState(null);
  const [budgetData, setBudgetData] = useState(null);
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [showAddBillForm, setShowAddBillForm] = useState(false);
  const [showFuturePlanForm, setShowFuturePlanForm] = useState(false);
  const [budgetFormData, setBudgetFormData] = useState({
    income: "",
    incomeSource: "",
    expenses: {
      Entertainment: "",
      Rent: "",
      Electricity: "",
      Grocery: "",
      Savings: ""
    },
    monthlyGoal: "",
    yearlyGoal: ""
  });
  
  const [billFormData, setBillFormData] = useState({
    billName: "",
    billAmount: "",
    dueDate: ""
  });
  
  const [futurePlanData, setFuturePlanData] = useState({
    planName: "",
    planAmount: ""
  });

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBudgetChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("expense_")) {
      const expenseCategory = name.replace("expense_", "");
      setBudgetFormData({
        ...budgetFormData,
        expenses: {
          ...budgetFormData.expenses,
          [expenseCategory]: value
        }
      });
    } else {
      setBudgetFormData({ ...budgetFormData, [name]: value });
    }
  };

  const validateEmail = (email) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com"];
    
    if (!pattern.test(email)) return false;
    
    const domain = email.split('@')[1];
    return validDomains.includes(domain);
  };

  const validatePhone = (phone) => {
    const pattern = /^[0-9]{10}$/;
    return pattern.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult({ success: null, message: "" });

    try {
      if (!validateEmail(formData.email)) {
        throw new Error("Invalid email format or domain. Please use gmail.com, yahoo.com, outlook.com, hotmail.com, or icloud.com.");
      }

      if (!validatePhone(formData.phone)) {
        throw new Error("Invalid phone number format. Please enter a 10-digit number.");
      }

      const userData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
        occupation: formData.occupation
      };

      setSubmittedData(userData);
      
      const budgetObj = {
        username: formData.firstName,
        email: formData.email,
        phone: formData.phone,
        balance: 0,
        expenses: {},
        monthly_goals: 0,
        yearly_goals: 0,
        monthly_bills: {},
        future_plans: [],
        budget_history: {
          income_value: [],
          income_category: [],
          income_date: [],
          expense_value: [],
          expense_category: [],
          expense_date: []
        },
        savings: 0
      };

      setBudgetData(budgetObj);
      setShowBudgetForm(true);
      
      setSubmitResult({
        success: true,
        message: "Information submitted successfully! Please complete your budget information."
      });
    } catch (error) {
      setSubmitResult({
        success: false,
        message: error.message || "An error occurred while submitting the form."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    
    try {
      const updatedBudget = { ...budgetData };
      
      if (budgetFormData.income && budgetFormData.incomeSource) {
        updatedBudget.balance += parseFloat(budgetFormData.income);
        updatedBudget.budget_history.income_value.push(parseFloat(budgetFormData.income));
        updatedBudget.budget_history.income_category.push(budgetFormData.incomeSource);
        updatedBudget.budget_history.income_date.push(new Date().toISOString());
      }
      
      let totalExpenses = 0;
      Object.entries(budgetFormData.expenses).forEach(([category, value]) => {
        if (value && parseFloat(value) > 0) {
          const amount = parseFloat(value);
          updatedBudget.expenses[category] = amount;
          updatedBudget.budget_history.expense_value.push(amount);
          updatedBudget.budget_history.expense_category.push(category);
          updatedBudget.budget_history.expense_date.push(new Date().toISOString());
          totalExpenses += amount;
          
          if (category === "Savings") {
            updatedBudget.savings += amount;
          }
        }
      });
      
      updatedBudget.balance -= totalExpenses;
      
      if (budgetFormData.monthlyGoal) {
        updatedBudget.monthly_goals = parseFloat(budgetFormData.monthlyGoal);
      }
      
      if (budgetFormData.yearlyGoal) {
        updatedBudget.yearly_goals = parseFloat(budgetFormData.yearlyGoal);
      }
      
      setBudgetData(updatedBudget);
      
      setSubmitResult({
        success: true,
        message: "Budget information saved successfully! You can now view your expense breakdown below."
      });
    } catch (error) {
      setSubmitResult({
        success: false,
        message: error.message || "An error occurred while saving budget information."
      });
    }
  };

  const handleBillFormChange = (e) => {
    const { name, value } = e.target;
    setBillFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFuturePlanChange = (e) => {
    const { name, value } = e.target;
    setFuturePlanData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAddBill = (e) => {
    e.preventDefault();
    
    try {
      if (!billFormData.billName || !billFormData.billAmount || !billFormData.dueDate) {
        throw new Error("Please fill in all bill details");
      }
      
      const updatedBudget = { ...budgetData };
      updatedBudget.monthly_bills[billFormData.billName] = {
        amount: parseFloat(billFormData.billAmount),
        due_date: parseInt(billFormData.dueDate)
      };
      
      setBudgetData(updatedBudget);
      
      setBillFormData({
        billName: "",
        billAmount: "",
        dueDate: ""
      });
      
      setSubmitResult({
        success: true,
        message: `Monthly bill "${billFormData.billName}" added successfully!`
      });
    } catch (error) {
      setSubmitResult({
        success: false,
        message: error.message || "An error occurred while adding the bill."
      });
    }
  };
  
  const handleAddFuturePlan = (e) => {
    e.preventDefault();
    
    try {
      if (!futurePlanData.planName || !futurePlanData.planAmount) {
        throw new Error("Please fill in all future plan details");
      }
      
      const updatedBudget = { ...budgetData };
      updatedBudget.future_plans.push({
        plan: futurePlanData.planName,
        amount: parseFloat(futurePlanData.planAmount)
      });
      
      setBudgetData(updatedBudget);
      
      setFuturePlanData({
        planName: "",
        planAmount: ""
      });
      
      setSubmitResult({
        success: true,
        message: `Future plan "${futurePlanData.planName}" added successfully!`
      });
    } catch (error) {
      setSubmitResult({
        success: false,
        message: error.message || "An error occurred while adding the future plan."
      });
    }
  };

  const handleSendEmailSummary = async () => {
    setShowEmailModal(true);
    console.log("Sending email with data:", JSON.stringify(budgetData));
  
    if (!budgetData || !budgetData.email) {
      console.error("Missing email address or budget data");
      setEmailSent(true);
      return;
    }
  
    const backendUrl = process.env.NODE_ENV === 'production'
      ? 'https://gen-ai-finance-back-end.onrender.com'
      : 'http://localhost:8000';
  
    try {
      const response = await fetch(`${backendUrl}/send_email_summary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(budgetData), // Send full budget data
      });
  
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Email Summary Response:', data);
      if (!data.success) {
        console.error('Email sending failed:', data.message);
        throw new Error(data.message || 'Email sending failed');
      }
      setEmailSent(true);
    } catch (error) {
      console.error('Error sending email summary:', error);
      setEmailSent(true); // Show modal even on error for user feedback
    }
  };

  const renderEmailModal = () => {
    if (!showEmailModal) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl">
          <div className="text-center">
            {!emailSent ? (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <h3 className="text-xl font-bold mb-2">Sending Email Summary...</h3>
                <p className="text-gray-600">Please wait while we prepare and send your budget report.</p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Email Sent Successfully!</h3>
                <p className="text-gray-600 mb-6">A budget summary has been sent to {budgetData.email}</p>
                
                <div className="border rounded-lg p-4 mb-6 bg-gray-50">
                  <h4 className="font-medium mb-2 text-left">Email Preview:</h4>
                  <div className="text-left space-y-3">
                    <p><strong>Subject:</strong> Your Monthly Budget Report</p>
                    <p><strong>From:</strong> Budget Tracker</p>
                    <p><strong>To:</strong> {budgetData.email}</p>
                    <hr className="my-2" />
                    <p>Dear {budgetData.username},</p>
                    <p>Here's your financial snapshot for this month:</p>
                    <p>Current Balance: ₹{budgetData.balance.toFixed(2)}</p>
                    <p>Monthly Expenses: ₹{Object.values(budgetData.expenses).reduce((sum, val) => sum + val, 0).toFixed(2)}</p>
                    <p>Savings: ₹{budgetData.savings.toFixed(2)}</p>
                    <p>Monthly Savings Goal: ₹{budgetData.monthly_goals.toFixed(2)}</p>
                    <p>Keep up the good work!</p>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderExpenseChart = () => {
    if (!budgetData || !budgetData.expenses || Object.keys(budgetData.expenses).length === 0) {
      return null;
    }

    const total = Object.values(budgetData.expenses).reduce((sum, val) => sum + val, 0);

    return (
      <div className="mt-8">
        <ExpenseChart expenses={budgetData.expenses} />
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Budget Summary:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 border rounded-lg">
              <div className="text-sm text-gray-500">Current Balance</div>
              <div className={`text-xl font-bold ${budgetData.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₹{budgetData.balance.toFixed(2)}
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="text-sm text-gray-500">Total Expenses</div>
              <div className="text-xl font-bold text-red-600">₹{total.toFixed(2)}</div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="text-sm text-gray-500">Savings</div>
              <div className="text-xl font-bold text-green-600">₹{budgetData.savings.toFixed(2)}</div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="text-sm text-gray-500">Monthly Goal</div>
              <div className="text-xl font-bold">₹{budgetData.monthly_goals.toFixed(2)}</div>
            </div>
          </div>
          
          <div className="mt-6 space-y-2">
            <button
              onClick={() => window.print()}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white p-2 rounded-lg font-medium text-sm"
            >
              Print Budget Report
            </button>
            
            <button
              onClick={handleSendEmailSummary}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg font-medium text-sm"
            >
              Email Budget Summary
            </button>
            
            <button
              onClick={() => setShowAddBillForm(prev => !prev)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg font-medium text-sm"
            >
              {showAddBillForm ? "Hide Bill Form" : "Add Monthly Bill"}
            </button>
            
            <button
              onClick={() => setShowFuturePlanForm(prev => !prev)}
              className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg font-medium text-sm"
            >
              {showFuturePlanForm ? "Hide Plan Form" : "Add Future Plan"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderMonthlyBills = () => {
    if (!budgetData || !budgetData.monthly_bills || Object.keys(budgetData.monthly_bills).length === 0) {
      return <p className="text-center text-gray-500 py-4">No monthly bills added yet.</p>;
    }
    
    return (
      <div className="mt-4">
        <h4 className="font-medium mb-2">Your Monthly Bills:</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Bill Name</th>
                <th className="py-2 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Amount</th>
                <th className="py-2 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Object.entries(budgetData.monthly_bills).map(([name, details]) => {
                const today = new Date().getDate();
                const daysUntilDue = details.due_date - today;
                const isUpcoming = daysUntilDue <= 3 && daysUntilDue >= 0;
                
                return (
                  <tr key={name} className={isUpcoming ? "bg-yellow-50" : ""}>
                    <td className="py-2 px-4 text-sm">{name}</td>
                    <td className="py-2 px-4 text-sm">₹{details.amount.toFixed(2)}</td>
                    <td className="py-2 px-4 text-sm">
                      Day {details.due_date}
                      {isUpcoming && (
                        <span className="ml-2 inline-block bg-yellow-100 text-yellow-800 text-xs px-2 rounded-full">
                          Due {daysUntilDue === 0 ? "today" : `in ${daysUntilDue} days`}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  const renderFuturePlans = () => {
    if (!budgetData || !budgetData.future_plans || budgetData.future_plans.length === 0) {
      return <p className="text-center text-gray-500 py-4">No future plans added yet.</p>;
    }
    
    return (
      <div className="mt-4">
        <h4 className="font-medium mb-2">Your Future Plans:</h4>
        <div className="grid grid-cols-1 gap-3">
          {budgetData.future_plans.map((plan, index) => (
            <div key={index} className="p-3 bg-blue-50 rounded-lg">
              <div className="font-medium">{plan.plan}</div>
              <div className="text-sm text-gray-600">Estimated amount: ₹{plan.amount.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {renderEmailModal()}
      
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {showBudgetForm ? "Budget Information" : "User Information Form"}
        </h2>
        
        {submitResult.success !== null && (
          <div className={`p-3 mb-4 rounded-lg ${submitResult.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {submitResult.message}
          </div>
        )}
        
        {!showBudgetForm ? (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="Zip Code"
                className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                placeholder="Occupation"
                className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full ${isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white p-3 rounded-lg font-semibold transition-all`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        ) : (
          <>
            <form className="space-y-4" onSubmit={handleBudgetSubmit}>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Income Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Income Amount
                    </label>
                    <input
                      type="number"
                      name="income"
                      value={budgetFormData.income}
                      onChange={handleBudgetChange}
                      placeholder="Enter income amount"
                      className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Income Source
                    </label>
                    <input
                      type="text"
                      name="incomeSource"
                      value={budgetFormData.incomeSource}
                      onChange={handleBudgetChange}
                      placeholder="Enter income source"
                      className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold pt-2">Monthly Expenses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.keys(budgetFormData.expenses).map(category => (
                    <div key={category}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {category}
                      </label>
                      <input
                        type="number"
                        name={`expense_${category}`}
                        value={budgetFormData.expenses[category]}
                        onChange={handleBudgetChange}
                        placeholder={`Enter ${category.toLowerCase()} expense`}
                        className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  ))}
                </div>
                
                <h3 className="text-lg font-semibold pt-2">Savings Goals</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Monthly Savings Goal
                    </label>
                    <input
                      type="number"
                      name="monthlyGoal"
                      value={budgetFormData.monthlyGoal}
                      onChange={handleBudgetChange}
                      placeholder="Enter monthly goal"
                      className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Yearly Savings Goal
                    </label>
                    <input
                      type="number"
                      name="yearlyGoal"
                      value={budgetFormData.yearlyGoal}
                      onChange={handleBudgetChange}
                      placeholder="Enter yearly goal"
                      className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold transition-all"
              >
                Save Budget Information
              </button>
            </form>
            
            {renderExpenseChart()}
            
            {showAddBillForm && (
              <div className="mt-6 p-4 bg-white rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-3">Add Monthly Bill</h3>
                <form onSubmit={handleAddBill} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bill Name
                      </label>
                      <input
                        type="text"
                        name="billName"
                        value={billFormData.billName}
                        onChange={handleBillFormChange}
                        placeholder="e.g., Netflix"
                        className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Amount
                      </label>
                      <input
                        type="number"
                        name="billAmount"
                        value={billFormData.billAmount}
                        onChange={handleBillFormChange}
                        placeholder="Enter amount"
                        className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Due Date (Day of Month)
                      </label>
                      <input
                        type="number"
                        name="dueDate"
                        value={billFormData.dueDate}
                        onChange={handleBillFormChange}
                        placeholder="1-31"
                        min="1"
                        max="31"
                        className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg font-medium"
                  >
                    Add Bill
                  </button>
                </form>
                
                {renderMonthlyBills()}
              </div>
            )}
            
            {showFuturePlanForm && (
              <div className="mt-6 p-4 bg-white rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-3">Add Future Plan</h3>
                <form onSubmit={handleAddFuturePlan} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Plan Description
                      </label>
                      <input
                        type="text"
                        name="planName"
                        value={futurePlanData.planName}
                        onChange={handleFuturePlanChange}
                        placeholder="e.g., Buy a car"
                        className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Estimated Amount
                      </label>
                      <input
                        type="number"
                        name="planAmount"
                        value={futurePlanData.planAmount}
                        onChange={handleFuturePlanChange}
                        placeholder="Enter estimated amount"
                        className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg font-medium"
                  >
                    Add Future Plan
                  </button>
                </form>
                
                {renderFuturePlans()}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Form;