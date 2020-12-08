import React from "react";
import { useQuery, useQueryCache } from "react-query";
import PostForm from "./PostForm";
import { fetchByQuery } from "./fetchers";

const Post = ({ title }) => {
  return (
    <li>
      <a href="#">{title}</a>
    </li>
  );
};

const Sidebar = () => {
  useQueryCache();

  const { data: posts, isLoading, error, status } = useQuery(
    ["posts", { count: 0 }],
    async () => {
      const { data } = await fetchByQuery(`
      query {
        posts { id title }
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
    <aside className="col-md-4 blog-sidebar">
      <div className="p-4">
        <h4 className="font-italic">Archives</h4>
        <ol className="list-unstyled mb-0">
          {posts.map(({ id, title }) => (
            <Post key={id} title={title} />
          ))}
        </ol>
      </div>
      <div className="p-4">
        <h4 className="font-italic">Create Post</h4>
        <PostForm />
      </div>
    </aside>
  );
};

export default Sidebar;
