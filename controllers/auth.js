
const { response} =    require("express");
const { request } =    require("express");
const Usuario =        require("../models/Usuario");
const bcrypt =         require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");




const crearUsuario = async(req= request , res = response)  => {

    const { name, email, password} = req.body;

    try {        
        // Validar email

        const usuario = await Usuario.findOne({ email});

        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese email'
            });
        }

        const dbUser = new Usuario( req.body );

        // hashear la contarseña
        //se hace 10 vueltas para realizar el salta
        const salt = bcrypt.genSaltSync();
        // encriptar la contraseña 
        dbUser.password = bcrypt.hashSync(password, salt );
        // Generar el JWT 
        const token = await generarJWT( dbUser.id, name);

       //Crear usuario en la base de datos
        await dbUser.save();

        // Generar respuesta exitosa
        return res.status(200).json({
            ok:    true,
            uid:   dbUser.id,
            email,
            name,
            token
        })
  
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msj: 'Contacte con el administrador'
        })
    }

}


const login =  async(req= request , res = response)  => {

    const { email, password} = req.body;

    try {
      
        const dbUser = await Usuario.findOne({email});

        console.log(dbUser, 'dbUser');
// si no hay db user  
        if(!dbUser){
            return res.status(400).json({
                ok: false,
                msg: 'El correo no existe'
            })
        }

        // confirmar si el password es igual 

        const validarPassword = bcrypt.compareSync(password, dbUser.password);

        if(!validarPassword){
            return res.status(400).json({
                ok: false,
                msg: 'El password no es valido'
            })
        }
        // generar JWT 
        const token = await generarJWT( dbUser.id, dbUser.name);
        // Respuesta del token success 
        return res.json({
            ok:    true,
            uid:   dbUser.id,
            name: dbUser.name,
            email,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const revalidarToken = async(req= request , res = response)  => {

    const { uid  } = req;

    const dbUser = await Usuario.findById(uid);



    const token = await generarJWT( uid, dbUser.name);

    return res.json({
        ok: true,
        uid,
        name : dbUser.name,
        email: dbUser.email,
        token

        

    })
}




module.exports = {
    crearUsuario,
    login,
    revalidarToken
}