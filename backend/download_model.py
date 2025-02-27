import os
import requests

MODEL_FILES = {
    "vocab.json": "1SRa-zo2y7AcvBp5ox1S1xwbDecKom9sC",
    "roberta-base.onnx": "1rN01jwKXnzXrjBeDJAwjuo_GeMfHgR6z",
    "tokenizer_config.json": "1pdkOlfTSRViAD0-Nf0PvibCOTNI17EUu",
    "tokenizer.json": "1wkdByLJfqdaC-aCQ8yq_0Pc4uuKz_8Ao",
    "tf_model.h5": "1IGHG_kxMQzl5WrdQAuPmSJ__plkh9K6j",
    "rust_model.ot": "16FwJtEh9___pOs10oFVjS7ZyX9Zro2CP",
    "pytorch_model.bin": "1Pc7WEKoRIttfv1PCn1vcxW0jaNttsrIm",
    "model.safetensors": "1SDZVTRL5Y8IuKT8qp_Lv1ZplMmePeh2f",
    "merges.txt": "1LlhIjRj-PW3CYyIQ1GAbIuwA6zaxEO0a",
    "flax_model.msgpack": "15ppf-kj2Ojr2C0QZ7bXYJLCJMeBORKA0",
    "dict.txt": "1g3qP6IvhyyZWUtz-9hWhsCBvvHKxUQgi",
    "config.json": "1VdP9MEXs6d7mxnSITbTG2vWQ58O3vjRB",
    "README.md": "1pkn8UUFsJfr56bWTl4NyrQh8LUAr9jpO",
    "whisper-base/whisper_base_en-whisperdecoder.onnx": "1X1rs144ALjXYcedAAKAXdTBV9QBDf30U",
    "whisper-base/whisper_base_en-whisperencoder.onnx": "1XL8EZHiGUIUoNwPRICJ5TKR-Ber8Xtwi"
}

# Save the models to:
DOWNLOAD_DIR = "backend/models"
os.makedirs(DOWNLOAD_DIR, exist_ok=True)

def download_file(filename, file_id):
    url = f"https://drive.google.com/uc?id={file_id}"
    output_path = os.path.join(DOWNLOAD_DIR, filename)
    
    print(f"Downloading {filename}...")
    response = requests.get(url, stream=True)
    with open(output_path, "wb") as f:
        for chunk in response.iter_content(chunk_size=1024 * 1024):  # 1MB chunks
            if chunk:
                f.write(chunk)
    
    print(f"OK! {filename} downloaded successfully!")

# Download all models
for filename, file_id in MODEL_FILES.items():
    if file_id != "YOUR_FILE_ID_HERE":
        download_file(filename, file_id)

print("\nOK! All models downloaded successfully!")