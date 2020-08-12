const express = require('express')
const _ = require('underscore')
const Usuario = require('../models/usuario')
const app = express();

// Si la variable viene, que la use, sino viene, suponer que viene desde la pagina 0, la primera pagina.

app.get('/usuario', function (req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);
    // .find finds everything
    Usuario.find({ state: true }, 'nombre email role estado google img')
        .skip(desde)
        // Limit the response to 5
        .limit(5)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                });
            }

            Usuario.count({ state: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                })
            })
        })
});

app.post('/usuario', function (req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        role: body.role
    })

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
})

app.put('/usuario/:id', function (req, res) {

    let id = req.params.id;
    // Array of options that I want to be updateable
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    delete body.password;
    delete body.google;

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
});

app.delete('/usuario/:id', function (req, res) {
    let id = req.params.id;

    let cambiaEstado = {
        state: false
    }

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            })
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        })
    })

});

module.exports = app;