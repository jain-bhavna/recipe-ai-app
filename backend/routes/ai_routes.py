from fastapi import APIRouter, File, UploadFile, HTTPException
import shutil
import os
import uuid
from ml.predict import predict_dish

router = APIRouter()

# ensure upload dir
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/detect-dish")
async def detect_dish(file: UploadFile = File(...)):
    # Validate file type
    if file.content_type not in ["image/jpeg", "image/png", "image/jpg"]:
        raise HTTPException(status_code=400, detail="Invalid image format. Use JPEG or PNG.")
    
    # Save temp file
    file_extension = file.filename.split(".")[-1]
    temp_filename = f"{uuid.uuid4()}.{file_extension}"
    temp_file_path = os.path.join(UPLOAD_DIR, temp_filename)
    
    try:
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # Run inference
        dish_name, confidence = predict_dish(temp_file_path)
        
        return {
            "dish": dish_name,
            "confidence": round(confidence, 2)
        }
        
    except Exception as e:
        print(f"Error processing image: {e}")
        raise HTTPException(status_code=500, detail=str(e))
        
    finally:
        # Cleanup
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)
