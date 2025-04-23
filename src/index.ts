import express from 'express'
import { Request, Response } from 'express'
import { isNamespaceExport } from 'typescript';

const app = express()
const PORT = process.env.PORT || 3000;

const DAMAGED_SYSTEM: { [key: string]: string } = {
    "navigation": "NAV-01",
    "communications": "COM-02",
    "life_support": "LIFE-03",
    "engines": "ENG-04",
    "deflector_shield": "SHLD-05"
};

let selectedSystem: string = "";

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    next()
});

app.get('/status', (req: Request, res: Response) => {
})