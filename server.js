const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {

  const ext =
    path.extname(
      file.originalname
    );

  const safeName =
    Date.now() + ext;

  cb(null, safeName);

  }
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {

  res.json({
    success: true,
    filename: req.file.filename
  });

});

app.listen(3000 , "0.0.0.0", () => {
  console.log("Server started");
});