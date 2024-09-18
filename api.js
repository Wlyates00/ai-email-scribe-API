import express from "express";
import "dotenv/config";
import cors from "cors";
import Email from "./routes/emailRoutes.js";
import Donation from "./routes/donationRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

// App using routes
app.use("/api", Email);
app.use("/donations", Donation);

// Start the server
app.listen(3200, () => {
  console.log("Backend server running on port 3200");
});
