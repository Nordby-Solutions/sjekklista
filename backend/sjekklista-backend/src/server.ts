import sjekklistaApp from "./app";

const port = process.env.PORT || 3000;

sjekklistaApp.listen(port, () => {
  console.log("Server running on http://localhost:" + port);
});
