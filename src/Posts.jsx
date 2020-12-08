import React from "react";
import { useQuery, useQueryCache } from "react-query";
import { fetchByQuery } from "./fetchers";

const Post = ({ title, body }) => {
  return (
    <div className="blog-post">
      <h2 className="blog-post-title">{title}</h2>
      <p className="blog-post-meta">
        January 1, 2014 by <a href="#">Mark</a>
      </p>

      <p className="blog-post-body">{body}</p>
    </div>
  );
};

const Posts = () => {
  useQueryCache();

  const { data: posts, isLoading, error, status } = useQuery(
    "posts",
    async () => {
      const { data } = await fetchByQuery(`
      query {
        posts { id title body }
      }
    `);

      return data.posts;
    }
  );

  if (isLoading) {
    return "Loading...";
  }

  if (error) {
    return `An error occurred when fetching posts: ${error.message}`;
  }

  return (
    <div>
      {status === "success" &&
        posts.map(({ id, title, body }) => (
          <Post key={id} title={title} body={body} />
        ))}
    </div>
  );
};

export default Posts;
