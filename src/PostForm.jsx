import React from "react";
import { useState } from "react";
import { useQueryCache, useMutation } from "react-query";
import { fetchByQuery } from "./fetchers";

const PostForm = () => {
  const queryCache = useQueryCache();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [mutate] = useMutation(
    async ({ title, body }) => {
      const { data } = await fetchByQuery(
        `
      mutation CreatePost($input: CreatePost!) {
        createPost(input: $input) { id, title, body }
      }
    `,
        { input: { title, body } }
      );
      return data.createPost;
    },
    {
      onSuccess: () => {
        queryCache.invalidateQueries("posts");
      },
    }
  );

  const createPost = async (e) => {
    e.preventDefault();
    await mutate({ title, body });
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={createPost}>
      <div className="row">
        <div className="col-md-12 mb-3">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder=""
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mb-3 form-group">
          <label htmlFor="body">Body</label>
          <textarea
            id="body"
            className="form-control"
            rows="5"
            width="100%"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
