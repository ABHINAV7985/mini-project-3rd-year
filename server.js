const express = require("express");
const path = require("path");
const app = express();

// Absolute path to your project folder
const rootDir = __dirname;

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(rootDir));

// Serve any HTML file directly by name (case-insensitive)
app.get("/:page?", (req, res) => {
  let page = req.params.page ? req.params.page + ".html" : "Index.html";

  // Try both lowercase and original case filenames
  const filePath = path.join(rootDir, page);
  const altPath = path.join(rootDir, page.charAt(0).toUpperCase() + page.slice(1));

  res.sendFile(filePath, (err) => {
    if (err) {
      res.sendFile(altPath, (err2) => {
        if (err2) res.status(404).send("<h1 style='color:lime'>Page not found</h1>");
      });
    }
  });
});

module.exports = app;
