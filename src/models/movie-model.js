import conn from "../config/conn.js";

const Schema = conn.Schema;

const movieSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    release_date: {
        type: Date,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    classification: {
        type: String,
        enum: ["LIVRE", "MAIOR16", "MAIOR18"],
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: [
            "Ação",
            "Documentário",
            "Comédia",
            "Drama",
            "Infantil"
        ]
    }
});

const Movie = conn.model("Movie", movieSchema);

export default Movie;