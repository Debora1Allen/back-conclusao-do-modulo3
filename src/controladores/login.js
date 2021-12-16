const conexao = require ('../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const segredo = require('../segredos');

const login = async(req,res) =>{
    const {email,senha} = req.body;

    if(!email || !senha){
        return res.status(404).json({mensagem:'Todos os campos são obrigatórios'});
    }
    try{
        const queryEmail = 'select * from usuarios where email = $1';
        const {rows,rowCount} = await conexao.query(queryEmail,[email]);
        if(rowCount === 0){
            return res.status(404).json({mensagem:'Usuario não encontrado'});
        }
        const usuario = rows[0];
        const verific = await bcrypt.compare(senha,usuario.senha);

        if(!verific){
            return res.status(400).json({mensagem:'Usuário e/ou senha inválido(s).'});
        }
     const token = jwt.sign({id:usuario.id},segredo,{expiresIn:'1d'});
     const {senha: senhaUser,... dadosUser} = usuario
     return res.status(200).json({usuario: dadosUser,
token});

    }catch (error){
        return res.json(400).json(error.message)
    }
}
module.exports ={login};