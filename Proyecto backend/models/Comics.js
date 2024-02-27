const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    Titulo: String,
    Estado: String,
    Tipo: String,
    Resumen: String,
    Capitulos: Number
});

const Comics = mongoose.model('Comics', schema);

module.exports = Comics;
