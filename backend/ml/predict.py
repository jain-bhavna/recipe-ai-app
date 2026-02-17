import torch
from torchvision import transforms
from PIL import Image
from .model_loader import model, classes, device, load_model

# Ensure model is checked/loaded if not already
if model is None:
    model, classes, device = load_model()

# Standard ImageNet normalization
transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

def predict_dish(image_path):
    """
    Predicts the dish name and confidence for a given image path.
    Returns: (dish_name: str, confidence: float)
    """
    if model is None:
        raise RuntimeError("Model is not loaded.")
        
    try:
        # Open image
        image = Image.open(image_path).convert("RGB")
        
        # Preprocess
        input_tensor = transform(image).unsqueeze(0).to(device)
        
        # Inference
        with torch.no_grad():
            outputs = model(input_tensor)
            probabilities = torch.nn.functional.softmax(outputs, dim=1)[0]
            
        # Get Top-1
        confidence, idx = torch.max(probabilities, 0)
        idx = idx.item()
        confidence_score = confidence.item() * 100.0
        
        # Get label
        if 0 <= idx < len(classes):
            dish_name = classes[idx]
        else:
            dish_name = f"Unknown ({idx})"
            
        return dish_name, confidence_score
        
    except Exception as e:
        print(f"Prediction error: {e}")
        raise e
