import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const gamesDir = path.join(process.cwd(), "src/app/games");
    const games = [];

    // Read all directories in the games folder
    const gameDirs = fs
      .readdirSync(gamesDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    // For each game directory, read its metadata.json if it exists
    for (const gameDir of gameDirs) {
      const metadataPath = path.join(gamesDir, gameDir, "metadata.json");
      if (fs.existsSync(metadataPath)) {
        const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
        games.push({
          name: metadata.name || gameDir,
          path: `/games/${gameDir}`,
          description: metadata.description || "A fun web game",
          image: metadata.image || "https://placehold.co/800x600",
        });
      } else {
        // If no metadata.json exists, create a default entry
        games.push({
          name: gameDir,
          path: `/games/${gameDir}`,
          description: "A fun web game",
          image: "https://placehold.co/800x600",
        });
      }
    }

    return NextResponse.json(games);
  } catch (error) {
    console.error("Error reading games directory:", error);
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 }
    );
  }
}
