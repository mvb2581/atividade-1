import {Router} from "express";
import uploadImage from "../middleware/uploadImage.middleware.js";
import produtoController from "../controller/produto.controller.js";


const produtoRoutes = Router();
produtoRoutes.post('/produtos/images', uploadImage,produtoController.upload);




export default produtoRoutes