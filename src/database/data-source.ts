//import "reflect-metadata" -Necessario para o TypeORM funcionar corretamente com decorators

//(Ex.: @Entity, @Column, @ManyToOne etc)
import "reflect-metadata"

//Importa a classe DataSource do TypeORM 
//DataSource é quem representa a conexao com o banco de dados
import { DataSource } from "typeorm"

//Importa o dotenv para ler as variaves do arquivo .env
import dotenv from "dotenv"
//Carrega as variaves do arquivo .env para dentro do process.env
//Isso permite usar process.env.DB_HOST, por exemplo
dotenv.config()
/**
 * DataSource = configuração do TypeORM (Conexão com MySQL)
 * Aqui estamos dizendo:
 * -Qual banco usar
 * -Como conectar
 * -Quais entidades fazem parte do projeto
 */
export const AppDataSource= new DataSource({
    //Tipo de banco dque estamos usando
    type:"mysql",
    //endereco do servidor do banco
    host:process.env.DB_HOST,
    //Usuario do banco 
    password:process.env.DB_PASS,
    //Porta do mysql
    port:Number(process.env.DB_PORT || 3306),
    //Senha do banco
    username:process.env.DB_USER,
    //synchronize:true
    //Faz o TypeORM criar atualizar as tabelas automaticamente
    //Em desenvolvimento ok ser true em produção sera false
    synchronize:true,
    
    
})