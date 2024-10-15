const express = require('express');
const UserRouter = require('./src/routes/userRoutes');
const ProductRoute = require('./src/routes/productRoutes');
const OrderRoute = require('./src/routes/orderRoutes');
const RoleRoute = require('./src/routes/roleRoutes');

const  cors  = require('cors');
const conn = require('./src/db/conn');
const PORT = process.env.PORT;

function createApp() {
    const app = express()

    app.use(express.json())

    app.use(cors());

    app.use('/api', UserRouter);
    app.use('/api/prod', ProductRoute);
    app.use('/api/order/', OrderRoute);
    app.use('/api/role', RoleRoute);

    conn
        .sync()
        //.sync({force: true})
        .then(app.listen(PORT, () => {
            console.log(`Rodando na porta: ${PORT}!`);
        })).catch((err) => {
            console.log("Não foi possível conectar ao banco", err);
        })

    return app;
}



module.exports = createApp;