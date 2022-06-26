import { config } from 'dotenv';
import express, { Application, NextFunction, Request, Response } from 'express';
import { getRawDataStructure, getLatestDataEntries, getHashes } from './services'
import { invokeAddData } from './services'

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

app.post('/addData', (req: Request, res: Response)  => {
    console.log('req', req.body.messages)
    const dataStructure = getRawDataStructure();
    const hashes = getHashes(dataStructure, req.body.messages); 
    const dataToAdd = invokeAddData(hashes.oldHash, hashes.newHash) 
    res.send({dataToAdd}) // TODO: invokeAddData should return a success message once transaction succeeds
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});