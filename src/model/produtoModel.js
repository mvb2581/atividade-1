import pool from '../config/db.js';

const produtoModel = {
   
    selecionarTodos: async () => {
        const sql = 'SELECT * FROM produtos;';
        const [rows] = await pool.query(sql);
        return rows;
    },
    
    selecionarPorId: async (pId) => {
        const sql = 'SELECT * FROM produtos WHERE idProduto=?;';
        const values = [pId];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
    

    inserirProduto: async (pNome, pValor,pImagem) => {
        const sql = 'INSERT INTO produtos (nomeProduto,valorProduto,vinculoImagem) VALUES (?,?,?)';
        const values = [pNome, pValor,pImagem];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    },


    alterarProduto: async(pId,pNome,pValor) =>{
        const sql = 'UPDATE produtos SET nomeProduto=? valorProduto=? WHERE idProduto=?;'
        const values = [pNome,pValor,pId];
        const [rows] = await pool.query(sql,values);
        return rows;
    },

    deleteProduto:async(pId)=> {
        const sql= "DELETE FROM produtos WHERE idProduto=?;";
        const values = [pId];
        const [rows] = await pool.query(sql,values);
        return rows;
    }
}



export default produtoModel;