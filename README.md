 🌱Crop-Disease-detection-web-app Plant Disease Detection

This is a Flask-based web application for detecting plant diseases from leaf images.
The system leverages a Convolutional Neural Network (CNN) trained on the PlantVillage dataset and integrates YOLOv8 preprocessing to automatically crop the leaf region for more accurate predictions.

🚀 Features

Upload a leaf image through the web app.

YOLOv8 detection to crop out the leaf (with HSV green masking fallback).

62 disease classes across 14 crops supported.

Fast and lightweight model (SimpleCNN).

User-friendly Flask web interface.

🌾 Supported Crops & Diseases

Your app is trained on the PlantVillage dataset, which includes 14 crop species and their healthy + diseased conditions.

✅ Crops Supported

Apple

Blueberry

Cherry (including sour cherry)

Corn (Maize)

Grape

Orange

Peach

Pepper (Bell)

Potato

Raspberry

Soybean

Squash

Strawberry

Tomato

🦠 Example Diseases Detected

Apple Scab, Black Rot, Cedar Rust

Grape Black Rot, Leaf Blight

Corn Common Rust, Northern Leaf Blight

Potato Early Blight, Late Blight

Tomato Mosaic Virus, Yellow Leaf Curl Virus, Bacterial Spot, Target Spot

And many more… (total: 62 classes)

📂 Project Structure
agriculture-web-app/
│── Agriculture_web_app.py     # Main Flask application
│── utils.py                   # Leaf preprocessing (YOLO + HSV)
│── Agricultural_web_app.pth   # Trained CNN model weights
│── templates/
│   ├── index2.html            # Upload page
│   └── result1.html           # Result display page
│── static/
│   └── uploads/               # Uploaded images folder

📦 Installation
1️⃣ Clone the Repository
git clone https://github.com/your-username/agriculture-web-app.git
cd agriculture-web-app

2️⃣ Create & Activate Environment
conda create -n pytorch_env python=3.10 -y
conda activate pytorch_env

3️⃣ Install Dependencies
pip install flask torch torchvision ultralytics opencv-python pillow matplotlib

▶️ Running the Application
python Agriculture_web_app.py


Then open your browser at:
👉 http://127.0.0.1:5000/

🖼️ Usage Workflow

Launch the web app.

Upload a plant leaf image.

The app detects and crops the leaf (YOLOv8).

The CNN model classifies the disease.

Results are displayed in the browser.

🧠 Model Details

Architecture: SimpleCNN

Layers: 3 Convolutional layers + Dropout + Fully Connected layers

Input size: 128×128 pixels

Training dataset: PlantVillage (62 classes)

Frameworks: PyTorch + OpenCV + Flask

⚙️ System Requirements

Python 3.10+

PyTorch

Flask

OpenCV

Ultralytics YOLOv8

📌 Future Improvements

Deploy on cloud (AWS, GCP, or Render).

Add Grad-CAM heatmaps for explainable predictions.

Extend to real-time video disease detection.
