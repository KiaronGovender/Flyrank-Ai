from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from supabase import Client
from database import get_supabase

app = FastAPI()



@app.get('/')
def home():
    return {"message":"Hello World!"}

@app.post("/auth/signup")
async def register_user(email: str, password: str, db = Depends(get_supabase)):
    try:
        # Correct Python SDK syntax
        response = db.auth.sign_up({
            "email": email, 
            "password": password
        })
        return {"message": "Sign up successful! Please check your email for a confirmation link.", "user": response.user}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail=str(e)
        )

@app.post('/auth/login')
def login(email:str, password:str, db: Client = Depends(get_supabase)):
    try:
        response = db.auth.sign_in_with_password({"email":email,"password":password})

        return JSONResponse(status_code=200, content={"access token":response.session.access_token, "refresh token": response.session.refresh_token})
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail=str(e)
        )

@app.get('/public/info')
def public_info():
    return JSONResponse(status_code=200,content={"message": "Welcome stranger! This info is public"})

@app.get('/protected/profile')
def protected_profile(access_token, db: Client = Depends(get_supabase)):
    if not access_token:
        return JSONResponse(status_code=401, content={"error":"missing Access Token required"})

    try:
        response = db.auth.get_user(access_token)

        return JSONResponse(status_code=200, content={"message":"success", "user-data":{"id":response.user.id, "email":response.user.email, "created at": str(response.user.created_at)}})
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail=str(e)
        )