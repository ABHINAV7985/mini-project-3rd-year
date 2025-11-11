const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname)));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/js', express.static(path.join(__dirname, 'js')));

// Serve HTML pages dynamically
app.get("/:page?", (req, res) => {
  let page = req.params.page || "Index.html";
  if (!page.endsWith(".html")) page += ".html";
  res.sendFile(path.join(__dirname, page), (err) => {
    if (err) res.status(404).send("Page not found");
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
