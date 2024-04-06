import requests

# Define the endpoint, modelID, key, and document URL
endpoint = "https://qlertreader.cognitiveservices.azure.com/"
modelID = "prebuilt-document"
key = "eeb83815ae4d44f88e25979a44eae588"
document_url = "file://D:/Richard/Qlert/invoice.pdf"  # Replace with the actual path to your document

# Construct the request payload
payload = {"urlSource": document_url}

# Construct the request headers
headers = {"Content-Type": "application/json", "Ocp-Apim-Subscription-Key": key}

# Construct the request URL
url = (
    f"{endpoint}/formrecognizer/documentModels/{modelID}:analyze?api-version=2023-07-31"
)

# Send the POST request
response = requests.post(url, json=payload, headers=headers)

# Print the response
print(response.text)
