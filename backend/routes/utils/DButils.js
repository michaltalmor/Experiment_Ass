require("dotenv").config();
const sql = require("mssql");

const config = {
    user: process.env.tedious_userName,
    password: process.env.tedious_password,
    server: process.env.tedious_server,
    database: process.env.tedious_database,
    connectionTimeout: 1500000,
    options: {
        encrypt: true,
        enableArithAbort: true
    }
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool
    .connect()
    .then(() => console.log("new connection pool Created"))
    .catch((err) => console.log(err));

execQuery = async function (query) {
    await poolConnect;
    try {
        var result = await pool.request().query(query);
        return result.recordset;
    } catch (err) {
        throw err;
    }
};

// ************* QUERIES ************* //

selectUsernames = async function () {
    const users = await execQuery("SELECT email FROM users");
    return users;
};

selectUserWithUsername = async function (email) {
    const user = await execQuery(`SELECT * FROM users WHERE email = '${email}'`);
    return user;
};
selectUserIDWithUsername = async function (email) {
    const user = await execQuery(`SELECT ID FROM users WHERE email = '${email}'`);
    return user;
};
selectMassegeByStep = async function (step) {
    const message = await execQuery(`SELECT message FROM Steps WHERE step = '${step}'`);
    return message;
};


insertUserToUser = async function (userID, first_name, email) {
    await execQuery(
        `INSERT INTO users VALUES (
              default,
            '${first_name}',
            '${email}',
            '${userID}')`
    );
};



// ************* EXPORTS ************* //

module.exports = {
    execQuery: execQuery,
    selectUsernames: selectUsernames,
    selectUserWithUsername: selectUserWithUsername,
    selectUserIDWithUsername: selectUserIDWithUsername,
    selectMassegeByStep: selectMassegeByStep,
    insertUserToUser: insertUserToUser



    
}