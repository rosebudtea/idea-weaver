export async function startUp() {
    fetch(`http://localhost:8080/start`, {method: 'post'})
    .then(response => response.json())
    .catch(error => console.log("ERROR during start up: " + error));
}

export async function fetchAllContent(dispatchFn, dispatchName, category, worldName) {
    fetch(`http://localhost:8080/retrieveAll?category=${category}&worldName=${worldName}`)
    .then(response => response.json())
    .then(data => {
        console.log("All Content:");
        console.log(data);
        if (dispatchName === "CHANGE_CATEGORY") {
            dispatchFn({type: dispatchName, payload: {name: category, content: data}});
        } else {
            dispatchFn({type: dispatchName, payload: data});
        }
    })
    .catch(error => console.log("ERROR fetching all content: " + error));
};

export async function fetchContent(dispatchFn, category, contentId, worldName) {
    fetch(`http://localhost:8080/retrieve?category=${category}&contentId=${contentId}&worldName=${worldName}`)
    .then(response => response.json())
    .then(data => {
        console.log("Specific Content:");
        console.log(data);

        dispatchFn({
            type: "CHANGE_MAIN_CONTENT",
            payload: data,
        });
    })
    .catch(error => console.log("ERROR fetching content: " + error));
};

export async function fetchCategories(dispatchFn, worldName) {
    fetch(`http://localhost:8080/retrieveCategories?worldName=${worldName}`)
    .then(response => response.json())
    .then(data => {
        // console.log("Categories:");
        // console.log(data);
        dispatchFn({type: "CHANGE_CATEGORY", payload: {name: "elements", content: data}});
    })
    .catch(error => console.log("ERROR fetching categories: " + error));
};

export async function fetchWorlds(dispatchFn) {
    fetch(`http://localhost:8080/retrieveWorlds`)
    .then(response => response.json())
    .then(data => {
        console.log("Worlds:");
        console.log(data);
    })
    .catch(error => console.log("ERROR retrieving worlds: " + error));
};

export async function createContent(category, name, worldName) {
    console.log(category + " " + name + " " + worldName);
    fetch(`http://localhost:8080/create?category=${category}&name=${name}&worldName=${worldName}`, {method: 'post'})
    .then(response => response.json())
    .then(data => {
        console.log("Content:");
        console.log(data);
    })
    .catch(error => console.log("ERROR creating content: " + error));
};

export async function createCategory(category, worldName) {
    console.log(category + " " + worldName);
    fetch(`http://localhost:8080/createCategory?worldName=${worldName}&category=${category}`, {method: 'post'})
    .then(response => response.json())
    .then(data => {
        console.log("Content:");
        console.log(data);
    })
    .catch(error => console.log("ERROR creating content: " + error));
};

export async function createWorld(dispatchFn, worldName) {
    fetch(`http://localhost:8080/createWorld?worldName=${worldName}`, {method: 'post'})
    .then(response => response.json())
    .then(data => {
        // console.log("Content:");
        // console.log(data);
        dispatchFn(data);
    })
    .catch(error => console.log("ERROR creating world: " + error));
};

export async function updateContent(id, worldName, category, name, content) {
    fetch(`http://localhost:8080/update`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
            "id": id,
            "worldName": worldName,
            "category": category,
            "name": name,
            "mainContent": content,
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log("Content:");
        console.log(data);
    })
    .catch(error => console.log("ERROR updating content paneling: " + error));
};

export async function deleteContent(category, id, worldName) {
    fetch(`http://localhost:8080/delete?category=${category}&contentId=${id}&worldName=${worldName}`, {method: 'delete'})
    .then(response => response.json())
    .then(data => {
        console.log("Content:");
        console.log(data);
    })
    .catch(error => console.log("ERROR deleting content: " + error));
};

export async function deleteWorld(worldName) {
    fetch(`http://localhost:8080/deleteWorld?worldName=${worldName}`, {method: 'delete'})
    .then(response => response.json())
    .then(data => {
        console.log("Content:");
        console.log(data);
    })
    .catch(error => console.log("ERROR deleting world: " + error));
};
