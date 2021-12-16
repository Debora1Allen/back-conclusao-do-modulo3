const conexao = require('../conexao');
const bcrypt = require('bcrypt');

const cadastrarProdutos= async (req, res) =>{
    const {usuario: usuarioReq} = req;
   const {nome,quantidade,categoria,preco,descricao,imagem} = req.body;
     if(!nome){
         return res.status(404).json({mensagem:'O campo nome é obrigatorio'});
     }
     if(!quantidade){
         return res.status(404).json({mensagem:'O campo quantidade é obrigatorio'});
     }
     if(!preco){
         return res.status(404).json({mensagem:'O campo preço é obrigatorio'});
     }
     if(!descricao){
         return res.status(404).json({mensagem:'O campo nome é obrigatorio'});
     }
     

    if(!usuarioReq){
        return res.status(401).json({mensagem:'Para cadastrar um produto, o usuário deve estar autenticado'});
    }
     try{
         const query = 'insert into produtos (usuario_id,nome,quantidade,categoria,preco,descricao,imagem) values($1,$2,$3,$4,$5,$6,$7)';
         const produto = await conexao.query(query,[usuarioReq.id,nome,quantidade,categoria,preco,descricao,imagem]);
         
         if(produto.rowCount === 0){
             return res.status(400).json({mensagem:'Não foi possivel realizar cadastro'});
         }
      return res.status(200).json();
     }catch (error){
         return res.status(400).json(error.message);
     }
};
const listarProdutos = async (req,res) =>{
  const {usuario: usuarioReq} = req;
  try{
      const produtos = await conexao.query('select * from produtos where usuario_id = $1', [usuarioReq.id]);
      return res.status(200).json(produtos.rows);
  }catch(error){
      return res.status(400).json(error.menssage);
  }
};

const detalharProduto = async (req,res) => {
    const {usuario: usuarioReq} = req;
    const {id : idProduto} = req.params;
    try{
          const query = 'select p.id, u.nome as usuario, p.nome, p.quantidade,p.categoria,p.preco,p.descricao,p.imagem from produtos p left join usuarios u on u.id = p.usuario_id where p.id =$1 and p.usuario_id =$2'
    const produto = await conexao.query(query,[idProduto, usuarioReq.id]);
    return res.status(200).json(produto.rows);
    }catch (error){
        return res.status(400).json(error.message);
    }
  
    };

    const atualizarProduto = async (req,res) =>{
        const {usuario: usuarioReq} = req;
        
    const {id : idProduto} = req.params;
    const {nome,quantidade,categoria,preco,descricao,imagem} = req.body;
        if(!nome){
         return res.status(404).json({mensagem:'O campo nome é obrigatorio'});
     }
     if(!quantidade){
         return res.status(404).json({mensagem:'O campo quantidade é obrigatorio'});
     }
     if(!preco){
         return res.status(404).json({mensagem:'O campo preço é obrigatorio'});
     }
     if(!descricao){
         return res.status(404).json({mensagem:'O campo descrição é obrigatorio'});
     }
      try{
           const queryProdytoExiste = 'select *from produtos where id =$1 and usuario_id = $2';
           const produtoExiste = await conexao.query(queryProdytoExiste, [idProduto, usuarioReq.id]);

           if(produtoExiste.rowCount === 0){
               return res.status(404).json({mensagem: `Não existe produto para o ID ${idProduto}.`})
           }

       const produto = await conexao.query('update produtos set nome=$1, quantidade= $2, categoria=$3, preco=$4, descricao=$5, imagem=$6 where id = $7 and usuario_id = $8', [nome,quantidade,categoria,preco,descricao,imagem, idProduto, usuarioReq.id]);

       if(produto.rowCount === 0){
           return res.status(400).json({mensagem:'Não foi possivél atualizar o produto'});
       }
        return res.status(200).json();
      }catch (error){
          console.log(error);
           return res.status(400).json(error.message);
      }
    }
const excluirProduto = async(req,res) =>{
      const {usuario: usuarioReq} = req;
    const {id : idProduto} = req.params;

try{
  const queryProdytoExiste = 'select *from produtos where id =$1 and usuario_id = $2';
           const produtoExiste = await conexao.query(queryProdytoExiste, [idProduto, usuarioReq.id]);

           if(produtoExiste.rowCount === 0){
               return res.status(404).json({mensagem: `Não existe produto para o ID ${idProduto}.`})
           }
           const {rowCount} = await conexao.query('delete from produtos where id = $1', [idProduto]);

           if(rowCount === 0){
               return res.status(400).json({mensagem:'Não foi possivel excluir produto'})
           }
               return res.status(200).json();
}catch (error){
 return res.status(400).json(error.message);
}

}

module.exports ={cadastrarProdutos,listarProdutos,detalharProduto,atualizarProduto, excluirProduto};