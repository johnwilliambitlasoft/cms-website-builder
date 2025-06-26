import { NextResponse } from "next/server";
import http from "http";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { exec } from "child_process";
import util from "util";

const execPromise = util.promisify(exec);

// Store the server instance so we can stop it later if needed
let previewServer = null;
let previewPort = null;

export async function GET() {
  try {
    // If server is already running, return its info
    if (previewServer && previewPort) {
      return NextResponse.json({
        success: true,
        message: "Preview server is running",
        url: `http://localhost:${previewPort}`,
        port: previewPort,
      });
    }

    // Find an available port
    const port = await findAvailablePort(3100, 3200);
    previewPort = port;

    // Get build directory path
    const buildPath = path.join(process.cwd(), "public", "build");

    // Ensure the build directory exists
    if (!fs.existsSync(buildPath)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Build directory does not exist. Please publish your site first.",
        },
        { status: 400 },
      );
    }

    // Create and start the server
    previewServer = http.createServer((req, res) => {
      // Basic static file server
      let filePath = path.join(
        buildPath,
        req.url === "/" ? "home.html" : req.url,
      );

      // Check if path exists and is a directory
      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, "index.html");

        // If no index.html, try home.html
        if (!fs.existsSync(filePath)) {
          filePath = path.join(filePath, "home.html");
        }
      }

      // Check if file exists
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          res.writeHead(404);
          res.end("404 Not Found");
          return;
        }

        // Get file extension to set correct content type
        const ext = path.extname(filePath).toLowerCase();
        const contentTypeMap = {
          ".html": "text/html",
          ".css": "text/css",
          ".js": "text/javascript",
          ".json": "application/json",
          ".png": "image/png",
          ".jpg": "image/jpeg",
          ".jpeg": "image/jpeg",
          ".gif": "image/gif",
          ".svg": "image/svg+xml",
        };

        const contentType = contentTypeMap[ext] || "text/plain";

        // Read and serve the file
        fs.readFile(filePath, (err, content) => {
          if (err) {
            res.writeHead(500);
            res.end("500 Server Error");
            return;
          }

          res.writeHead(200, { "Content-Type": contentType });
          res.end(content, "utf-8");
        });
      });
    });

    previewServer.listen(port);

    // Return success with the preview URL
    return NextResponse.json({
      success: true,
      message: `Preview server started on port ${port}`,
      url: `http://localhost:${port}`,
      port,
    });
  } catch (error) {
    console.error("Error starting preview server:", error);
    return NextResponse.json(
      {
        success: false,
        message: `Error starting preview server: ${error.message}`,
      },
      { status: 500 },
    );
  }
}

// Helper function to find an available port
async function findAvailablePort(startPort, endPort) {
  let port = startPort;

  while (port <= endPort) {
    try {
      const server = createServer();

      await new Promise((resolve, reject) => {
        server.once("error", (err) => {
          reject(err);
        });

        server.once("listening", () => {
          server.close();
          resolve();
        });

        server.listen(port);
      });

      return port;
    } catch (err) {
      if (err.code !== "EADDRINUSE") {
        throw err;
      }

      port++;
    }
  }

  throw new Error(
    `No available ports found between ${startPort} and ${endPort}`,
  );
}

export async function DELETE() {
  // Endpoint to stop the preview server if needed
  if (previewServer) {
    previewServer.close();
    previewServer = null;
    previewPort = null;
    return NextResponse.json({
      success: true,
      message: "Preview server stopped",
    });
  }

  return NextResponse.json({
    success: false,
    message: "No preview server is running",
  });
}
