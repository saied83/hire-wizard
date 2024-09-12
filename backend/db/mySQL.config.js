import mysql from "mysql2/promise.js";
import dotenv from "dotenv";
dotenv.config();

const mysqlPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default mysqlPool;

// use transaction on mysql

//   const connection = await mysqlPool.getConnection();
//   try {
//     await connection.beginTransaction();
//     const [result, fields] = await connection.query("select live from person");
//     await connection.commit();
//     return res.status(200).json({ message: "Success", data: result });
//   } catch (error) {
//     await connection.rollback();
//     mysqlPool.releaseConnection();
//     res.status(500).json({ message: "db error" });
//   }
