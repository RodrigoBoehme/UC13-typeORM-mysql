import { Usuario } from "../entities/Usuario";
import { AppDataSource } from "../database/data-source";
/**
 * Service = regra de negócio + acesso ao banco
 * Ele não reconhece Express(request/response)
 */
export class UsuarioService{
    // Pega o "repositorio" da entidade Usuario (CRUD pronto do TypeORM)
    private repo=AppDataSource.getRepository(Usuario)
    
}