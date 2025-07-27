import bcrypt from 'bcrypt';
import { prisma } from './prisma/client';
import jwt from 'jsonwebtoken';

export async function criarUsuarioPadrao() {
  const emailAdmin = "admin@exemplo.com";

  const usuarioExistente = await prisma.usuario.findUnique({
    where: { email: emailAdmin },
  });

  if (!usuarioExistente) {
    const senhaHash = await bcrypt.hash("123456", 10);
    const usuario = await prisma.usuario.create({
      data: {
        nome: "Administrador",
        email: emailAdmin,
        senha: senhaHash,
        regra: "admin",
      },
    });

    // Gerar token JWT
    const payload = { id: usuario.id, email: usuario.email, regra: usuario.regra };
    const secret = process.env.JWT_SECRET || "segredo"; // configure no .env
    const token = jwt.sign(payload, secret, { expiresIn: "1d" });

    console.log("Usuário admin criado:", usuario.email);
    console.log("Token JWT gerado para admin:", token);
  } else {
    console.log("Usuário admin já existe.");
  }
}