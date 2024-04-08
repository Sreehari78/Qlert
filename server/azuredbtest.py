import pyodbc
server = 'qlert.database.windows.net'
database = 'Records'
username = 'sreehariadmin'
password = 'cetrion123#'
driver= '{ODBC Driver 17 for SQL Server}'
port=1433

cnxn = pyodbc.connect('DRIVER='+driver+';SERVER=tcp:'+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password)
cursor = cnxn.cursor()
# Define the search term
search = 'Harassment or bullying of colleagues'

# Define the SQL query with parameterized query
rule = "SELECT threshold_value FROM Rules WHERE rule_info = ?"

# Execute the SQL query with the search parameter
cursor.execute(rule, search)
row = cursor.fetchone() 
print (row[0]) 
