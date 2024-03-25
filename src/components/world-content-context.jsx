import React from "react";
import { createCategory, createWorld, fetchAllContent, fetchCategories, createContent } from "../http.js";

export const WorldContentContext = React.createContext({
    worldName: "",
    mainCategory: "",
    mainCategoryContent: [],
    mainContent: {},
    createWorld: () => {},
    createCategory: () => {},
    createContent: () => {},
    changeWorldName: () => {},
    changeCategory: () => {},
    changeMainContent: () => {},
});

function contentReducer(state, action) {
    if (action.type === "CHANGE_WORLD") {
        console.log("Change World: " + action.payload);
        return {
            ...state,
            worldName: action.payload,
        };
    } else if (action.type === "CHANGE_CATEGORY") {
        console.log("Change Category: " + action.payload);
        return {
            ...state,
            mainCategory: action.payload.name,
            mainCategoryContent: action.payload.content,
        };
    } else if (action.type === "CHANGE_CATEGORY_CONTENT") {
        console.log("Change Category Content: " + action.payload);
        return {
            ...state,
            mainCategoryContent: action.payload,
        };
    } else if (action.type === "CHANGE_MAIN_CONTENT") {
        console.log("Change Main Content: " + action.payload);
        const content = {category: state.mainCategory, id: action.payload};
        console.log(content);
        return {
            ...state,
            mainContent: content,
        };
    }
    return state;
}

export default function WorldContentContextProvider({children}) {
    const [contentState, contentDispatch] = React.useReducer(contentReducer, {worldName: "", mainCategory: "", mainCategoryContent: [], mainContent: {}});

    function createNewWorld(worldName) {
        createWorld(handleWorldChange, worldName);
    }

    function createNewCategory(categoryName) {
        console.log("Create Category");
        createCategory(categoryName, contentState.worldName);
        fetchCategories(contentDispatch, contentState.worldName);
    }

    function createNewContent(name, category) {
        console.log("Create Content");
        createContent(category, name, contentState.worldName);
    }

    function handleWorldChange(worldName) {
        contentDispatch({
            type: "CHANGE_WORLD",
            payload: worldName,
        });
    }

    function handleCategoryChange(category) {
        // console.log("Handle Category Change: " + category);
        if (category === contentState.mainCategory) {
            contentDispatch({
                type: "CHANGE_CATEGORY",
                payload: {
                    name: "",
                    content: [],
                },
            });
        } else {
            if (category === "elements") {
                fetchCategories(contentDispatch, contentState.worldName);
            } else {
                fetchAllContent(contentDispatch, "CHANGE_CATEGORY", category, contentState.worldName);
            }
        }
    }

    function handleMainContentChange(id) {
        contentDispatch({
            type: "CHANGE_MAIN_CONTENT",
            payload: id,
        });
    }

    const ctxValue = {
        worldName: contentState.worldName,
        mainCategory: contentState.mainCategory,
        mainCategoryContent: contentState.mainCategoryContent,
        mainContent: contentState.mainContent,
        createWorld: createNewWorld,
        createCategory: createNewCategory,
        createContent: createNewContent,
        changeWorldName: handleWorldChange,
        changeCategory: handleCategoryChange,
        changeMainContent: handleMainContentChange,
    };

    return <WorldContentContext.Provider value={ctxValue}>{children}</WorldContentContext.Provider>
}
