import "dotenv/config"
import { app } from "./App"
import { AppDataSource } from "./database/data-source" 
//Server inicia o banco e dps sobe o servidor
const PORT=Number(process.env.PORT)

AppDataSource.initialize()
.then(()=>{
    console.log("Banco conectado 🆗🫡")
    app.listen(PORT,()=>{
        console.log(`Servidor rodando em http://localhost:${PORT}`);
        console.log(`Swagger 🆗 http://localhost:${PORT}/docs`)
    })
})
.catch((err)=>{
    console.log("Erro ao conectar no banco",err)
})