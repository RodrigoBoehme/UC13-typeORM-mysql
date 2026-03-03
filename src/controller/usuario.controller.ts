import { Request, Response } from "express";
//O Controller não faz a regra: ele delega trabalhando com o service
import { UsuarioService } from "../services/Usuario.service";
//criar uma instancia do service para reutilizar em todas as rotas deste controller
const service = new UsuarioService();
//Exporta um objeto com métodos (cada metodo vira um handler/manipulador de rita)
//Ex.: router.get("/usuarios",UsuarioController.listar)

export const UsuarioController = {
  //GET/usuarios
  async listar(req: Request, res: Response) {
    //TRY/Catch para capturar os possiveis erros que possam acontecer no service/DB
    try {
      //Chama o service para buscar a lista de usuarios no banco
      const lista = await service.listar();
      //Retorna a lista em jackson(JSON) com status 200 (padrao do res.json)
      return res.json(lista);
    } catch (err: any) {
      //Se der erro inesperado (ex: banco ta fora)
      //responde 500 = erro do servidor
      return res.status(500).json({ erro: err.messagem });
    }
  },
  //Get /usuarios/:id
  async buscar(req: Request, res: Response) {
    try {
      //pega o id vindo da URL(/usuarios/10)
      //req.params.id sempre vem como stringo-> convertemos para number
      const id = Number(req.params.id);
      //chama o service para buscar o usuario
      const user = await service.buscarPorId(id);
      //retorna o usuarios em JSON(200)
      return res.json(user);
    } catch (err: any) {
      //se o service lançar erro (ex. usuario não encontrado)404
      return res.status(404).json({ erro: "Usuario não encontrado" });
    }
  },
  //POST /usuarios
  async criar(req: Request, res: Response) {
    try {
      //Pega os dados do body, enviados no json pelo cliente
      //Ex.: {"nome":"Caylin","email":"caylin@mail.com"}
      const { nome, email } = req.body;
      //Chama o service para validar e criar o usuario
      const novo = await service.criar(nome, email);
      return res.status(201).json(novo);
    } catch (err: any) {
      return res.status(400).json({ erro: err.messagem });
    }
  },
  //PUT /usuarios/:id
  async atualizar(req: Request, res: Response) {
    try {
      //Pega o id da URL e converte para numver
      const id = Number(req.params.id);
      const atualizado = await service.atualizar(id, req.body);
      return res.json(atualizado);
    } catch (err: any) {
      return res.status(400).json({ erro: err.messagem });
    }
  },
  //DELETE /usuarios/:id
  async remover(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const resp = await service.remove(id);

      return res.json(resp);
    } catch (err: any) {
      return res.status(404).json({ erro: err.messagem });
    }
  },

  async coffee(req: Request, res: Response) {
      return res.status(418).json({ erro: "Im a teapot" });
  }
};
