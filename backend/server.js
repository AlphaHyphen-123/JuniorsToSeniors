const express = require("express");
const HomeRouter = require("./routes/Home.route");  // ✅ बिना {} import
const RegisterRouter = require("./routes/Register.route");
const LoginRouter = require("./routes/Login.route");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/mydb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("✅ MongoDB connected to mydb"))
    .catch((err) => console.log("❌ MongoDB error:", err));

app.use("/api", HomeRouter);
app.use("/api", RegisterRouter); 
app.use("/api", LoginRouter); 



app.listen(8080, () => {
    console.log("🚀 Server is running on port 8080");
});
