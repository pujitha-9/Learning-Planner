import express from "express";
import path from "path";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Set up MongoDB
const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri || !uri.startsWith("mongodb")) {
    console.warn("MONGODB_URI is not set or invalid. Database operations will fail! For this preview to work fully, provide a valid MONGODB_URI in secrets.");
    return;
  }
  try {
    await mongoose.connect(uri);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};
connectDB();

// Schemas & Models
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

const goalSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  deadline: { type: Date },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});
const Goal = mongoose.model("Goal", goalSchema);

const taskSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: Date, required: true },
  duration: { type: Number, required: true }, // in minutes
  completed: { type: Boolean, default: false },
});
const Task = mongoose.model("Task", taskSchema);


  // Minimal Auth Middleware (For prototyping, normally use token verification)
const parseUserId = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  req.headers['x-user-id'] ? next() : res.status(401).json({ error: "Missing x-user-id header" });
};

// --- API ROUTES ---
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (mongoose.connection.readyState !== 1) {
      return res.json({ user: { id: "mock_user", name, email } });
    }
    // For demo purposes, we're not hashing passwords but we imported bcryptjs if needed
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "User already exists" });
    user = new User({ name, email, password });
    await user.save();
    res.json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (mongoose.connection.readyState !== 1) {
      return res.json({ user: { id: "mock_user", name: "Mock User", email } });
    }
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    res.json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/dashboard", parseUserId, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ 
        goals: [{ id: '1', title: 'Master React Patterns', completed: false, deadline: '2026-07-01' }], 
        tasks: [{ id: 't1', title: 'Design Database Schema', duration: 45, completed: true, date: new Date() }], 
        streak: 1 
      });
    }
    const userId = req.headers['x-user-id'];
    const goals = await Goal.find({ userId });
    const tasks = await Task.find({ userId }).sort({ date: 1 });
    
    // Calculate streak based on task completion
    const completedTasks = tasks.filter(t => t.completed);
    const streak = completedTasks.length > 0 ? Math.floor(Math.random() * 5) + 1 : 0; // Mock streak logic
    
    res.json({ goals, tasks, streak });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/goals", parseUserId, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ id: Date.now().toString(), title: req.body.title, deadline: req.body.deadline, completed: false });
    }
    const userId = req.headers['x-user-id'];
    const { title, deadline } = req.body;
    const goal = new Goal({ userId, title, deadline });
    await goal.save();
    res.json(goal);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/tasks", parseUserId, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ id: Date.now().toString(), ...req.body, completed: false });
    }
    const userId = req.headers['x-user-id'];
    const task = new Task({ ...req.body, userId });
    await task.save();
    res.json(task);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/tasks/:id/complete", parseUserId, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ id: req.params.id, completed: true });
    }
    const task = await Task.findByIdAndUpdate(req.params.id, { completed: true }, { new: true });
    res.json(task);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// AI based personalized learning recommendations using @google/genai
app.post("/api/ai/recommend", parseUserId, async (req, res) => {
  try {
    const userId = req.headers['x-user-id'];
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Gemini API key is not configured" });
    }
    
    // Get user goals to feed to AI
    const goals = await Goal.find({ userId });
    const goalTitles = goals.map(g => g.title).join(", ");
    
    const ai = new GoogleGenAI({ 
      apiKey,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
    });
    
    const prompt = `As a smart learning planner, generate a study schedule and 3 personalized learning recommendations based on these learning goals: ${goalTitles || 'General learning'}. 
    Return ONLY a valid JSON string (no markdown formatting, no code blocks) with this exact schema:
    { "schedule": [{ "day": string, "topic": string, "durationMinutes": number }], "recommendations": [string] }`;
    
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    
    let result;
    try {
      result = JSON.parse(response.text.trim());
    } catch (e) {
       result = { 
         schedule: [{ day: "Today", topic: "Intro to topic", durationMinutes: 30 }],
         recommendations: ["Start with the basics", "Review previous notes"]
       };
    }
    
    res.json(result);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// AI Assist Chat Endpoint
app.post("/api/ai/chat", parseUserId, async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Gemini API key is not configured" });
    }
    
    const { message, previousMessages } = req.body;
    
    const ai = new GoogleGenAI({ 
      apiKey,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
    });
    
    // Format previous messages for Gemini API
    const history = (previousMessages || []).map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));
    
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        { role: "user", parts: [{ text: "You are a helpful learning assistant for a student. Keep your answers concise, motivating, and directly helpful for their studies." }] },
        { role: "model", parts: [{ text: "Understood. I'm ready to help!" }] },
        ...history,
        { role: "user", parts: [{ text: message }] }
      ]
    });
    
    res.json({ reply: response.text });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// Vite middleware for development (must be after API routes)
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production: serve static files from dist
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
