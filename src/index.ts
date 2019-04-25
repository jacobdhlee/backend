import "reflect-metadata";
import { createConnection } from "typeorm";
import { GraphQLServer } from 'graphql-yoga'
import { importSchema } from 'graphql-import';
import * as path from 'path';
import { resolvers } from './resolvers';

const typeDefs = importSchema(path.join(__dirname + "/schema.graphql"));
const server = new GraphQLServer({ typeDefs, resolvers });

//create connection to postgresql
createConnection().then(() => {
    //when success to connect db and start server
    server.start(() => console.log('Server is running on localhost:4000'))
})