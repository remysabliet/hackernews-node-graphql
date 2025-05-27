import { createServer, startServer } from "./config/server.js";

async function main() {
  const server = await createServer();
  await startServer(server);
}

main().catch((error) => {
  console.error("Error starting server:", error);
  process.exit(1);
}); 