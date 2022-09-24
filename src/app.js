import express from 'express'
import config from './config'

const cookieParser  = require('cookie-parser');

const app = express();

//HBS
 const hbs = require('hbs');
 hbs.registerPartials(__dirname + '/views/partials', function (err) {});

// archivos estaticos

 app.use(express.static('public'));

//ajustes

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views/partials');


app.set('port', config.port);

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cookieParser());



export default app;
