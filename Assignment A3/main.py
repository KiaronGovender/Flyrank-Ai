import os
from fastapi import FastAPI,HTTPException
from fastapi.responses import JSONResponse
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

supabase: Client = create_client(
    os.environ.get("SUPABASE_URL"),
    os.environ.get("SUPABASE_KEY")
)

@app.get('/')
def home():
    return {"message": "Welcome Home"}

@app.post("/auth/signup")
def signUp(email: str, password: str):

    if not email or not password:
        return JSONResponse(
            status_code=400,
            content={"message": "Missing email or password"}
        )

    try:
        response = supabase.auth.sign_up({
            "email": email,
            "password": password
        })

        return JSONResponse(
            status_code=201,
            content={
                "message": "created",
                "user": {
                    "id": response.user.id,
                    "email": response.user.email
                }
            }
        )

    except Exception as e:
        print("SUPABASE ERROR:", e)

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

@app.post("/auth/login")
def login(email:str,password:str):
    if not email or not password:
        return JSONResponse(
            status_code=400,
            content={"message": "Missing email or password"}
        )
    try:
        response = supabase.auth.sign_in_with_password(
           { 
               "email":email,
                "password":password
            }
        )

        return JSONResponse(
            status_code=200,
            content={"message":"Success","access_token": response.session.access_token, "refresh_token":response.session.refresh_token}
        )
    
    except Exception as e:
        print("SUPABASE ERROR:",e)

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )