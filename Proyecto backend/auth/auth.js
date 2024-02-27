const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

 const SECRET_KEY = 'IsmaelMayorga';

 exports.authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        res.status(401).send("Falta el token de Autenticación");
        return;
    }

    const [type, token] = authHeader.split(' ');

    if(type !== "Bearer"){
        res.status(401).send('Tipo de Token no es valido');
        return;
    }

    try{
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        console.log(token);
        next();
    }catch{
        res.status(401).send('Token invalido');
    }
}

exports.signUp = async(req, res) =>{
    try{
        const user = await new User({
            email: req.body.email,
            password: req.body.password
        });
        if (!user.email|| !user.password) {
            return res.status(404).send('campo o campos vacios'); 
        }
        const savedUser = await user.save();
        const payload = {id: savedUser.id, email: savedUser.email};
        const token = jwt.sign(payload, SECRET_KEY);
        res.status(200).json({savedUser, token});
    }catch(err){
        console.log(err);
        res.status(500).send('signUp: Hubo un Error ' + err);
    }
}

exports.login = async(req, res) =>{
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(401).send('Email o contraseña incorrecta!');
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
           return res.status(401).send('Email o contraseña incorrecta!');
           
        }else{
            const payload = {id: user.id, email: user.email};
            const token = jwt.sign(payload, SECRET_KEY);
            res.status(200).json({user, token});
        }
    }catch(err){
        console.log(err);
        res.status(500).send('login: Hubo un Error ' + err);
    }
}
