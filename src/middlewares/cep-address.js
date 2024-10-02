import axios from "axios"

const cep_endereco = (req, res, next) => {

    axios.get(`https://viacep.com.br/ws/${req.body.endereco}/json/`)
    .then(resposta => {

       delete req.body.endereco

       req.body.endereco = resposta.data

       next()
    })
}

export default cep_endereco;