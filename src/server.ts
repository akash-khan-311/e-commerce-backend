import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

async function main() {
  if (!config.database_uri) throw new Error("Database URI is not set");
  try {
    await mongoose.connect(config.database_uri);
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

main();

app.listen(config.port || 3000, () => {
  console.log(`Server is running on port ${config.port}`);
});
