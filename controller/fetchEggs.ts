import fs from "node:fs";
import toml from "toml";
import axios from "axios";

const config = toml.parse(fs.readFileSync(process.cwd() + "/config.toml", "utf-8"));

async function fetchEggs() {
    try {
        // Fetch all nests
        const nestsRes = await axios.get(`${config.pterodactyl.panel}/api/application/nests`, {
            headers: {
                "Authorization": `Bearer ${config.pterodactyl.api}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        const nests = nestsRes.data.data;

        // Fetch eggs for each nest in parallel
        await Promise.all(nests.map(async (nest) => {
            try {
                const eggsRes = await axios.get(`${config.pterodactyl.panel}/api/application/nests/${nest.attributes.id}/eggs?include=variables`, {
                    headers: {
                        "Authorization": `Bearer ${config.pterodactyl.api}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                });

                const eggs = eggsRes.data.data;

                // Process each egg
                eggs.forEach(egg => {
                    const attributes = egg.attributes;

                    // Remove unnecessary properties
                    ["config", "script", "docker_images", "uid", "nest", "author", "updated_at", "created_at"]
                        .forEach(prop => delete attributes[prop]);

                    // Process variables
                    const variables = attributes.relationships.variables.data.map(variable => {
                        const indexit = variable.attributes;

                        ["id", "egg_id", "name", "description", "user_viewable", "user_editable", "rules", "created_at", "updated_at"]
                            .forEach(prop => delete indexit[prop]);

                        return indexit;
                    });

                    delete attributes.relationships;
                    attributes.enabled = true;
                    attributes.variables = variables;
                    fs.appendFileSync(`${process.cwd()}/eggs/${attributes.name.replace(/\s+/g, "_")}.json`, JSON.stringify(attributes, null, 4));
                    console.log(`Egg ${attributes.name} has been saved!`);
                });

            } catch (error) {
                console.error(`Error fetching eggs for nest ${nest.attributes.id}:`, error.message);
            }
        }));

    } catch (error) {
        console.error("Error fetching nests:", error.message);
    }
}


export default fetchEggs;