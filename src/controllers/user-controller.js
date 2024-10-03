import User from "../models/user-model.js";
import jwt from "../services/jwt-service.js";

async function store(req, res) {
    try {
        const content = await User.create(req.body);
        res.status(201).json(content);
    } catch (error) {
        res.status(400).json(error.message);
        console.log(error.message);
    }
}

async function show(req, res) {
    try {
        const content = await User.find().exec();
        res.status(200).json(content);
    } catch (error) {
        res.status(400).json(error.message);
        console.log(error.message);
    }
}

async function showById(req, res) {
    try {
        const content = await User.findById(req.params.id, req.body).exec();
        res.status(200).json(content);
    } catch (error) {
        res.status(400).json(error.message);
        console.log(error.message);
    }
}

async function update(req, res) {
    try {
        const content = await User.findByIdAndUpdate(req.params.id, req.body).exec();
        res.status(200).json(content);
    } catch (error) {
        res.status(400).json(error.message);
        console.log(error.message);
    }
}

async function destroy(req, res) {
    try {
        const content = await User.findByIdAndUpdate(req.params.id).exec();
        res.status(200).json(content);
    } catch (error) {
        res.status(400).json(error.message);
        console.log(error.message);
    }
}

async function signup(req, res) {
    try {
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        house_number: req.body.house_number,
        birthday_date: req.body.birthday_date
      });
  
      const token = jwt.generateAccessToken({
        permission: user.permission,
        email: user.email,
        _id: user._id,
      });
  
      // Devolve o token de acesso
      res.status(201).json({
        token,
      });
  
    } catch (error) {
      console.log(error.message)
      res.status(400).send(error.message);
    }
}

async function login(req, res) {
    try {
      const user = await User.findOne({
        email: req.body.email,
      }).exec();
      //validando se existe o usuário cadastrado
      if (user && (await user.senhaCorreta(req.body.password))) {
        const token = jwt.generateAccessToken({
          permission: user.permission,
          email: user.email,
          _id: user._id,
        });
  
        // Devolve o token de acesso
        res.json({
          token,
        });
      } else {
  
        res.status(404).json("Email ou senha inválidos");
      }
  
    } catch (error) {
      console.log(error.message)
      res.status(400).send(error.message);
    }
}

export default {
    store, 
    show, 
    showById, 
    update, 
    destroy,
    signup,
    login
};