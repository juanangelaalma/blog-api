const Hapi = require("@hapi/hapi");
const connection = require('../database/connection');
const routes = require('./routes');

connection.connect((error) => {
    if(error) throw error;
    console.log("Database connected");
});

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: "localhost",
        routes: {
            cors: {
                origin: ["*"]
            }
        }
    });
    
    server.route(routes);
    
    await server.start();

    console.log('Server running', server.info.uri);

}
init();