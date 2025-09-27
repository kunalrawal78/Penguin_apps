import app from "./app.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";   
import notesRoutes from "./routes/notesRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

app.use("/api/auth", authRoutes);  
app.use("/api/notes", notesRoutes); 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
