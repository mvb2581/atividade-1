const pool = require('../config/db');

const clienteModel = {
   
    
    selecionarTodasAsCategorias: async () => {
        const sql = 'SELECT * FROM categoria;';
        const [rows] = await pool.query(sql);
        return rows;
    },

    selecionarPorId: async (pId) => {
    const sql = 'SELECT * FROM categoria WHERE idCategoria = ?';
    const [rows] = await pool.query(sql, [pId]);
    return rows;
    },
    
    selecionarPorCategoria: async (pCategoria) => {
        const sql = 'SELECT * FROM categoria WHERE descriçãoCategoria=?;';
        const values = [pCategoria];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

     inserirCategoria: async (pCategoria,pId) => {
        const sql = 'INSERT INTO categoria (descricaoCategoria,idCategoria) VALUES (?,?)';
        const values = [pCategoria,pId];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    },
   alterarCategoria: async (pId, pCategoria) => {
    const sql = 'UPDATE clientes SET descricaoCategoria = ? WHERE idCategoria = ?;';
    const values = [pCategoria,pId];
    const [rows] = await pool.query(sql, values);
    return rows;
    },

    deleteCliente:async(pId)=> {
        const sql= "DELETE FROM clientes WHERE idCategoria=?;";
        const values = [pId];
        const [rows] = await pool.query(sql,values);
        return rows;
    }
}

module.exports = { categoriaModel };