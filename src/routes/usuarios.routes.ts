import { Router } from "express";
import { UsuarioController } from "../controller/usuario.controller";

//Routes = mapeia endpoints -> Controller 

/**
 * @swagger
 * tags: Usuarios
 * description: Endpoits de gerenciamento de usuarios
 *
 * components: 
 *   schemas:
 *     Usuario:
 *       type:object
 *          properties:
 *           id:
 *            type: integer
 *            example: 1
 *           nome:
 *            types:string
 *            example: "Rip Caylinone"
 *           email: 
 *            types: string
 *            example:"cailones@email.com"
 *           ativo:
 *            type:boolean
 *            example: true
 */

export const usuarioRoutes=Router()

/**
 *  @swagger
 *  /api/usuarios:
 *    get: 
 *      summary:lista de todos usuarios
 *      tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Usuario"
 *       404:
 *         description: Usuário não encontrado
 
 * 
 */

usuarioRoutes.get("/usuarios",UsuarioController.listar)
usuarioRoutes.get("/usuarios/:id",UsuarioController.buscar)



/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Dalvana Ribeiro"
 *               email:
 *                 type: string
 *                 example: "dalvana@email.com"
 *               ativo:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 */

usuarioRoutes.post("/usuarios",UsuarioController.criar)


/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Atualiza um usuário por ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Novo Nome"
 *               email:
 *                 type: string
 *                 example: "novo@email.com"
 *               ativo:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
usuarioRoutes.put("/usuarios/:id",UsuarioController.atualizar)

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Remove um usuário por ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
usuarioRoutes.delete("/usuarios/:id",UsuarioController.remover)


usuarioRoutes.get("/coffee/",UsuarioController.coffee)