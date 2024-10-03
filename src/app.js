import e from "express";
import userRouter from "./routes/user-route.js";
import movieRouter from "./routes/movie-route.js";
import rentRouter from "./routes/rent-route.js";
import "dotenv/config";

const app = e();
const port = process.env.PORT;

app.use(e.json());

app.use('/user', userRouter);
app.use('/movie', movieRouter);
app.use('/rent', rentRouter);

app.listen(port, function() {
    console.log("Server running at port", port);
});