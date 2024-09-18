import express from "express";
import "dotenv/config";
import cors from "cors";
import OpenAI from "../services/openaiService.js";

// api.js will USE these routes
const router = express.Router();
// Setting the ALLOWED url that can access this api
router.use(
  cors({
    origin: [
      process.env.CHROME_EXTENSION_ID, // Allow the Chrome extension
      process.env.WEB_HOST, // Allow localhost (for local development)
    ],
  })
);
// For pasing json responses
router.use(express.json());

// Setting the API endpoint URL
router.post("/generate-email", OpenAI.generateEmail);

// Trying an API call to OpenAI
router.post("/context-menu/generate-email", OpenAI.generateBodyParagragh);

export default router;
