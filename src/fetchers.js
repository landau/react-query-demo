const HOST = "http://localhost:4000/graphql";

export const fetchByQuery = async (query, variables = {}) => {
  const res = await fetch(HOST, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  return res.json();
};
