import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())


app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
   })

   res.send(201).json(req.body)

})

app.put('/usuarios/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
   })

   res.send(201).json(req.body)

})

app.get('/usuarios', async (req, res) => {

    let users = []

    if(req.query) {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    } else {
        users = await prisma.user.findMany()
    }

    const user = await prisma.user.findMany()

    res.status(200).json(users)
})

app.delete('/usuarios/:id', async (req, res) => {

    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({ message: " Usuário deletado com sucesso!"})
})

app.listen(2000)

/* 
    Criar API de usuários

    - Criar um usuário
    - Lista um usuário
    - Editar um usuário
    - Deletar um usuário
*/

/* 
    1 - tipo de rota / método http
    2 - endreço

    usuário: joaocamposborges
    senha: Pedro_020
*/