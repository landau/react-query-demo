const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { v4: uuid } = require("uuid");

const createPost = ({ title, body }) => ({ id: uuid(), title, body });

const createDB = (seedPosts = []) => {
  const posts = [...seedPosts];

  return {
    createPost({ title, body }) {
      const post = createPost({ title, body });
      posts.unshift(post);
      return post;
    },

    findAll() {
      return posts;
    },

    findOne(id) {
      return posts.find((p) => p.id === id);
    },
  };
};

const schema = buildSchema(`
  type Post {
    id: ID!
    title: String!
    body: String!
  }

  type Query {
    post(id: ID!): Post
    posts(limit: Int = 5): [Post]!
  }

  input CreatePost {
    title: String!
    body: String!
  }

  type Mutation {
    createPost(input: CreatePost!): Post!
  }
`);

const db = createDB([createPost({ title: "Test Title", body: "Test Body" })]);

const resolvers = {
  post({ id }) {
    return db.findOne(id);
  },

  posts({ limit }) {
    return db.findAll().slice(0, limit);
  },

  createPost({ input: { title, body } }) {
    return db.createPost({ title, body });
  },
};

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    rootValue: resolvers,
    schema: schema,
  })
);

app.use(express.static("public"));

const createServer = async (port = 4000) => {
  const server = await new Promise((resolve, reject) => {
    const server = app.listen(port, (err) =>
      err ? reject(err) : resolve(server)
    );
  });

  console.log(
    `Running a GraphQL API server at http://localhost:${port}/graphql`
  );

  return server;
};

module.exports = { createServer };
