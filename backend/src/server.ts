import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import runMongo from "./database/connectDb";
import { Doctor } from "./database/mongo";
import { newDoctor } from "./types";

dotenv.config();
const app: Express = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// cors things
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [
  "http://localhost:3000", "https://apollo-clone-dusky.vercel.app"
];
app.use(
  cors({
    origin: function(origin, callback) {
      // Allow requests with no origin (e.g. mobile apps, curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

(async () => {
  const isDbRunning: boolean = await runMongo();

  if (isDbRunning) {
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  }
})();

//api

//health check
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).send("OK");
});

// get all doctor + add filters
app.get("/doctors-with-filters", async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string);
  const limit = parseInt(req.query.limit as string);
  const skip = (page - 1) * limit;

  const filters: any = {};

  // Mode filter
  if (req.query.mode) {
    const mode = Array.isArray(req.query.mode)
      ? req.query.mode
      : [req.query.mode];
    filters.mode = { $in: mode };
  }

  // Experience filter
  if (req.query.experience) {
    const experience = (req.query.experience as string).split("-").map(Number);
    if (experience.length === 2) {
      filters.experience = {
        $gte: experience[0],
        $lte: experience[1],
      };
    } else if (!isNaN(experience[0])) {
      filters.experience = { $gte: experience[0] };
    }
  }

  // Fees filter
  if (req.query.fees) {
    const fees = (req.query.fees as string).split("-").map(Number);
    if (fees.length === 2) {
      filters.$and = [
        { consult_fees: { $gte: fees[0], $lte: fees[1] } },
        { Physical_fees: { $gte: fees[0], $lte: fees[1] } },
      ];
    } else if (!isNaN(fees[0])) {
      filters.$and = [
        { consult_fees: { $gte: fees[0] } },
        { Physical_fees: { $gte: fees[0] } },
      ];
    }
  }

  // Language filter
  if (req.query.languages) {
    const langs = Array.isArray(req.query.languages)
      ? req.query.languages
      : [req.query.languages];
    filters.languages = {
      $in: langs.map((l) => new RegExp(`^${l}$`, "i")),
    };
  }


  // Faculty filter
  if (req.query.faculty) {
    const faculty = req.query.faculty as string;
    if (faculty.toLowerCase() === "other clinics") {
      filters.faculty = { $ne: "Apollo Hospital" };
    } else {
      filters.faculty = {
        $regex: new RegExp(faculty.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
      };
    }
  }

  // Availability
  if (req.query.available !== undefined) {
    filters.isAvailable = req.query.available === "true";
  }

  // Sorting
  const sortBy = req.query.sortBy === "experience" ? "experience"
    : req.query.sortBy === "name" ? "name"
      : req.query.sortBy === "price" ? "price"
        : "name";

  const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;

  try {
    const doctors = await Doctor.aggregate([
      { $match: filters },
      {
        $addFields: {
          price: {
            $switch: {
              branches: [
                {
                  case: { $and: [{ $ifNull: ["$consult_fees", false] }, { $ifNull: ["$Physical_fees", false] }] },
                  then: { $min: ["$consult_fees", "$Physical_fees"] }
                },
                {
                  case: { $ifNull: ["$consult_fees", false] },
                  then: "$consult_fees"
                },
                {
                  case: { $ifNull: ["$Physical_fees", false] },
                  then: "$Physical_fees"
                }
              ],
              default: Number.MAX_SAFE_INTEGER
            }
          }
        }
      },
      { $sort: { [sortBy]: sortOrder } },
      { $skip: skip },
      { $limit: limit }
    ]);

    const total = await Doctor.countDocuments(filters);

    res.json({
      data: doctors,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err });
  }
});

// add a doctor
app.post("/add", async (req: Request, res: Response) => {
  const doc: newDoctor = req.body;
  try {
    const newDoctor = new Doctor(doc);
    await newDoctor.save();
    res.json(newDoctor);
  } catch (err) {
    res.status(500).json({
      error: "Server error",
      details: err,
    });
  }
});
