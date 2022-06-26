import { config } from 'dotenv';
import express, { Application, Request, Response } from 'express';
import cors from 'cors'
import { getRawDataStructure, getLatestDataEntries, getHashes, initialDataStructureLoad, addToLocalMessages, getLocalMessages, validMessage, buildSingleDataEntry, addToMemPool} from './services'
import { invokeAddData } from './services'

config();

const app: Application = express();

initialDataStructureLoad()

app.use(cors())
app.use(express.json());

app.get('/dataStructure', (req: Request, res: Response) => {
    const dataStructure = getRawDataStructure();
    res.send({dataStructure})
});

app.post('/localMessages', (req: Request, res: Response)  => {
    const result = validMessage(req.body.message)
    if (result.success) {
        addToLocalMessages(req.body.message)
        res.status(200).send()
    } else {
        res.status(400).send()
    }
});

app.post('/gossip', (req: Request, res: Response)  => {
    try {
        const success = addToMemPool(req.body.dataEntry)
        if (success) {
            res.status(200).send()
        } else {
            console.log("failed validation")
            res.status(400).send()
        }
    } catch (e) {
        res.status(400).send()
        console.log(e)
    }
});

app.post('/newEntry', (req: Request, res: Response)  => {
    try {
        const newEntry = buildSingleDataEntry(req.body.messages)
        res.send({newEntry})
    } catch {
        res.status(400).send()
    }
});

app.get('/localMessages', (req: Request, res: Response)  => {
    const messages = getLocalMessages()
    res.send({messages})
});

app.post('/dataEntries', (req: Request, res: Response)  => {
    console.log('req', req.body)
    const latestEntries = getLatestDataEntries(req.body.hash)
    res.send({latestEntries})
})

app.post('/addData', (req: Request, res: Response) => {
    const { oldHash, newHash} = req.body
    invokeAddData(oldHash, newHash).then(result => {
        console.log({result})
        res.status(200).send()
    }).catch(e => {
        console.log
        res.status(400).send()

    })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});