import { Request, Response } from "express";
import { ProductService } from "../service/productService"; // Corrigido o import
import { SaleService } from "../service/saleService";
import { SaleProductService } from "../service/saleProductService";

export class SaleProductController {
  static async criar(req: Request, res: Response) {
    try {
      const { venda, produto, quantidade, precoVenda  } = req.body;

      if (!venda || produto || quantidade || precoVenda) {
        return res.status(400).json({ error: "O total de vendas produtos é obrigatório." });
      }

      const novaVendaProduto = await SaleProductService.criar({ venda, produto, quantidade, precoVenda  });

      return res.status(201).json(novaVendaProduto);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar venda produto." });
    }
  }

  static async listar(req: Request, res: Response) {
    try {
      const vendas = await SaleProductService.listar();
      return res.status(200).json(vendas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao listar vendas produtos." });
    }
  }

  static async listarPorId(req: Request, res: Response) {
    try {
      const id = Number(req.query.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido." });
      }

      const vendasProdutos = await SaleProductService.buscarPorId(id);
      if (!vendasProdutos) {
        return res.status(404).json({ error: "Venda produto não encontrada." });
      }

      return res.status(200).json(vendasProdutos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar vendas produtos." });
    }
  }

  static async atualizar(req: Request, res: Response) {
    try {
      const id = Number(req.query.id);
      const { venda, produto, quantidade, precoVenda } = req.body;

      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido." });
      }

      const vendaExistente = await SaleProductService.buscarPorId(id);
        if (!vendaExistente) {
        return res.status(404).json({ error: "Venda produto não encontrada." });
        }

      const vendaProductAtualizada = await SaleProductService.atualizar(id, { venda, produto, quantidade, precoVenda });
      return res.status(200).json(vendaProductAtualizada);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao atualizar venda produto." });
    }
  }

  static async deletar(req: Request, res: Response) {
    try {
      const id = Number(req.query.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido." });
      }

      const vendaProdutoExistente = await SaleProductService.buscarPorId(id);
        if (!vendaProdutoExistente) {
        return res.status(404).json({ error: "Venda produto não encontrada." });
        }

      await SaleProductService.deletar(id);
      return res.status(200).json({ mensagem: "Venda produto deletada com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao deletar venda produto." });
    }
  }
}
