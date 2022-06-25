import { config } from 'dotenv';
import express, { Application, NextFunction, Request, Response } from 'express';
import { getRawDataStructure, getLatestDataEntries } from './services'

config();

const app: Application = express();

// app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(express.json());

app.get('/dataStructure', (req: Request, res: Response) => {
    const dataStructure = getRawDataStructure();
    res.send({dataStructure})
});

app.post('/dataEntries', (req: Request, res: Response)  => {
    console.log('req', req.body)
    const latestEntries = getLatestDataEntries(req.body.hash)
    res.send({latestEntries})
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});