const qs = require('querystring');
const fs = require('fs');
const path = require('path');

const saveUser = newUser => {
    const userName = newUser.username;
    const fileUser = path.join(__dirname, '../../', 'db', '/users', `${userName}.json`)
    fs.writeFile(fileUser, JSON.stringify(newUser), error => {
        if (error) throw error;
        console.log(`${userName}.json created!`);
    })
};

const signUpRoute = (request, response) => {
    if (request.method === 'POST') {
        let body = '';

        request.on('data', data => {
            body += data;
            console.log(`Incoming data: ${data}`);
        });

        request.on('end', () => {
            const newUser = JSON.parse(body);

            saveUser(newUser);

            const successResponse = {
                status: 'success',
                user: newUser
            };

            response.writeHead(200, {
                "Content-type": "application/json"
            });

            response.write(JSON.stringify(successResponse));
            response.end();
        });
    };
};

module.exports = signUpRoute;