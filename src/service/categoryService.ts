import { prisma } from "../prisma/client";
import { Prisma } from "@prisma/client"; // importa os tipos do Prisma

export const CategoryService = {
  async criar(data: Prisma.CategoriaCreateInput) {
    return await prisma.categoria.create({ data });
  },

  async atualizar(id: number, data: Prisma.CategoriaCreateInput) {
    return await prisma.categoria.update({ where: { id }, data });
  },

  async listar() {
    return await prisma.categoria.findMany();
  },

  async buscarPorNome(nome: string) {
    return await prisma.categoria.findUnique({ where: { nome } });
  },

  async buscarPorId(id: number) {
    return await prisma.categoria.findUnique({ where: { id: Number(id) } });
  },

  async deletar(id: number) {
    return await prisma.categoria.delete({ where: { id: Number(id) } });
  } 
};
