import moment from "moment";
import Movie from "../models/movie-model.js";
import User from "../models/user-model.js";

async function recommend(req, res, next) {
    try {
        const user = await User.findById(req.params.id).exec();
        const alreadyRented = user.already_rented.map(rent => rent.toString()); // lista dos ids dos filmes já alugados

        let acao = 0;
        let doc = 0;
        let com = 0;
        let dra = 0;
        let inf = 0;
        let max = 0;

        alreadyRented.forEach( async (movie) => {
            const m = await Movie.findById(movie).exec();

            if(m.gender == "Ação") {
                acao++;
            }
            if(m.gender == "Documentário") {
                doc++;
            }
            if(m.gender == "Comédia") {
                com++;
            }
            if(m.gender == "Drama") {
                dra++;
            }
            if(m.gender == "Infantil") {
                inf++;
            }
        
            const genders = {
                acao,
                doc,
                com,
                dra,
                inf
            }


            for(const prop in genders) {
                if(genders[prop] > max) {
                    max = prop;
                }
            }

            let generoRecomendado;
            if(max == "doc") {
                generoRecomendado = "Documentário";
            } else if (max == "acao") {
                generoRecomendado = "Ação";
            } else if (max == "com") {
                generoRecomendado = "Comédia";
            } else if (max == "dra") {
                generoRecomendado = "Drama";
            } else if (max == "inf") {
                generoRecomendado = "Infantil";
            }
            
            console.log(max); // genero mais assistido pelo usuário

            // recomendar filmes por genero

            const movies = await Movie.find().exec();
            
            const filmesRecomendados = [];
            movies.forEach( movie => {                
                if(movie.gender == generoRecomendado) {
                    filmesRecomendados.push(movie);
                } 
            })

            res.status(200).json(filmesRecomendados)

            next();
        })
    } catch (error) {
        res.status(400).json(error.message);
    }
    
}

export default recommend; 