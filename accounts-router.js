const express = require('express');

const db = require('./data/dbConfig');

const router = express.Router();

router.get('', async (req, res, next) => {
    try {
        await db.select("*").from("budget")
        res.json(budget)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const account = await db("budget").first("*").where("id", req.params.id)
        res.json(account)
    } catch (err) {
        next(err)
    }
})

router.post('', async (req, res, next) => {
    try {
        const payload = {
            name: req.body.name,
            budget: req.body.budget,
        }

        const [id] = await db("budget").insert(payload)
        const account = await db("budget").where("id", id).first()

        res.json(account)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const payload = {
            name: req.body.name,
            budget: req.body.budget,
        }

        await db("budget").where("id", req.params.id).update(payload)
        const updatedAccount = await db("budget").where("id", req.params.id).first()

        res.json(updatedAccount)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        await db("budget").where("id", req.params.id).del()
        res.status(204).end()
    } catch (err) {
        next(err)
    }
})