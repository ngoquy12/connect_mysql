const express = require("express");
const connect = require("../connection/connectMySQL");
const bodyParser = require("body-parser");

const userRouter = express.Router();
userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({ extended: true }));

// API lấy thông tin tất cả user
userRouter.get("/", async (req, res) => {
  try {
    // Tạo câu lệnh query
    const query = "SELECT * FROM js_230413.users";
    // Gọi đến db để lấy dữ liệu
    connect.execute(query, (err, result) => {
      if (err) {
        return res.status(500).json({
          devMsg: err,
        });
      } else {
        return res.status(200).json({
          data: result,
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      devMsg: err,
    });
  }
});

// API lấy thông tin một user theo id
userRouter.get("/:id", (req, res) => {
  // Lấy id của user cần lấy thông param
  const { id } = req.params;
  try {
    const query = "SELECT * FROM js_230413.users WHERE UserId = ?";
    // Gọ đến dc để lấy dữ liệu
    connect.execute(query, [id], (err, result) => {
      if (result.length === 0) {
        return res.status(404).json({
          status: 404,
          userMsg: "Người dùng không tồn tại",
        });
      } else {
        return res.status(200).json({
          data: result,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      devMsg: error,
    });
  }
});

// API xóa thông tin một user theo id
userRouter.delete("/:userId", (req, res) => {
  // Lấy id từ client
  const { userId } = req.params;
  // Gọi vào db để xóa user
  try {
    // Tạo câu lệnh query
    const query = "DELETE FROM js_230413.users WHERE UserId = ?";
    connect.execute(query, [userId], (req, result) => {
      console.log("result", result);
      if (result.affectedRows > 0) {
        return res.status(200).json({
          status: 200,
          userMsg: "Xóa thành công",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      devMsg: error,
    });
  }
});

// API thêm mới user
userRouter.post("/", (req, res) => {
  // Lấy dữ liệu từ body
  const { UserName, Gender, DateOfBirth } = req.body;
  try {
    // Khai báo câu lệnh query
    const query =
      "INSERT INTO users(UserName, Gender, DateOfBirth) VALUES (?, ?, ?)";
    // Gọi vào DB để thêm mới user
    connect.execute(query, [UserName, Gender, DateOfBirth], (req, result) => {
      console.log("result", result);
      if (result.affectedRows > 0) {
        return res.status(200).json({
          status: 200,
          userMsg: "Thêm mới thành công",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      devMsg: error,
    });
  }
});

// API cập nhật thông tin user theo id
userRouter.put("/:id", (req, res) => {
  // Lấy id cần cập nhật
  const { id } = req.params;
  // Lấy dữ liệu cần cập nhật cho user đó
  const { UserName, Gender, DateOfBirth } = req.body;

  try {
    // Tạo câu lệnh query
    const query =
      "UPDATE users set UserName = ? , Gender = ?, DateOfBirth = ? WHERE UserId =  ?";
    // Gọi vào DB để thêm mới user
    connect.execute(
      query,
      [UserName, Gender, DateOfBirth, id],
      (req, result) => {
        console.log("result", result);
        if (result.affectedRows > 0) {
          return res.status(200).json({
            status: 200,
            userMsg: "Cập nhật thành công",
          });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({
      devMsg: error,
    });
  }
});

module.exports = userRouter;
