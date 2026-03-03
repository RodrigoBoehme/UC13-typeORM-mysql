import { Usuario } from "../entities/Usuario";
import { AppDataSource } from "../database/data-source";
/**
 * Service = regra de negócio + acesso ao banco
 * Ele não reconhece Express(request/response)
 */
export class UsuarioService {
  // Pega o "repositorio" da entidade Usuario (CRUD pronto do TypeORM)
  private repo = AppDataSource.getRepository(Usuario);

  //Listar
  async listar() {
    //retorna todos os usuarios ordenados do mais novo para o mais antigo
    return this.repo.find({ order: { id: "DESC" } });
  }
  //Buscar por id
  async buscarPorId(id: number) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new Error("Usuario não encontrado");
    return user;
  }
  //Criar
  async criar(nome: string, email: string) {
    if (!nome || nome.trim().length < 2) {
      throw new Error("Nome invalido (Minimo 2 caracteres)");
    }
    if (!email || !email.includes("@")) {
      throw new Error("Email invalido");
    }
    //garante email unico
    const existe = await this.repo.findOne({ where: { email } });
    if (existe) throw new Error("Ja existe um usuario com este email");
    //create monta o objeto da entidade
    const novo = this.repo.create({
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      ativo: true,
    });
    //Save() insere no banco e devolve com o id preenchido
    return this.repo.save(novo);
  }
  //Atualizar
  async atualizar(id: number, dados: Partial<Usuario>) {
    const user = await this.buscarPorId(id);
    //Se vier nome,valida e aolica
    if (dados.nome !== undefined) {
      if (!dados.nome || dados.nome.trim().length < 2) {
        throw new Error("Nome Invalido (Minimo 2 caracteres)");
      }
      user.nome = dados.nome.trim();
    }
    //se vier email, valida e checa unicidade
    if (dados.email !== undefined) {
      if (!dados.email || !dados.email.includes("@")) {
        throw new Error("Email invalido");
      }
      const emailNovo = dados.email.trim().toLowerCase();
      const outro = await this.repo.findOne({ where: { email: emailNovo } });
      if (outro && outro.id !== id) throw new Error("Email ja esta em uso");
      user.email = emailNovo;
    }
    //Se vier ativo, aplica o boolean
    if (dados.ativo !== undefined) {
      user.ativo = Boolean(dados.ativo);
    }
    return this.repo.save(user);
  }
  //Deletar
  async remove(id: number) {
    const user = await this.buscarPorId(id);
    //remove
    await this.repo.remove(user);
    return { messagem: "Usuario removido" };
  }
}
