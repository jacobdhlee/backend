import "reflect-metadata";
import { GraphQLSchema } from "graphql";
import { createConnection } from "typeorm";
import { GraphQLServer } from 'graphql-yoga'
import { importSchema } from 'graphql-import';
import * as path from 'path';
import * as fs from 'fs';
import { mergeSchemas, makeExecutableSchema } from 'graphql-tools';

const schemas: GraphQLSchema[] = [];
const folders = fs.readdirSync(path.join(__dirname + "/modules"));
folders.forEach((folder) => {
    const { resolvers } = require(`./modules/${folder}/resolvers`);
    const typeDefs = importSchema(path.join(__dirname + `/modules/${folder}/schema.graphql`));
    schemas.push(makeExecutableSchema({ resolvers, typeDefs }))
})
const server = new GraphQLServer({ schema: mergeSchemas({ schemas }) });

//create connection to postgresql
createConnection().then(() => {
    //when success to connect db and start server
    server.start(() => console.log('Server is running on localhost:4000'))
})