import { prisma } from "../prisma/client";
import { Prisma } from "@prisma/client"; // importa os tipos do Prisma

export const SaleProductService = {
  async criar(data: Prisma.VendaProdutoCreateInput) {
    return await prisma.vendaProduto.create({ data });
  },

  async atualizar(id: number, data: Prisma.VendaProdutoCreateInput) {
    return await prisma.vendaProduto.update({ where: { id }, data });
  },

  async listar() {
    return await prisma.vendaProduto.findMany();
  },

  async buscarPorId(id: number) {
    return await prisma.vendaProduto.findUnique({ where: { id: Number(id) } });
  },

  async deletar(id: number) {
    return await prisma.vendaProduto.delete({ where: { id: Number(id) } });
  } 
};
