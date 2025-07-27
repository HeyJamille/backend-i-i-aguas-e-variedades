import { Request, Response } from "express";
import { ProductService } from "../service/productService"; // Corrigido o import
import { SaleService } from "../service/saleService";

export class SaleController {
  static async criar(req: Request, res: Response) {
    try {
      const { total } = req.body;

      if (!total) {
        return res.status(400).json({ error: "O total de vendas é obrigatório." });
      }

      const novaVenda = await SaleService.criar({ total });

      return res.status(201).json(novaVenda);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar venda." });
    }
  }

  static async listar(req: Request, res: Response) {
    try {
      const vendas = await SaleService.listar();
      return res.status(200).json(vendas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao listar vendas." });
    }
  }

  static async listarPorId(req: Request, res: Response) {
    try {
      const id = Number(req.query.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido." });
      }

      const vendas = await SaleService.buscarPorId(id);
      if (!vendas) {
        return res.status(404).json({ error: "Venda não encontrada." });
      }

      return res.status(200).json(vendas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar vendas." });
    }
  }

  static async atualizar(req: Request, res: Response) {
    try {
      const id = Number(req.query.id);
      const { total } = req.body;

      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido." });
      }

      const vendaExistente = await SaleService.buscarPorId(id);
        if (!vendaExistente) {
        return res.status(404).json({ error: "Venda não encontrado." });
        }

      const vendaAtualizada = await SaleService.atualizar(id, { total });
      return res.status(200).json(vendaAtualizada);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao atualizar venda." });
    }
  }

  static async deletar(req: Request, res: Response) {
    try {
      const id = Number(req.query.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido." });
      }

      const vendaExistente = await SaleService.buscarPorId(id);
        if (!vendaExistente) {
        return res.status(404).json({ error: "Venda não encontrada." });
        }

      await SaleService.deletar(id);
      return res.status(200).json({ mensagem: "Venda deletada com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao deletar venda." });
    }
  }
}
