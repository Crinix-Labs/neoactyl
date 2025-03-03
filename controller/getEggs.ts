import fs from "node:fs";
import toml from "toml";
import axios from "axios";

const config = toml.parse(fs.readFileSync(process.cwd() + "/config.toml", "utf-8"));

axios.get(config.pterodactyl.panel + "/api/application/nests", {
    headers: {
        "Authorization": `Bearer ${config.pterodactyl.api}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
}).then(res => {
    res.data.data.forEach(element => {
        axios.get(config.pterodactyl.panel + `/api/application/nests/${element.attributes.id}/eggs`, {
            headers: {
                "Authorization": `Bearer ${config.pterodactyl.api}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then( res => {
            res.data.data.forEach(egg => {
                console.log(egg.attributes.name)
            })
        })
    });
});

/*
axios.get(config.pterodactyl.panel + "/api/application/nests/1/eggs", {
    headers: {
        "Authorization": `Bearer ${config.pterodactyl.api}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
})*/