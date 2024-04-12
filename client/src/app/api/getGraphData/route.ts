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

let graphContents: { [key: string]: number } = {};

export async function GET() {
  const endDate: Date = new Date();
  const currentHour: number = endDate.getHours();
  const currentMinute: number = endDate.getMinutes();

  const startTime: Date = endDate;
  startTime.setHours(currentHour - 10);
  startTime.setMinutes(currentMinute < 30 ? 0 : 30);

  let graphData: { Time_of_Prompting: any }[] = [];

  try {
    var poolConnection = await sql.connect(config);

    var resultSet = await poolConnection
      .request()
      .query(
        `SELECT Time_of_Prompting from [dbo].[Prompts] where Risk_Level = 'High' and Time_of_Prompting >= '${startTime.toISOString()}'`
      );
    var columns = "";
    for (var column in resultSet.recordset.columns) {
      columns += column + ", ";
    }
    resultSet.recordset.forEach((row: { Time_of_Prompting: any }) => {
      graphData.push({
        Time_of_Prompting: row.Time_of_Prompting,
      });
    });
    poolConnection.close();
  } catch (err) {
    console.error(err);
  }

  //store the count of the data recieved from the api to the interface i created in sorted order of time with 30 min gap
  let count = 0;
  let timeData: Date[] = [];

  for (let i = 0; i < graphData.length; i++) {
    const givenTime = new Date(graphData[0].Time_of_Prompting);
    timeData.push(givenTime);
  }

  for (let i = 0; i < 10; i++) {
    let bufferTime = startTime;
    graphContents[
      `${bufferTime.getHours() + i}:${bufferTime.getMinutes()}`
    ] = 0;
    graphContents[
      `${bufferTime.getHours() + i}:${bufferTime.getMinutes() + 30}`
    ] = 0;
  }

  for (let i = 0; i < timeData.length; i++) {
    const bufferTime: Date = timeData[i];
    const hour: number = bufferTime.getHours();
    const minute: number = bufferTime.getMinutes();
    let nextMinute: number = 0;

    minute < 30 ? (nextMinute = 30) : (nextMinute = 0);

    minute < 30
      ? (graphContents[`${hour}:${minute}`] =
          graphContents[`${hour}:${minute}`] + 1)
      : (graphContents[`${hour}:${nextMinute}`] =
          graphContents[`${hour}:${nextMinute}`] + 1);
  }

  return Response.json({ graphData: graphContents });
}
