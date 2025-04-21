var express = require('express');
const { pedirTodas } = require('../db/pedidos');
var router = express.Router();

let metas = [
  { "id" : "1",
    "detalles" : "Correr por 30 minutos",
    "periodo" : "dia",
    "eventos" : 1,
    "icono" : "🏃",
    "metas" : 365,
    "plazo" : "2030-01-01",
    "completado" : 5
  },
  { "id" : "2",
    "detalles" : "Leer por 30 minutos",
    "periodo" : "dia",
    "eventos" : 1,
    "icono" : "📗",
    "metas" : 365,
    "plazo" : "2030-01-01",
    "completado" : 5
  },
]

/* GET Lista de metas. */
router.get('/', function(req, res, next) {
  pedirTodas('metas', (err, metas) => {
    if (err) {
      return next(err);
    }
    console.log(metas)
    res.send(metas);
  });
});

/* GET Meta con id. */
router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  const meta = metas.find(item => item.id === id);
  if(!meta) {
    return res.sendStatus(404);
  }
  res.send(meta);
});

/* POST Crear Meta. */
router.post('/', function(req, res, next) {
  const meta = req.body;
  metas.push(meta);
  res.status(201);
  res.send(meta);
});

/* PUT Actualizar Meta. */
router.put('/:id', function(req, res, next) {
  const meta = req.body;
  const id = req.params.id;
  if (meta.id !== id) {
    return res.sendStatus(409);
  }
  const indice = metas.findIndex(item => item.id === id);
  if(indice === -1){
    return res.sendStatus(404);
  }
  metas[indice] = meta;
  res.send(meta);
});

/* DELETE Meta id. */
router.delete('/:id', function(req, res, next) {
  const id = req.params.id;
  const indice = metas.findIndex(item => item.id === id);
  if(indice === -1){
    return res.sendStatus(404);
  }
  metas.splice(indice, 1);
  return res.sendStatus(204);
});

module.exports = router;
