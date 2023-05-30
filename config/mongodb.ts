import { connect, connection } from "mongoose";

export function connectDB() {
  const options = {
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  };
  connect('mongodb://localhost:27017/udemy_express_practice', options)
    .catch((error: any) => console.log(error));

  connection.on('error', (error: any) => console.log(error));
}