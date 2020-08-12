const jwt = require('jsonwebtoken');


// =============
// Verificar Token
//  ============
// El next continuará con el funcionamiento del programa
let verificaToken = (req, res, next) => {
    let token = req.get('token'); // Authorization

    // Seed es el string que creamos para darle más seguridad al token
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            })
        }

        req.usuario = decoded.usuario;
        next()
    });
    // res.json({
    //     token: token
    // })
    console.log(token)
};

// ===================
// Verificar AdminRole
//  ==================
// ! Para que solo el admin pueda crear nuevos usuarios
let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        next();
    }

    res.json({
        ok: false,
        err: {
            message: 'El usuario no es administrador'
        }
    })
}

module.exports = {
    verificaToken,
    verificaAdmin_Role
}