const express = require('express');
const categoriaRoutes=express.Router();

const {categoriaController} = require('../controller/categoriaController')

categoriaRoutes.get('/categoria', categoriaController.buscarTodasAsCategorias);
categoriaRoutes.get('/categoria/:idCategoria', categoriaController.buscarCategoriaPorId)
categoriaRoutes.post('/categoria', categoriaController.incluirCategoria)
categoriaRoutes.put('/categoria/:idCategoria', categoriaController.atualizarCategoria)
categoriaRoutes.delete('/categoria/:idCategoria',categoriaController.excluirCategoria)


    module.exports = {produtoRoutes};