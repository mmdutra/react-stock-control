const express = require('express')
const bodyParser = require('body-parser').json()
const jwt = require('jsonwebtoken')

const Database = require('./database')

const app = express()

app.use(function (req, res, next) {
    express.urlencoded({ extended: true });
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        jwt.verify(token, 'MINHA_CHAVE_SECRETA', function (err, decoded) {
            if (err) {
                res.status(401).send('Unauthorized: invalid token')
            } else {
                next();
            }
        })
    }
}

app.post('/login', bodyParser, (req, res, next) => {
    const { email, password } = req.body

    if (email === 'mateus' && password === '123') {
        //auth ok
        const id = 1; //esse id viria do banco de dados
        var token = jwt.sign({ id }, 'MINHA_CHAVE_SECRETA', {
            // expiresIn: 300 // expires in 5min
        });
        res.status(200).json({ auth: true, token: token });
    } else {
        res.status(500).json({ error: 'Login inválido!' });
    }
})

app.get('/products', isAuthenticated, async (req, res) => {
    const data = await Database.read();
    res.send(data);
})

app.post('/products', bodyParser, isAuthenticated, async (req, res) => {
    const data = await Database.create(req.body);
    res.send(data);
})

app.delete('/products/:id', bodyParser, isAuthenticated, async (req, res) => {
    const response = await Database.remove(req.params.id);
    res.send(response);
})

app.listen(3333, () => {
    console.log('SERVER RODANDO!')
})