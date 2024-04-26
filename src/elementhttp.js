export async function fetchElementEntry(dispatchFn, elementId) {
    fetch(`http://localhost:8080/retrieve?category=${category}&contentId=${contentId}&worldName=${worldName}`)
    .then(response => response.json())
    .then(data => {
        // console.log("Specific Element Entry:");
        // console.log(data);
        dispatchFn({
            type: "CHANGE_CHOSEN_ENTRY",
            payload: data,
        });
    })
    .catch(error => console.log("ERROR fetching content: " + error));
};

export async function fetchAllElementEntries(dispatchFn, worldId, elementType) {
    // console.log("Fetch all element entries from " + worldId + " " + elementType);
    fetch(`http://localhost:8080/retrieveElementEntries?worldId=${worldId}&elementType=${elementType}`)
    .then(response => response.json())
    .then(data => {
        // console.log("All Element Entries:");
        // console.log(data);
        dispatchFn({type: "CHANGE_ELEMENT_ENTRIES", payload: data});
    })
    .catch(error => console.log("ERROR fetching all content: " + error));
};

export async function fetchAllPanelRows(dispatchFn, elementId) {
    // console.log("Fetch all panel rows from " + elementId);
    fetch(`http://localhost:8080/retrieveAllPanelRows?elementId=${elementId}`)
    .then(response => response.json())
    .then(data => {
        // console.log("Get All Panel Rows:");
        // console.log(data);
        dispatchFn({type: "SET_PANEL_ROWS", payload: data});
    })
    .catch(error => console.log("ERROR fetching all content: " + error));
};

export async function fetchAllPanels(dispatchFn, rowId) {
    // console.log("Fetch all panels from " + rowId);
    fetch(`http://localhost:8080/retrieveAllPanels?rowId=${rowId}`)
    .then(response => response.json())
    .then(data => {
        // console.log("Get All Panels:");
        // console.log(data);
        dispatchFn({type: "SET_PANELS", payload: data});
    })
    .catch(error => console.log("ERROR fetching all content: " + error));
};

export async function createPanelRow(dispatchFn, rowName, rowNum, elementId) {
    console.log(rowName + " " + rowNum + " " + elementId);
    fetch(`http://localhost:8080/createPanelRow?rowName=${rowName}&rowNum=${rowNum}&elementId=${elementId}`, {method: 'post'})
    .then(response => response.json())
    .then(data => {
        console.log("New Panel Row:");
        console.log(data);
        dispatchFn({type: "ADD_PANEL_ROW", payload: data});
    })
    .catch(error => console.log("ERROR creating content: " + error));
};

export async function createPanel(dispatchFn, panelName, panelNum, panelType, rowId, starred) {
    fetch(`http://localhost:8080/createPanel?panelName=${panelName}&panelNum=${panelNum}&panelType=${panelType}&rowId=${rowId}&starred=${starred}`, {method: 'post'})
    .then(response => response.json())
    .then(data => {
        console.log("New Panel Row:");
        console.log(data);
        dispatchFn({type: "ADD_PANEL", payload: data});
    })
    .catch(error => console.log("ERROR creating content: " + error));
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
