import fs from "fs";
import path from "path";

async function scanJsonFiles(folder: string): Promise<Record<string, any>[]> {
    const folderPath = path.resolve(folder);

    if (!fs.existsSync(folderPath)) {
        throw new Error(`Folder "${folder}" does not exist.`);
    }

    const files = fs.readdirSync(folderPath);
    const jsonFiles = files.filter(file => file.endsWith(".json"));

    const results: Record<string, any>[] = [];
    for (const file of jsonFiles) {
        const filePath = path.join(folderPath, file);
        try {
            const content = fs.readFileSync(filePath, "utf-8");
            results.push(JSON.parse(content));
        } catch (error) {
            console.error(`Error reading ${file}:`, error);
        }
    }

    return results;
}

export default scanJsonFiles;