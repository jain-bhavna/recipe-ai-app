import torch
import torch.nn as nn
import timm
import os

# Paths relative to backend root
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "ml", "food101_efficientnet.pt")
CLASSES_PATH = os.path.join(BASE_DIR, "food-101", "meta", "classes.txt")

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = None
classes = []

def load_model():
    global model, classes
    
    # 1. Load Classes
    if os.path.exists(CLASSES_PATH):
        with open(CLASSES_PATH, "r") as f:
            classes = [line.strip() for line in f.readlines()]
        print(f"Loaded {len(classes)} classes from {CLASSES_PATH}")
    else:
        print(f"Warning: Classes file not found at {CLASSES_PATH}")
        # Return early or handle appropriately? For now we proceed with empty classes list
        # but model structure depends on it. Ideally we should have the file.
        # Fallback to 101 if file missing but we know it's Food-101
        
    num_classes = len(classes) if classes else 101

    # 2. Create Model Architecture
    print(f"Initializing EfficientNet-B0 for {num_classes} classes...")
    model = timm.create_model("efficientnet_b0", pretrained=False)
    
    # Replace classifier head
    num_features = model.classifier.in_features
    model.classifier = nn.Linear(num_features, num_classes)
    
    # 3. Load Weights
    if os.path.exists(MODEL_PATH):
        print(f"Loading weights from {MODEL_PATH}...")
        state_dict = torch.load(MODEL_PATH, map_location=device)
        model.load_state_dict(state_dict)
    else:
        print(f"Warning: Model weights not found at {MODEL_PATH}. Using random init.")

    model.to(device)
    model.eval()
    print("Food model loaded")
    
    return model, classes, device

# Initialize on import or when needed? 
# The request implies explicit loading or at least being available.
# We'll initialize it when this module is imported by main or routes, 
# but usually it's better to call load_model() explicitly during startup.
# For now, we provide the function.
