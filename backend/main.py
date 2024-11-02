from fastapi import FastAPI,File,UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf

app=FastAPI()
new_model = tf.keras.models.load_model('saved_models/my_model1.keras')
Class_Names=["Benign",'Malignant']

def read_file_as_image(data)->np.ndarray:
    i=np.array(Image.open(BytesIO(data))) 
    return i

@app.get("/")
async def read_root():
    return {"greet":"hello world"}
@app.post("/predict")

async def predict(
    file: UploadFile=File(...)
):
     
    image=read_file_as_image(await file.read())
    img_batch=np.expand_dims(image,0)

    predictions=new_model.predict(img_batch)

    predicted_class=Class_Names[np.argmax(predictions[0])]

    confidence=np.max(predictions[0])
    return {
        'class':predicted_class,
        'confidence':str(confidence)
    }

origins = [
    "http://localhost:3000",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

