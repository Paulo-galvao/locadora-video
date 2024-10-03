import moment from "moment";
import User from "../models/user-model.js";
import Movie from "../models/movie-model.js";

async function verifyAge(req, res, next) {
    try {
        const user = await User.findById(req.body.rent_by).exec();
        const userAge = moment().diff(user.birthday_date, "years");
        const movie = await Movie.findById(req.body.movie_rented).exec();
        const movieClassification = movie.classification;

        if ((movieClassification == "MAIOR16" || movieClassification == "MAIOR18") && userAge < 16 ) {
            return res.status(403).json("Precisa ser maior de 16 para alugar esse filme");
        }

        if (movieClassification == "MAIOR18" && userAge < 18) {
            return res.status(403).json("Precisa ser maior de 18 para alugar esse filme");
        }
    } catch (error) {
        console.log(error.message);
    }
    next();
}

export default verifyAge;
