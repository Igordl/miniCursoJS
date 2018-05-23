
const mongoose = require('mongoose');

const serieSchema = new mongoose.Schema({
    nome: String,
    prioridade: Number,
    protagonista: {
        nome: String
    },
    nTemp: Number

});

module.exports = mongoose.model('Serie', serieSchema);