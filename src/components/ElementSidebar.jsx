import React, { useReducer, useRef } from 'react';
import { WorldContentContext } from './world-content-context.jsx';
import { CreationModal } from './CreationModal.jsx';
import { fetchAllElementEntries } from '../elementhttp.js';

function elementReducer(state, action) {
    if (action.type === "CHANGE_ELEMENT_CATEGORY") {
        return {
            ...state,
            elementCategory: action.payload,
        };
    } else if (action.type === "CHANGE_ELEMENT_ENTRIES") {
        // console.log("Change element entries");
        // console.log(action);
        return {
            ...state,
            elementEntries: action.payload,
        };
    }
    return state;
}

export default function ElementSidebar() {
    const {changeChosenEntry, currWorld, currTabEntries} = React.useContext(WorldContentContext);
    const [elementState, elementDispatch] = useReducer(elementReducer, {elementCategory: "", elementEntries: []});
    const elementDialog = useRef();
    const categoryDialog = useRef();

    function handleContentCreate() {
        elementDialog.current.open();
    }

    function handleCategoryCreate() {
        categoryDialog.current.open();
    }

    function handleGrabElementEntries(catName) {
        fetchAllElementEntries(elementDispatch, currWorld.id, catName);
    }

    function handleChooseCategory(catName) {
        elementDispatch({
            type: "CHANGE_ELEMENT_CATEGORY",
            payload: catName,
        });
        handleGrabElementEntries(catName);
    }

    function handleChooseEntry(index) {
        const chosenEntry = elementState.elementEntries[index];
        changeChosenEntry(chosenEntry);
    }

    return (
        <>
            {/* <CreationModal createFn={createContent} category={elementState.elementCategory} ref={elementDialog}/> */}
            {/* <CreationModal createFn={createCategory} category={"elements"} ref={categoryDialog}/> */}
            <div id="content-side">
                {!elementState.elementCategory && <>
                    <div id="side-head">
                        <input type="text" />
                        {/* <button onClick={handleCategoryCreate}>C</button> */}
                    </div>
                    <div id="content-buttons">
                        {currTabEntries.length > 0 && currTabEntries.map((category) => {
                            return <button key={category} onClick={() => {handleChooseCategory(category)}}>{category}</button>
                        })}
                    </div>
                </>}
                {elementState.elementCategory && <>
                    <p>{elementState.elementCategory}</p>
                    <div id="side-head">
                        <button onClick={() => {handleChooseCategory("")}}>{"<"}</button>
                        <input type="text" /> 
                        {/* <button onClick={handleContentCreate}>C</button> */}
                    </div>
                    <div id="content-buttons">
                        {elementState.elementEntries.length > 0 && elementState.elementEntries.map((data, index) => {
                            return <button key={data.id} onClick={() => handleChooseEntry(index)}>{data.name}</button>;
                        })}
                    </div>
                </>}
            </div>
        </>
    );
} 
