const { table } = require("console");
const sql = require("mssql");

const config = {
  user: "sreehariadmin", // better stored in an app setting such as process.env.DB_USER
  password: "cetrion123#", // better stored in an app setting such as process.env.DB_PASSWORD
  server: "qlert.database.windows.net", // better stored in an app setting such as process.env.DB_SERVER
  port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
  database: "Records", // better stored in an app setting such as process.env.DB_NAME
  authentication: {
    type: "default",
  },
  options: {
    encrypt: true,
  },
};

/*
    //Use Azure VM Managed Identity to connect to the SQL database
    const config = {
        server: process.env["db_server"],
        port: process.env["db_port"],
        database: process.env["db_database"],
        authentication: {
            type: 'azure-active-directory-msi-vm'
        },
        options: {
            encrypt: true
        }
    }

    //Use Azure App Service Managed Identity to connect to the SQL database
    const config = {
        server: process.env["db_server"],
        port: process.env["db_port"],
        database: process.env["db_database"],
        authentication: {
            type: 'azure-active-directory-msi-app-service'
        },
        options: {
            encrypt: true
        }
    }
*/

export function fetchTableContents() {
  console.log("Starting...");
  connectAndQuery();

  async function connectAndQuery() {
    try {
      var poolConnection = await sql.connect(config);

      console.log("Reading rows from the Table...");
      var resultSet = await poolConnection
        .request()
        .query(`SELECT * from [dbo].[Prompts]`);

      console.log(`${resultSet.recordset.length} rows returned.`);

      // output column headers
      var columns = "";
      for (var column in resultSet.recordset.columns) {
        columns += column + ", ";
      }
      console.log("%s\t", columns.substring(0, columns.length - 2));
      const tableContents = [];
      // ouput row contents from default record set
      resultSet.recordset.forEach((row) => {
        tableContents.push({
          User_ID: row.User_ID,
          Prompt: row.Prompt,
          Time_of_Prompting: row.Time_of_Prompting,
          Risk_Level: row.Risk_Level,
          Risk_Associated: row.Risk_Associated,
        });
      });

      // close connection only when we're certain application is finished
      poolConnection.close();
    } catch (err) {
      console.error(err.message);
    }
  }
  return tableContents;
}