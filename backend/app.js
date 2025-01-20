require("dotenv").config();
const express = require("express");
const cors = require("cors");
const currencyRoutes = require("./routes/currencyRoutes");
const rateLimiter = require("./middlewares/rateLimiter");

const PORT = process.env.PORT || 5000;

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(express.json());
app.use(rateLimiter);
app.use(cors(corsOptions));

// Routes
app.use("/api", currencyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`);
});
