    // Panel Object
    // panels row list: [{panelRow1}, {panelRow2}]
    // panel row: {rowTitle: "row title", rowNum: num, panels: [{panel1}, {panel2}]}
    // panel: {panelTitle: "column title", panelNum: num, panelType: "panel type", panelContent: [{content1}, {content2}]}
        // panelType:
        // image: 
            // image panel - images
        // info:
            // information panel - text, numbers, and sliders
    // content: {contentTitle: "content title", contentNum: num, contentType: "content type", contentActual: {actual}}
    // actual:
        // text: {text: "text", descrip: "description text"}
        // number: {num: num, descrip: "description text"}
        // slider: {value: value, right: "rightTitle", left: "leftTitle", descrip: "description text"}
        // image: {image: image, descrip: "description text"}


const panel1 = {panelTitle: "Test Panel", panelNum: 0, starred: false, panelType: "info", panelContent: []};
const panel2 = {panelTitle: "", panelNum: 1, panelType: "info", panelContent: []};
const panel3 = {panelTitle: "", panelNum: 2, panelType: "info", panelContent: []};

const panelRow1 = {
    rowTitle: "Test Row",
    rowNum: 0,
    panels: [panel1],
};
const panelRow2 = {
    rowTitle: "",
    rowNum: 1,
    panels: [panel1, panel2],
};
const panelRow3 = {
    rowTitle: "",
    rowNum: 2,
    panels: [panel1, panel2, panel3],
};

// export const PANELS = [panelRow1, panelRow2, panelRow3];
export const PANELS = [panelRow1];