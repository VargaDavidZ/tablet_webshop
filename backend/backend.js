import express from "express";
import cors from 'cors';
import mysql from 'mysql2';

const app = express();

app.use(cors())

app.use(express.json());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'webbolt'
}).promise();

app.get('/tablets', async (req, res) => {

    try {
        const temp = await db.query('SELECT * FROM tablets');
        const rows = temp[0];
        const fields = temp[1];
        res.status(200).json(rows);
    } catch (error) {
        console.error(`Error retrieving tablets ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


app.get('/mostexpensive', async (req, res) => {

    try {
        const temp = await db.query('SELECT * FROM tablets ORDER BY price DESC LIMIT 3');
        const rows = temp[0];
        const fields = temp[1];
        res.status(200).json(rows);
    } catch (error) {
        console.error(`Error retrieving tablets ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


app.get('/cheapest', async (req, res) => {

    try {
        const temp = await db.query('SELECT * FROM tablets ORDER BY price ASC LIMIT 3');
        const rows = temp[0];
        const fields = temp[1];
        res.status(200).json(rows);
    } catch (error) {
        console.error(`Error retrieving tablets ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


app.get('/tablets/:tabletId', async (req, res) => {
    try {
        let tabletId = parseInt(req.params.tabletId);
        const [rows, fields] = await db.query('SELECT id, title, op_sys, cpu_hz,cpu_cores,screen_size,screen_res,ram,description,price FROM tablets WHERE id =?', [tabletId]);
        if (rows.length == 1){
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({error: 'There is no tablet with this id.'});
        }
    } catch (error) {
        console.error(`Error retrieving posts ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.post('/tablets', async (req, res) => {


    try {
        let tabletData = [req.body.title, req.body.op_sys,req.body.cpu_hz,req.body.cpu_cores,req.body.screen_size,req.body.screen_res,req.body.ram,req.body.description,req.body.price];

    

        const [rows, fields] = await db.query('INSERT INTO tablets (title, op_sys, cpu_hz,cpu_cores,screen_size,screen_res,ram,description,price) VALUES (?,?,?,?,?,?,?,?,?)', tabletData);
        res.status(200).json({ message: 'Tablet successfully added!' });


    } catch (error) {
        console.error(`Error retrieving tablets ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.delete('/tablets/:tabletId', async (req, res) => {
    try {
        let tabletId = parseInt(req.params.tabletId);
        const [rows, fields] = await db.query('DELETE FROM tablets WHERE id =?', [tabletId]);
        if (rows.length === 0) {
            res.status(404).json({ error: "Tablet not found" });
        } else {
            res.status(200).json({ message: "Tablet successfully removed" });
        }

    } catch (error) {
        console.error(`Error retrieving tablets ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.listen(3000);
