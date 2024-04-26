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

export async function createElementType(worldId, elementType) {
    fetch(`http://localhost:8080/createElementType?worldId=${worldId}}&elementType=${elementType}`, {method: 'post'})
    .then(response => response.json())
    .then(data => {
        console.log("Content:");
        console.log(data);
    })
    .catch(error => console.log("ERROR creating content: " + error));
};

export async function fetchWorlds(dispatchFn) {
    fetch(`http://localhost:8080/retrieveWorlds`)
    .then(response => response.json())
    .then(data => {
        // console.log("Worlds:");
        // console.log(data);
        dispatchFn(data);
    })
    .catch(error => console.log("ERROR retrieving worlds: " + error));
};

export async function fetchElementTypes(dispatchFn, worldId) {
    fetch(`http://localhost:8080/retrieveElementTypes?worldId=${worldId}`)
    .then(response => response.json())
    .then(data => {
        // console.log("Element Types:");
        // console.log(data);
        dispatchFn({type: "CHANGE_TAB", payload: {name: "elements", entries: data}});
    })
    .catch(error => console.log("ERROR fetching element types: " + error));
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
