import { Router } from 'express';

import { ProductsController } from './controller/productController';
import { UserController } from './controller/userController';
import { CategoryController } from './controller/categoryController';
import { SaleController } from './controller/saleController';
import { SaleProductController } from './controller/saleProduct';

import { authMiddleware } from './middleware/auth.middleware';

const router = Router();

// Categories
router.get('/categorias', CategoryController.listar); 
router.post('/categorias', CategoryController.criar); 
router.get('/categorias/find', CategoryController.listarPorId); 
router.put('/categorias', CategoryController.atualizar); 
router.delete('/categorias', CategoryController.deletar); 

// Products
router.get('/produtos', ProductsController.listar); 
router.post('/produtos', ProductsController.criar); 
router.get('/produtos/find', ProductsController.listarPorId); 
router.put('/produtos', ProductsController.atualizar); 
router.delete('/produtos', ProductsController.deletar); 
 

// Sales
router.get('/vendas', SaleController.listar); 
router.post('/vendas', SaleController.criar); 
router.get('/vendas/find', SaleController.listarPorId); 
router.put('/vendas', SaleController.atualizar); 
router.delete('/vendas', SaleController.deletar); 

// SalesProducts
router.get('/vendasProdutos', SaleProductController.listar); 
router.post('/vendasProdutos', SaleProductController.criar); 
router.get('/vendasProdutos/find', SaleProductController.listarPorId); 
router.put('/vendasProdutos', SaleProductController.atualizar); 
router.delete('/vendasProdutos', SaleProductController.deletar); 

// Users/
router.get('/usuarios', UserController.listar); 
router.get('/usuarios/find', UserController.listarPorId); 
router.post('/usuarios', authMiddleware, UserController.criar);
router.delete('/usuarios', UserController.deletar);
router.put('/usuarios', authMiddleware, UserController.atualizar); 

export default router;
