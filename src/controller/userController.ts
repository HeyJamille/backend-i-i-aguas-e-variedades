import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UsersService } from "../service/userService"; 

export class UserController {
  static async criar(req: Request, res: Response) {
    try {
      const { nome, email, senha, regra } = req.body;
      if (!nome || !email || !senha || !regra) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
      }

      const userExistente = await UsersService.buscarPorEmail(email);
      if (userExistente) {
        return res.status(409).json({ error: "Email já cadastrado" });
      }

      const senhaHash = await bcrypt.hash(senha, 10);

      const novoUsuario = await UsersService.criar({
        nome,
        email,
        senha: senhaHash,
        regra,
      });

      const token = jwt.sign({ id: novoUsuario.id }, process.env.JWT_SECRET!, { expiresIn: "1d" });

      res.status(201).json({
        usuario: novoUsuario,
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  }

  static async listar(req: Request, res: Response) {
    try {
      const usuarios = await UsersService.listar();
      res.status(200).json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao listar usuários" });
    }
  }

  static async listarPorId(req: Request, res: Response) {
    try {
      const id = Number(req.query.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      const usuario = await UsersService.buscarPorId(id);
      if (!usuario) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      res.status(200).json(usuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  }

  static async atualizar(req: Request, res: Response) {
    try {
      const id = Number(req.query.id);
      const { nome, email, senha, regra } = req.body;

      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      // Se a senha for enviada, hash antes de atualizar
      let senhaHash;
      if (senha) {
        senhaHash = await bcrypt.hash(senha, 10);
      }

      const dadosAtualizados: any = {
        nome,
        email,
        regra,
      };

      if (senhaHash) {
        dadosAtualizados.senha = senhaHash;
      }

      // Remover campos undefined (não enviados)
      Object.keys(dadosAtualizados).forEach(
        (key) => dadosAtualizados[key] === undefined && delete dadosAtualizados[key]
      );

      const usuarioAtualizado = await UsersService.atualizar(id, dadosAtualizados);

      res.status(200).json(usuarioAtualizado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
  }

  static async deletar(req: Request, res: Response) {
    try {
      const id = Number(req.query.id);

      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      await UsersService.deletar(id);

      res.status(200).json({ error: "Usuário deletado"});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao deletar usuário" });
    }
  }
}
