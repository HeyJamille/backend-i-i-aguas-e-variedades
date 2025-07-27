import { prisma } from "../prisma/client";
import { Prisma } from "@prisma/client"; // importa os tipos do Prisma

export const SaleService = {
  async criar(data: Prisma.VendaCreateInput) {
    return await prisma.venda.create({ data });
  },

  async atualizar(id: number, data: Prisma.VendaCreateInput) {
    return await prisma.venda.update({ where: { id }, data });
  },

  async listar() {
    return await prisma.venda.findMany();
  },

  async buscarPorId(id: number) {
    return await prisma.venda.findUnique({ where: { id: Number(id) } });
  },

  async deletar(id: number) {
    return await prisma.venda.delete({ where: { id: Number(id) } });
  } 
};
