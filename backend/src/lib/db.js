import mongoose from 'mongoose';

// Reuse mongoose connection across serverless invocations to avoid repeated connects
export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    // already connected
    // eslint-disable-next-line no-console
    console.log('MongoDB already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // keep default options; you can add options here if needed
    });
    // eslint-disable-next-line no-console
    console.log('MongoDB Connected');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('MongoDB connection error', err);
    throw err;
  }
};