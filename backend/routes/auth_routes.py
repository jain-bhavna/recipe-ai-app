from fastapi import APIRouter, HTTPException, Depends
from db import users_col
from models import RegisterIn, LoginIn
from auth import hash_password, verify_password, create_token, get_current_user

router = APIRouter()

@router.post("/register")
def register(data: RegisterIn):
    if users_col.find_one({"email": data.email}):
        raise HTTPException(400, "Email already exists")

    users_col.insert_one({
        "name": data.name,
        "email": data.email,
        "password": hash_password(data.password)
    })

    return {"message": "User registered"}


@router.post("/login")
def login(data: LoginIn):
    user = users_col.find_one({"email": data.email})

    if not user:
        raise HTTPException(401, "Invalid email")

    if not verify_password(data.password, user["password"]):
        raise HTTPException(401, "Wrong password")

    # Create token with name, email, exp
    token_data = {
        "email": user["email"],
        "name": user["name"]
    }
    access_token = create_token(token_data)

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "name": user["name"],
        "email": user["email"]
    }

@router.get("/me")
def read_users_me(current_user: dict = Depends(get_current_user)):
    return current_user
