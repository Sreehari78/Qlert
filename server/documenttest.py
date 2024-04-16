import json
import re
import requests
import wget
import openai
import numpy as np
from qdrantRules import insert_rule

def summary(filename):
    openai.api_key = "###"
    api_url = "https://api.openai.com/v1/chat/completions"
    # Open the file with the 'utf-8' encoding
    with open(filename, "r", encoding="utf-8") as file1:
        # Read and print the contents of the file
        out = file1.read()
        pdf_file = re.sub(r"\n\s*\n", "\n", out)

    message = pdf_file

    # Update the prompt to guide ChatGPT to provide a list of one-line statements
    prompt = """Please summarize the provided legal document into concise one-line rules, and provide a threshold value between 0 and 0.5 for each rule, representing the maximum tolerable level of compliance deviation. Separate each rule and its threshold value by "//" in the format: "rule: threshold_val //".
    """


    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": prompt},
            {"role": "user", "content": message},
        ],
        "temperature": 0.7,
    }
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {openai.api_key}",
    }

    response = requests.post(api_url, headers=headers, data=json.dumps(payload))
    if response.status_code == 200:
        response_content = response.json()["choices"][0]["message"]["content"]
        # Splitting the response into a list of one-line statements
        rules_list = [rule.strip() for rule in response_content.split("//")]
        # Cleaning up the list, removing any empty elements
        rules_list = [rule for rule in rules_list if rule]
        print(rules_list)
        print("----CHATGPT RESPONSE----")
        for i in range(0, len(rules_list), 2):
            rule = rules_list[i].split(":")[1]
            threshold = rules_list[i + 1]
            print(f"Rule {i + 1}: {rule}")
            print(f"Threshold: {threshold}")
            # Insert the rule into the Qdrant index
            payload = {
                "author": "Admin1",
                "description": rule,
                "name": "Company Policy",
                "threshold": float(threshold),
                "year": 2024,
            }
            print(payload)
            insert_rule(
                payload={
                    "author": "Admin1",
                    "description": rule,
                    "name": "Company Policy",
                    "threshold": float(threshold),
                    "year": 2024,
                }
            )

    else:
        print("Error:", response.status_code)
