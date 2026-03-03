import express from "express";
import { usuarioRoutes } from "./routes/usuarios.routes";


import swaggerUi from "swagger-ui-express"
import { swaggerSpec } from "./docs/swagger";

export const app=express()


app.use(express.json())
//Swagger
app.use("/docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec))

//rotas
app.use("/api",usuarioRoutes)

//rota simples para teste
app.get("/",(req,res)=>res.send("API TypeORM rodando"))