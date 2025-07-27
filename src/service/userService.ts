import { prisma } from "../prisma/client";
import { Prisma } from "@prisma/client"; // importa os tipos do Prisma

export const UsersService = {
  async criar(data: Prisma.UsuarioCreateInput) {
    return await prisma.usuario.create({ data });
  },

  async atualizar(id: number, data: Prisma.UsuarioUpdateInput) {
    return await prisma.usuario.update({ where: { id }, data });
  },

  async listar() {
    return await prisma.usuario.findMany();
  },

  async buscarPorEmail(email: string) {
    return await prisma.usuario.findUnique({ where: { email } });
  },

  async buscarPorId(id: number) {
    return await prisma.usuario.findUnique({ where: { id: Number(id) } });
  },

  async deletar(id: number) {
    return await prisma.usuario.delete({ where: { id: Number(id) } });
  } 
};
