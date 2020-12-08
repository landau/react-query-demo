const { createServer } = require("./server");

(async () => {
  await createServer(4000);
})();
