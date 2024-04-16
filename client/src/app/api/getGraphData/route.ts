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
  startTime.setHours(currentHour - 9);
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

  let timeData: Date[] = [];

  for (let i = 0; i < graphData.length; i++) {
    const givenTime = new Date(graphData[i].Time_of_Prompting);
    timeData.push(givenTime);
  }
  for (let i = 1; i <= 10; i++) {
    let bufferTime = startTime;

    graphContents[
      `${(bufferTime.getHours() + i) % 24}:${bufferTime.getMinutes() % 60}`
    ] = 0;
    graphContents[
      `${(bufferTime.getHours() + i) % 24}:${
        (bufferTime.getMinutes() + 30) % 60
      }`
    ] = 0;
  }

  for (let i = 0; i < timeData.length; i++) {
    const bufferTime: Date = timeData[i];
    bufferTime.setHours(bufferTime.getHours() - 5);
    bufferTime.setMinutes(bufferTime.getMinutes() - 30);
    const hour: number = bufferTime.getHours();
    const minute: number = bufferTime.getMinutes();

    minute < 30
      ? (graphContents[`${hour % 24}:${0}`] =
          graphContents[`${hour % 24}:${0}`] + 1)
      : (graphContents[`${hour % 24}:${30}`] =
          graphContents[`${hour % 24}:${30}`] + 1);
  }
  let sortedArray = Object.entries(graphContents);

  // Sort the array by keys
  sortedArray.sort((a, b) => {
    if (a[0] < b[0]) return -1;
    if (a[0] > b[0]) return 1;
    return 0;
  });

  // Reconstruct object from sorted array
  graphContents = Object.fromEntries(sortedArray);
  return Response.json({ graphData: graphContents });
}
