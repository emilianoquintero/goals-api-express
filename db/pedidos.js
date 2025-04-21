const db = require('./configuracion');

function pedirTodas(tabla, callback) {
    db.any(`SELECT * FROM ${tabla}`)
    .then(resultado => {
        callback(null, resultado);
    })
    .catch(error => {
        callback(error);
    });
}

module.exports = {
    pedirTodas
};