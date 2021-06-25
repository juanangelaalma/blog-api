const Hapi = require("@hapi/hapi");
const Bcrypt = require('bcrypt');
const connection = require('../database/connection');
const routes = require('./routes');

const users = {
    juan: {
        username: 'juan',
        password: '$2b$10$9oKbXPgW/TS5gfco/hm8YurKXpwHwOuFhMS92sqxVLlF6.N9s4.R.'
    }
}

connection.connect((error) => {
    if(error) throw error;
    console.log("Database connected");
});

const validate = async (request, username, password) => {
    const user = users[username];
    if(!user) {
        return { credentials: null, isValid: false }
    }

    const isValid = await Bcrypt.compare(password, user.password);
    const credentials = { username: user.username };

    return { isValid, credentials };
}

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

    await server.register(require('@hapi/basic'));

    server.auth.strategy('simple', 'basic', { validate });
    
    server.route(routes);
    
    await server.start();

    console.log('Server running', server.info.uri);

}
init();