var express = require('express');
const { pedirTodas } = require('../db/pedidos');
const { pedir } = require('../db/pedidos');
const { crear } = require('../db/pedidos');
const { body, validationResult } = require('express-validator')
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
  pedir('metas', id, (err, meta) => {
    if (err) {
      return next(err);
    }
    if(!meta.length){
      return res.sendStatus(404);
    }
    res.send(meta[0]);
  });
});

/* POST Crear Meta. */
router.post('/', body('detalles').isLength({min: 5 }), body('periodo').not().isEmpty(),
function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({errors : errors.array()});
  }

  const nuevaMeta = req.body;
  crear('metas', nuevaMeta, (err, meta) => {
    if (err) {
      return next(err);
    }
    res.send(meta);
  });
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
