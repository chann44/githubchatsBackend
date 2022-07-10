import server from "./server";


const port = 4000;
server.listen(port, () => {
  console.log("server starting on port: ", port);
});
