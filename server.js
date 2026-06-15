const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/mealprep-intake", async (req, res) => {
  const data = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "iteyonb@gmail.com",
      pass: "vgrk vbfd qflz ygiz"
    }
  });

  const mailOptions = {
    from: "iteyonb@gmail.com",
    to: "iteyonb@gmail.com",
    subject: "New Meal Prep Submission",
    text: JSON.stringify(data, null, 2)
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.listen(3000, () => {
  console.log("Meal Prep App running on http://localhost:3000");
});
