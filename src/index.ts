import "reflect-metadata";
import { createConnection } from "typeorm";
import { GraphQLServer } from 'graphql-yoga'
import Redis from 'ioredis';
import { User } from "./entity/User";
import { generateSchema } from './utils/generateSchema';

const redis = new Redis();
const server = new GraphQLServer({
    schema: generateSchema(),
    context: ({ request }) => ({
        redis,
        url: request.protocol + "://" + request.get("host")
    })
});

server.express.get("/confirm/:id", async (req, res) => {
    const { id } = req.params;
    const userId = await redis.get(id);
    if (userId) {
        await User.update({ id: userId }, { comfirmEmail: true });
        res.send("ok");
    } else {
        res.send("invalid id");
    }
});

//create connection to postgresql
createConnection().then(() => {
    //when success to connect db and start server
    server.start(() => console.log('Server is running on localhost:4000'))
})