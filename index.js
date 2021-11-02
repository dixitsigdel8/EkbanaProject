const express = require("express");
const connectDB = require("./config/db");
const app = express();
require("dotenv").config();

// routes
const companyCategoryRoutes = require("./routes/company_category");
const companyRoutes = require("./routes/company");

//database connect
connectDB();

app.use(express.json());

//api routes
app.use("/api", companyCategoryRoutes);
app.use("/api", companyRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
