/**
 * Simple HTTP server to serve the published files
 * Usage: node src/scripts/serve-build.js [port]
 * Default port: 3001
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Define content types for common file extensions
const contentTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.woff': 'application/font-woff',
  '.woff2': 'application/font-woff2',
  '.ttf': 'application/font-ttf',
  '.otf': 'application/font-otf',
  '.eot': 'application/vnd.ms-fontobject',
};

// Get port from command line arguments or use default 3001
const port = process.argv[2] || 3001;

// Create HTTP server
const server = http.createServer((req, res) => {
  // Parse URL to get pathname
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;
  
  // Default to index.html for root path
  if (pathname === '/') {
    pathname = '/home.html';  // Assuming home.html is the default page
  }
  
  // Construct absolute file path in the build directory
  const filePath = path.join(process.cwd(), 'public/build', pathname);
  
  // Get file extension for content type
  const ext = path.extname(filePath);
  const contentType = contentTypes[ext] || 'application/octet-stream';
  
  // Read file from filesystem
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found
        fs.readFile(path.join(process.cwd(), 'public/build/404.html'), (err, data) => {
          if (err) {
            // No custom 404 page
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<html><body><h1>404 Not Found</h1><p>The requested URL was not found.</p></body></html>');
          } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(data);
          }
        });
      } else {
        // Server error
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<html><body><h1>500 Internal Server Error</h1><p>There was an error processing your request.</p></body></html>');
      }
    } else {
      // Success - send the file
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

// Start the server
server.listen(port, () => {
  console.log(`\n=== Preview Server Running ===`);
  console.log(`Server running at http://localhost:${port}/`);
  console.log(`Serving files from: ${path.join(process.cwd(), 'public/build')}`);
  console.log(`Press Ctrl+C to stop the server\n`);
});
