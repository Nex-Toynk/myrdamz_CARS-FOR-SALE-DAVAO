import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dbPath = path.join(root, "data", "admin-db.json");
const staticPath = path.join(root, "app", "data", "static-vehicles.json");

const db = JSON.parse(await fs.readFile(dbPath, "utf8"));
const vehicles = Array.isArray(db.vehicles) ? db.vehicles : [];

await fs.writeFile(staticPath, `${JSON.stringify(vehicles, null, 2)}\n`);
console.log(`Synced ${vehicles.length} vehicles to app/data/static-vehicles.json`);
