from fastapi import FastAPI, Depends, HTTPException, Query, status
from fastapi.responses import JSONResponse
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from supabase import Client
from database import get_supabase

app = FastAPI()

bearer_scheme = HTTPBearer(auto_error=False)


def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
    access_token: str | None = Query(default=None),
    db: Client = Depends(get_supabase),
):
    token = credentials.credentials if credentials else access_token

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing access token",
        )

    try:
        response = db.auth.get_user(token)
        return response.user
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
        )



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
def protected_profile(current_user = Depends(get_current_user)):
    return JSONResponse(
        status_code=200,
        content={
            "message": "success",
            "user-data": {
                "id": current_user.id,
                "email": current_user.email,
                "created at": str(current_user.created_at),
            },
        },
    )
