import e from "express";
import userRouter from "./routes/user-route.js";
import movieRouter from "./routes/movie-route.js";
import rentRouter from "./routes/rent-route.js";
import recommendRouter from "./routes/recommend-route.js";
import "dotenv/config";

const app = e();
const port = process.env.PORT;

app.use(e.json());

app.get('/', (req, res) => res.json("okay"));
app.use('/user', userRouter);
app.use('/movie', movieRouter);
app.use('/rent', rentRouter);
app.use('/recommend', recommendRouter);

app.listen(port, function() {
    console.log("Server running at port", port); 
});