const { response} = require("express");
const { request } = require("express");
const jwt  = require("jsonwebtoken");

const validarJWToken = (req= request, res = response, next) =>{

    const token = req.header('x-token');
    console.log(token);

    if(!token){
        return res.status(401).json({
            ok : false,
            msg: 'Token no autorizado'
        });
    }

    try {

      const {uid, name , email} = jwt.verify( token, process.env.SECRET_JWT_SEED );

      req.uid = uid;
      req.name = name;
    //   req.email = email;

      console.log(uid, name);
        
    } catch (error) {

        return res.status(401).json({
            ok: false,
            msg: 'Token no valido',
            
        })
        
    }


// TODO ok 
    next();
    }





module.exports ={
    validarJWToken
}