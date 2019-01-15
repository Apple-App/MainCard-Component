const app = require("./app.js");

const port = process.env.PORT || 9001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
