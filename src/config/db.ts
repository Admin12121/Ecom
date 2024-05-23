import mysql from "mysql";

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'sudoadmin@12',
    database: "genz"
})

db.connect(({err}:{err:any}) => {
    if(err) {
        console.error("Error connecting to database", err);
    } else {
        console.log("Connection successfull")
    }
})

export default db;