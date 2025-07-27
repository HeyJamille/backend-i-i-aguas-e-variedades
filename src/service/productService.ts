import { prisma } from "../prisma/client";
import { Prisma } from "@prisma/client"; // importa os tipos do Prisma

interface ProdutoInput {
  nome: string;
  marca: string;
  categoriaId: number;
  preco: number;
  estoque: number;
  descricao: string;
  tipo: string;
  cliente: string;
  precoCusto: number;
}

export const ProductService = {
  async criar(data: ProdutoInput) {
    return await prisma.produto.create(
      { data, 
        include: {
          categoria: true 
        }
      }
    );
  },

  async atualizar(id: number, data: ProdutoInput) {
    return await prisma.produto.update({ where: { id }, data });
  },

  async listar() {
    return await prisma.produto.findMany({
      include: {
        categoria: true
      }
    });
  },

  async buscarPorNome(nome: string) {
    return await prisma.produto.findFirst({ where: { nome } });
  },

  async buscarPorId(id: number) {
    return await prisma.produto.findUnique({ where: { id: Number(id) } });
  },

  async deletar(id: number) {
    return await prisma.produto.delete({ where: { id: Number(id) } });
  } 
};
