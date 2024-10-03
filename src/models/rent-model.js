import conn from "../config/conn.js";

const Schema = conn.Schema;

const rentSchema = new Schema({
    rent_by: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    movie_rented: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Movie"
    },
    rent_date: {
        type: Date,
        required: true
    },
    return_date: {
        type: Date,
        required: true
    }
});

const Rent = conn.model("Rent", rentSchema);

export default Rent;