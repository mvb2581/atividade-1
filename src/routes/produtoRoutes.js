import {Router} from 'express';
import produtoController from '../controller/produtoController.js';
import uploadImage from '../middleware/uploadImage.middleware.js';


const produtoRoutes=Router();

produtoRoutes.get('/produtos', produtoController.buscarTodosProdutos);
produtoRoutes.get('/produtos/:idProduto', produtoController.buscarProdutoPorId)
produtoRoutes.post('/produtos',uploadImage, produtoController.incluirProduto)
produtoRoutes.put('/produtos/:idProduto', produtoController.atualizarProduto)
produtoRoutes.delete('/produtos/:idProduto', produtoController.excluirProduto)


export default produtoRoutes;