const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        tittle:'Users Api',
        description:'Users Api'
    },
    host:'cse341-project-node.onrender.com',
    schemes:['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// this will gerner swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
