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
        axios.get(config.pterodactyl.panel + `/api/application/nests/${element.attributes.id}/eggs?include=variables`, {
            headers: {
                "Authorization": `Bearer ${config.pterodactyl.api}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then( res => {
            res.data.data.forEach(egg => {
                //delete egg.attributes.startup;
                delete egg.attributes.config;
                delete egg.attributes.script;
                delete egg.attributes.docker_images;
                delete egg.attributes.uid;
                delete egg.attributes.nest;
                delete egg.attributes.author;
                delete egg.attributes.updated_at;
                delete egg.attributes.created_at;
                egg.attributes.relationships.variables.data.forEach(variable => {
                    const indexit = variable.attributes;

                    delete indexit.id;
                    delete indexit.egg_id;
                    delete indexit.name;
                    delete indexit.description;
                    delete indexit.user_viewable;
                    delete indexit.user_editable;
                    delete indexit.rules;
                    delete indexit.created_at;
                    delete indexit.updated_at;

                    console.log(indexit)
                });
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