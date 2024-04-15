import base64
import requests
import json

# Read the PDF file in binary mode, encode it to base64, and decode to string
with open("D:\\Richard\\Qlert\\rulestest.pdf", "rb") as file:
    base64_encoded_pdf = base64.b64encode(file.read()).decode()

# Prepare the API request body
data = {
    "source": {"sourceUrl": "", "content": base64_encoded_pdf},
    "prebuiltModelId": "prebuilt-read",
}

# Prepare the API request headers
headers = {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": "eeb83815ae4d44f88e25979a44eae588",
}

endpoint = "https://qlertreader.cognitiveservices.azure.com"
modelId = "prebuilt-read"
# Send the API request
response = requests.post(
    f"{endpoint}/formrecognizer/v2.1/prebuilt/{modelId}/analyze",
    headers=headers,
    json=data,
)

# Print the API response
print(response.json())
