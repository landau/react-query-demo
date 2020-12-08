import React from "react";
import { useQuery, useQueryCache } from "react-query";
import PostForm from "./PostForm";
import { fetchByQuery } from "./fetchers";

const Post = ({ title, body }) => {
  return (
    <div className="col-md-6">
      <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div className="col p-4 d-flex flex-column position-static">
          {/* <strong className="d-inline-block mb-2 text-primary">World</strong> */}
          <h3 className="mb-0">{title}</h3>
          <div className="mb-1 text-muted">Nov 12</div>
          <p className="card-text mb-auto">{body}</p>
          <a href="#" className="stretched-link">
            Continue reading
          </a>
        </div>
        <div className="col-auto d-none d-lg-block">
          <svg
            className="bd-placeholder-img"
            width="200"
            height="250"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
            aria-label="Placeholder: Thumbnail"
          >
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#55595c" />
            <text x="50%" y="50%" fill="#eceeef" dy=".3em">
              Thumbnail
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};

const LatestPosts = () => {
  useQueryCache();

  const { data: posts, isLoading, error } = useQuery(
    ["posts", { count: 2 }],
    async () => {
      const { data } = await fetchByQuery(`
      query {
        posts { id title, body }
      }
    `);

      return data.posts.slice(0, 2);
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
      <div className="nav-scroller py-1 mb-2">
        <nav className="nav d-flex justify-content-between">
          <a className="p-2 text-muted" href="#posts">
            Latest posts
          </a>
        </nav>
      </div>

      <div className="row mb-2">
        {posts.map(({ id, title, body }) => (
          <Post key={id} title={title} body={body} />
        ))}
      </div>
    </div>
  );
};

export default LatestPosts;
