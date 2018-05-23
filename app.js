
var express = require('express');
var bodyParser = require('body-parser');
const Serie = require('./Serie.js');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/minicurso');
var app = express();

app.use(bodyParser.json());

var series = [];

app.get('/', function(requisicao, resposta){
    console.log("Requisicao feita");
    resposta.send("<h1>NodeFlix</h1>");
});

app.post('/series',(req,res)=>{
    var novaSerie = req.body;
    const serieCriada = new Serie(novaSerie);
    serieCriada.save(function(){
        res.send(serieCriada);
    });
    
});

app.get('/series',(req,res)=>{
    const seriesBD = Serie.find({},'_id nome',(erro,series)=>{
        if(erro){
            res.status(400).send(erro);
        }
        res.send(series);
    });
});

app.get('/series/:id', (req,res)=>{
    const seriesBD = Serie.findById(req.params.id,(erro,series)=>{
        if(erro){
            res.status(400).send(erro);
        }
        res.send(series);
    });
});

app.put('/series/:id', (req,res)=>{
    var id = req.params.id;
    var novaSerie = req.body;
    Series.findById(id,(err, serieEncontrada)=>{
        serieEncontrada.assistida = novaSerie.assistida;
        serieEncontrada.save((err,serie)=>{
            res.send(series);
        })
    })
})

app.listen(8087,function(){
    console.log("O servidor ta rodando");
});