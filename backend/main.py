from fastapi import FastAPI, File, UploadFile
import onnxruntime as ort
import numpy as np
import torch
from transformers import RobertaTokenizer

app = FastAPI()

# **load Whisper model**
whisper_encoder = ort.InferenceSession("backend/models/whisper-base/whisper_base_en-whisperencoder.onnx")
whisper_decoder = ort.InferenceSession("backend/models/whisper-base/whisper_base_en-whisperdecoder.onnx")

# **load RoBERTa model**
roberta_model = ort.InferenceSession("backend/models/roberta-base.onnx")
roberta_tokenizer = RobertaTokenizer.from_pretrained("backend/models")

# **Speech-to-Text API**
@app.post("/transcribe/")
async def transcribe(audio_file: UploadFile = File(...)):
    audio_data = np.frombuffer(audio_file.file.read(), dtype=np.float32)
    encoder_output = whisper_encoder.run(None, {"input_features": audio_data})[0]
    transcription = whisper_decoder.run(None, {"encoder_output": encoder_output})[0]
    return {"transcription": transcription}

# **Text Contract Analysis API**
@app.post("/analyze/")
async def analyze(text: str):
    inputs = roberta_tokenizer(text, return_tensors="np", max_length=512, padding="max_length", truncation=True)
    output = roberta_model.run(None, {"input_ids": inputs["input_ids"], "attention_mask": inputs["attention_mask"]})[0]
    return {"analysis": output.tolist()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)