import pyodbc
from datetime import datetime

server = "qlert.database.windows.net"
database = "Records"
username = "sreehariadmin"
password = "cetrion123#"
driver = "{ODBC Driver 17 for SQL Server}"
port = 1433


def addPrompt(user_id, prompt, risk_level, risk_associated):
    try:
        cnxn = pyodbc.connect(
            "DRIVER="
            + driver
            + ";SERVER=tcp:"
            + server
            + ";PORT=1433;DATABASE="
            + database
            + ";UID="
            + username
            + ";PWD="
            + password
        )
        cursor = cnxn.cursor()

        # Define the SQL query to insert the prompt data
        insert_query = "INSERT INTO [dbo].[Prompts] (User_ID, Prompt, Time_of_Prompting, Risk_Level, Risk_Associated) VALUES (?, ?, ?, ?, ?)"

        # Get current time
        current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # Execute the SQL query with the provided data as parameters
        cursor.execute(
            insert_query,
            (user_id, prompt, current_time, risk_level, risk_associated),
        )

        # Commit the transaction
        cnxn.commit()

        print("Prompt added successfully!")

    except pyodbc.Error as e:
        print("Error:", e)

    finally:
        # Close the cursor and connection
        # cursor.close()
        # cnxn.close()
        pass


# Provided data
# data = [
#     [
#         "user420",
#         "What are your plans for the weekend?",
#         "Low",
#         "No significant risks.",
#     ],
# ]

# # Insert data into the Prompts table
# for entry in data:
#     addPrompt(entry[0], entry[1], entry[2], entry[3])
