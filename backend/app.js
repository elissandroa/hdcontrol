const express = require('express');
const UserRouter = require('./src/routes/userRoutes');
const ProducRoute = require('./src/routes/productRoutes');
const  cors  = require('cors');
const conn = require('./src/db/conn');
const PORT = process.env.PORT;

function createApp() {
    const app = express()

    app.use(express.json())

    app.use(cors());

    app.use('/api', UserRouter);
    app.use('/api/prod', ProducRoute);

    conn
        .sync()
        //.sync({force: true})
        .then(app.listen(PORT, () => {
            console.log(`Rodando na porta: ${PORT}!`);
        })).catch((err) => {
            console.log("Não foi possível conectar ao banco");
        })

    return app;
}



module.exports = createApp;