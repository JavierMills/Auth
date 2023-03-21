const { Router} = require('express');
const { crearUsuario, login, validarToken, revalidarToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWToken } = require('../middlewares/validar-jwt');

const router = Router();

// Crear nuevo usuario
router.post( '/new', [
    check('name', 'El name es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({ min: 6}),
    validarCampos
],crearUsuario)

// Login de usuario
// se constituye por el PATH, MIDDLEWARES ( o arreglo de middlewares) Y EL CONTROLADOR DE LA RUTA si solo se pone 2 entonces entiende que es el controlador
router.post( '/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({ min: 6}),
    validarCampos
], login)

// validar y revalidar token
router.get( '/renew', validarJWToken ,revalidarToken)



module.exports = router;