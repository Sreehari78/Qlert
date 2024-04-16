const sql = require("mssql");

const config = {
  user: "###", // better stored in an app setting such as process.env.DB_USER
  password: "###", // better stored in an app setting such as process.env.DB_PASSWORD
  server: "###", // better stored in an app setting such as process.env.DB_SERVER
  port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
  database: "Records", // better stored in an app setting such as process.env.DB_NAME
  authentication: {
    type: "default",
  },
  options: {
    encrypt: true,
  },
};

export async function GET() {
  const logTableContents: {
    User_ID: any;
    Prompt: any;
    Time_of_Prompting: any;
    Risk_Level: any;
    Risk_Associated: any;
  }[] = [];

  try {
    var poolConnection = await sql.connect(config);

    var resultSet = await poolConnection
      .request()
      .query(`SELECT * from [dbo].[Prompts] order by Time_of_Prompting desc`);

    var columns = "";
    for (var column in resultSet.recordset.columns) {
      columns += column + ", ";
    }
    resultSet.recordset.forEach(
      (row: {
        User_ID: any;
        Prompt: any;
        Time_of_Prompting: any;
        Risk_Level: any;
        Risk_Associated: any;
      }) => {
        logTableContents.push({
          User_ID: row.User_ID,
          Prompt: row.Prompt,
          Time_of_Prompting: row.Time_of_Prompting,
          Risk_Level: row.Risk_Level,
          Risk_Associated: row.Risk_Associated,
        });
      }
    );
    poolConnection.close();
  } catch (err) {
    console.error(err);
  }
  return Response.json({ message: logTableContents });
}
