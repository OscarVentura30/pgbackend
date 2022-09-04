import express from 'express'

import config from './config'

const app = express();


//ajustes

app.set('port', config.port);

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));



export default app;
