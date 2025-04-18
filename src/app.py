from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, validator
from . import MainTESTING  # Relative import within the src package  

app = FastAPI()

# Enable CORS to allow the frontend to communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this in production to be more specific
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Home route to check if the server is running
@app.get("/")
def home():
    return {"message": "FastAPI server is running!"}

# Define a Pydantic model to validate the incoming form data
class FormData(BaseModel):
    name: str
    email: EmailStr
    phone: str
    address: str = None
    city: str = None
    state: str = None
    zipCode: str = None
    country: str = None
    occupation: str = None
    
    @validator('phone')
    def validate_phone(cls, v):
        if not MainTESTING.validate_phone(v):
            raise ValueError('Invalid phone number format. Please enter a 10-digit number.')
        return v

# Define an endpoint to receive form data
@app.post("/submit-form")
async def submit_form(data: FormData):
    try:
        # Call a function from MainTESTING.py to process the data
        result = MainTESTING.process_form(data.dict())
        return {"status": "success", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run the app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("src.app:app", host="127.0.0.1", port=8000, reload=True)
