from transformers import RobertaModel, RobertaTokenizer
import torch
import onnx

model_path = "./models"
onnx_model_path = "./models/roberta-base.onnx"

model = RobertaModel.from_pretrained(model_path)
tokenizer = RobertaTokenizer.from_pretrained(model_path)

example_text = "RiskAware helps with contract analysis."
inputs = tokenizer(example_text, return_tensors="pt", max_length=10, padding="max_length", truncation=True)

torch.onnx.export(
    model, 
    (inputs["input_ids"], inputs["attention_mask"]), 
    onnx_model_path,
    input_names=["input_ids", "attention_mask"],
    output_names=["output"],
    dynamic_axes={"input_ids": {0: "batch_size", 1: "sequence_length"},
                  "attention_mask": {0: "batch_size", 1: "sequence_length"}},
    opset_version=14
)

print(f"RoBERTa has been converted to {onnx_model_path}")