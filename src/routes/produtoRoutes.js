import { Router } from "express";
import uploadImage from "../middleware/uploadImage.middleware.js";
import produtoController from "../controller/produto.controller.js";

const produtoRoutes = Router();


produtoRoutes.post('/produtos/images', uploadImage, produtoController.upload);

produtoRoutes.get('/produtos', produtoController.buscarTodosProdutos);
produtoRoutes.get('/produtos/:idProduto', produtoController.buscarProdutoPorId);
produtoRoutes.post('/produtos', uploadImage, produtoController.incluirProduto);
produtoRoutes.put('/produtos/:idProduto', produtoController.atualizarProduto);
produtoRoutes.delete('/produtos/:idProduto', produtoController.excluirProduto);

export default produtoRoutes;