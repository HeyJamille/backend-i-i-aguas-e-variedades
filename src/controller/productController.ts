import { Request, Response } from "express";
import { ProductService } from "../service/productService"; // Corrigido o import

export class ProductsController {
  static async criar(req: Request, res: Response) {
    try {
      const { nome, marca, categoriaId, preco, estoque, descricao, tipo, cliente, precoCusto } = req.body;

      if (!nome) {
        return res.status(400).json({ error: "O nome do produto é obrigatório." });
      }

      const produtoExistente = await ProductService.buscarPorNome(nome);
      if (produtoExistente) {
        return res.status(409).json({ error: "Produto já cadastrado." });
      }

      const novoProduto = await ProductService.criar({ nome, marca, categoriaId, preco, estoque, descricao, tipo, cliente, precoCusto });

      return res.status(201).json(novoProduto);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar produto." });
    }
  }

  static async listar(req: Request, res: Response) {
    try {
      const produtos = await ProductService.listar();
      return res.status(200).json(produtos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao listar produtos." });
    }
  }

  static async listarPorId(req: Request, res: Response) {
    try {
      const id = Number(req.query.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido." });
      }

      const produtos = await ProductService.buscarPorId(id);
      if (!produtos) {
        return res.status(404).json({ error: "Produto não encontrado." });
      }

      return res.status(200).json(produtos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar produto." });
    }
  }

  static async atualizar(req: Request, res: Response) {
    try {
      const id = Number(req.query.id);
      const { nome, marca, categoriaId, preco, estoque, descricao, tipo, cliente, precoCusto } = req.body;

      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido." });
      }

      const produtoExistente = await ProductService.buscarPorId(id);
        if (!produtoExistente) {
        return res.status(404).json({ error: "Produto não encontrado." });
        }

      const produtoAtualizado = await ProductService.atualizar(id, { nome, marca, categoriaId, preco, estoque, descricao, tipo, cliente, precoCusto });
      return res.status(200).json(produtoAtualizado);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao atualizar produto." });
    }
  }

  static async deletar(req: Request, res: Response) {
    try {
      const id = Number(req.query.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido." });
      }

      const produtoExistente = await ProductService.buscarPorId(id);
        if (!produtoExistente) {
        return res.status(404).json({ error: "Produto não encontrado." });
        }

      await ProductService.deletar(id);
      return res.status(200).json({ mensagem: "Produto deletado com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao deletar produto." });
    }
  }
}
