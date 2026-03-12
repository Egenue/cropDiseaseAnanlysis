#!/usr/bin/env python
# coding: utf-8
from utils import preprocess_leaf   # ✅ updated import
import os
import uuid
import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import transforms, datasets
from flask import Flask, request, render_template, redirect

# -------------------------------
# 1: Define the CNN Model
# -------------------------------
class SimpleCNN(nn.Module):
    def __init__(self, num_classes=62):
        super(SimpleCNN, self).__init__()
        self.conv1 = nn.Conv2d(3, 16, kernel_size=3, padding=1)
        self.bn1   = nn.BatchNorm2d(16)
        self.conv2 = nn.Conv2d(16, 32, kernel_size=3, padding=1)
        self.bn2   = nn.BatchNorm2d(32)
        self.conv3 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.bn3   = nn.BatchNorm2d(64)
        self.pool  = nn.MaxPool2d(2, 2)
        self.relu  = nn.ReLU()
        self.drop  = nn.Dropout(0.5)
        self.fc1   = nn.Linear(64 * 16 * 16, 128)
        self.fc2   = nn.Linear(128, num_classes)

    def forward(self, x):
        x = self.pool(self.relu(self.bn1(self.conv1(x))))
        x = self.pool(self.relu(self.bn2(self.conv2(x))))
        x = self.pool(self.relu(self.bn3(self.conv3(x))))
        x = x.view(-1, 64 * 16 * 16)
        x = self.drop(F.relu(self.fc1(x)))
        x = self.fc2(x)
        return x

# -------------------------------
# 2: Initialize Flask
# -------------------------------
app = Flask(__name__)
UPLOAD_FOLDER = "static/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# -------------------------------
# 3: Load Trained Model
# -------------------------------
device = torch.device("cpu")
model = SimpleCNN(num_classes=62)
model.load_state_dict(torch.load("Agricultural_web_app.pth", map_location=device))
model.eval()

# -------------------------------
# 4: Load Class Names from Dataset
# -------------------------------
dataset = datasets.ImageFolder("plantvillage dataset/color")
class_names = [c.replace("___", " - ").replace("_", " ") for c in dataset.classes]

# -------------------------------
# 5: Flask Routes
# -------------------------------
@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        if "file" not in request.files:
            return redirect(request.url)
        file = request.files["file"]
        if file.filename == "":
            return redirect(request.url)
        if file:
            filename = f"{uuid.uuid4().hex}_{file.filename}"
            filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
            file.save(filepath)
            
            # ✅ Preprocess with YOLO + HSV fallback
            try:
                processed_img = preprocess_leaf(filepath, output_size=(128, 128))

                # Convert NumPy → tensor
                image = transforms.ToTensor()(processed_img).unsqueeze(0)

                with torch.no_grad():
                    outputs = model(image)
                    _, predicted = torch.max(outputs, 1)
                    label = class_names[predicted.item()]
            except Exception as e:
                label = f"Error: {str(e)}"

            return render_template("result1.html", image_path=filepath, label=label)
    
    return render_template("index2.html")

# -------------------------------
# 6: Run Flask (default port 5000)
# -------------------------------
if __name__ == "__main__":
    app.run(debug=True)

