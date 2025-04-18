import fs from 'fs';
import path from 'path';

import express from 'express';

import controller from '../controller/index.js';

const router = express().router

const VIEW = path.resolve() + '/src/view'

router.get("/", (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200);
    const home = fs.readFileSync(VIEW + '/home.html', 'utf-8');
    res.send(home)
})

router.post('/user', (req, res) => {
    const name = req.body.name;

    res.setHeader('Content-Type', 'application/json');
    res.status(201);

    controller.createUser({ name }).then(user => {
        res.json(user);
    })
})

router.get('/users', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    controller.getUsers().then(users => {
        res.statusMessage = users.message;
        res.status(users.status);
        res.json(users);
    })
})

router.delete('/users/:id', (req, res) => {
    const id = req.params.id;

    res.setHeader('Content-Type', 'application/json');

    controller.deleteUser({ id }).then(user => {
        res.statusMessage = user.message;
        res.status(user.status).json(user);
    })

})

router.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body.name;

    res.setHeader('Content-Type', 'application/json');

    controller.updateUser({ id, name }).then(user => {
        res.statusMessage = user.message;
        res.status(user.status).json(user);
    })
})

export default router;