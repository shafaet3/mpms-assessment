import 'dotenv/config'; // Load .env file first
import mongoose from 'mongoose';
import app from './app'; // Import the configured Express app

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI as string; 

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in the environment variables.');
  process.exit(1);
}

// Database connection
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Start server after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });