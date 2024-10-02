import mongoose from "mongoose";
import "dotenv/config";
const mongoDB = process.env.MONGODB;

async function main() {
    try {
        await mongoose.connect(mongoDB);
        console.log("DB connected");
    } catch (error) {
        console.log(error.message);
    }
}

main();

export default mongoose;
