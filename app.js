const express = require("express");

const app = express();

app.use(express.json());
 
app.unsubscribe((req, res, next) =>{
    console.log("Já acessou pae!");
    next();
});

function valContato(req, res, next){
    if(!req.body.email){
        console.log("Acessou o Middlewares de validação!");
        return res.json({ 
            erro: true, 
            mensage: "necessário enviar o e-mail" 
        }); 
    }; 
    return next(); 
}; 
 
app.get("/", (req, res) => {  //"get" refere-se a visualizar/listar 
    res.send("Bem-Vindo - Erickk"); 
}); 
 
 
app.get("/contato/:id", (req, res) => {  //"get" refere-se a visualizar/listar 
    const { id } = req.params; 
    const { sit } = req.query; 
 
    return res.json({ 
        id, 
        nome: "Erick", 
        email: "erickkkk@google.com.br",  
        sit 
 
    });
});

app.post("/contato", valContato, (req, res) => {
    console.log("Acessou o Middlewares de validação!"); 
    var nome = req.body.nome;
    var { email } = req.body;

    //implementar a regra para salvar no banco de dados
    return res.json({
        nome,
        email
    });
});

app.put("/contato/:id", valContato, (req, res) => {
    const { id } = req.params;
    const { _id, nome, email } = req.body;

    return res.json({
        id,
        _id,
        nome,
        email
    });
});

app.delete("/contato/:id", (req, res) => {
    const { id } = req.params;

    return res.json({
        id
    });
});

app.listen(8080, () => {
    console.log("server iniciado na porta 8080: http://localhost:8080");
});

