import conn from '../config/conn.js';
import bcrypt from "bcrypt";

const Schema = conn.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        // required: true
    },
    birthday_date: {
        type: Date,
        // required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
              return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    permission: {
        type: String,
        enum: ["ADM", "CLIENT"],
        default: "CLIENT"
    },
    phones: {
        type: Array,
        // required: true,
        minLength: 8
    },
    adress: {
        type: Object
    },
    house_number: {
        type: Number,
        // required: true
    }
}); 

userSchema.pre("save", async function () {    
    this.password = await bcrypt.hash(this.password, 10); // Monta o hash criptografado
});

userSchema.methods.senhaCorreta = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = conn.model("User", userSchema);

export default User; 