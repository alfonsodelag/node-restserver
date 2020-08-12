const express = require('express')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')
const app = express();


app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            res.sendStatus(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            res.sendStatus(400).json({
                ok: false,
                err: {
                    message: '(User) or password are incorrect.'
                }
            });
        }

        let token = jwt.sign({
            usuario: usuarioDB,
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN })

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });
    })
})


module.exports = app;