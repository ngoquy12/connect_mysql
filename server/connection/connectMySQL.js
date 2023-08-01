const mysql2 = require("mysql2");

// Khởi tạo kết nối
const connect = mysql2.createPool({
  database: "js_230413",
  port: 3306,
  host: "localhost",
  user: "root",
  password: "22121944",
});

// Kiểm tra kết nối
connect.getConnection((err, result) => {
  if (err) {
    console.log("Kết nối thất bại ", err);
  } else {
    console.log("Kết nối thành công");
  }
});

module.exports = connect;
