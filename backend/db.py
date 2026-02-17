from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client.recipe_app

users_col = db.users
