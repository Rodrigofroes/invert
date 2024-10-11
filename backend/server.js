import express from 'express'
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const outputJson = require("./swagger-output.json");
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';

import cursoRoute from './routes/cursoRoute.js';
import matriculaRoute from './routes/matriculaRoute.js'
import authRoute from './routes/authRoute.js'
import mensalidadeRoute from './routes/mensalidadeRoute.js'

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//página de documentação
app.use('/docs', swaggerUi.serve, swaggerUi.setup(outputJson));
app.use('/curso', cursoRoute);
app.use('/matricula', matriculaRoute);
app.use('/auth', authRoute);
app.use('/mensalidade', mensalidadeRoute);

app.listen(5000, function() {
    console.log("backend em execução");
})