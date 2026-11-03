import express from "express";
import cors from "cors";
import cardsRouter from "./routes/cards.js";



const app = express();
const PORT = parseInt(process.env.PORT || "3001", 10);

// ข้อ 17: CORS Configuration
// TODO: แก้ไข CORS options ให้มีการกำหนด
// - origin: ['http://localhost:5173']
// - methods: ['GET', 'POST', 'PUT', 'DELETE']
// - allowedHeaders: ['Content-Type']


app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type"
}));


// Middleware
app.use(express.json());



// Routes
app.use("/api/cards", cardsRouter);

// ข้อ 1: Health Check Endpoint
// TODO: Implement ข้อ 1
// สร้าง GET endpoint /api/health
// ส่งคืน { status: "ok" }
app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});



// ข้อ 16: Error Handling Middleware
// TODO: Implement ข้อ 16
// สร้าง error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     success: false,
//     error: 'Something went wrong!'
//   });
// });
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: "Something went wrong!"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🃏 Emoji Tarot API running on http://localhost:${PORT}`);
});
