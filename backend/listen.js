const app = require("./app.js");
const PORT = process.env.PORT || 9090;

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}...`);
  // console.log(`Local: http://127.0.0.1:${PORT}`);
});
