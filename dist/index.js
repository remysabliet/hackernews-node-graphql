import { startServer } from "./config/server.js";
async function main() {
    try {
        const { url } = await startServer();
        console.log(`Server is running at ${url}`);
    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}
main();
