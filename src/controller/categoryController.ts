import { Request, Response } from "express";
import { CategoryService } from "../service/categoryService"; // Corrigido o import

export class CategoryController {
  static async criar(req: Request, res: Response) {
    try {
      const { nome } = req.body;

      if (!nome) {
        return res.status(400).json({ error: "O nome da categoria é obrigatório." });
      }

      const categoriaExistente = await CategoryService.buscarPorNome(nome);
      if (categoriaExistente) {
        return res.status(409).json({ error: "Categoria já cadastrada." });
      }

      const novaCategoria = await CategoryService.criar({ nome });

      return res.status(201).json(novaCategoria);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar categoria." });
    }
  }

  static async listar(req: Request, res: Response) {
    try {
      const categorias = await CategoryService.listar();
      return res.status(200).json(categorias);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao listar categorias." });
    }
  }

  static async listarPorId(req: Request, res: Response) {
    try {
      const id = Number(req.query.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido." });
      }

      const categoria = await CategoryService.buscarPorId(id);
      if (!categoria) {
        return res.status(404).json({ error: "Categoria não encontrada." });
      }

      return res.status(200).json(categoria);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar categoria." });
    }
  }

  static async atualizar(req: Request, res: Response) {
    try {
      const id = Number(req.query.id);
      const { nome } = req.body;

      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido." });
      }

      const categoriaAtualizada = await CategoryService.atualizar(id, { nome });
      return res.status(200).json(categoriaAtualizada);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao atualizar categoria." });
    }
  }

  static async deletar(req: Request, res: Response) {
    try {
      const id = Number(req.query.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido." });
      }

      await CategoryService.deletar(id);
      return res.status(200).json({ mensagem: "Categoria deletada com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao deletar categoria." });
    }
  }
}
