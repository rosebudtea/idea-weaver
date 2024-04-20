import React, { forwardRef, useContext, useRef, useState } from 'react';
import { PanelsContentContext } from './panels-content-context.jsx';
import Dropdown from './Dropdown.jsx';

import './content.css';
import DeleteButton from '../../DeleteButton.jsx';

const ContentTitle = forwardRef(function ContentTitleBatch({rowNum, panelNum, contentTitle, contentNum, menuItems, editing, saveContent}, ref) {
    const {removeContentFromPanel} = useContext(PanelsContentContext);

    return (
        <div id="content-title">
            {(editing !== "all" && editing !== "title") && contentTitle && <p>{contentTitle} {contentNum}</p>}
            {(editing === "all" || editing === "title") && <input ref={ref} defaultValue={contentTitle} type="text" />}
            {!editing && <Dropdown
                buttonText={"E"}
                menuItems={menuItems}
            />}
            {editing && <button id="content-save-button" onClick={saveContent} >S</button>}
            <DeleteButton onConfirm={() => removeContentFromPanel(rowNum, panelNum, contentNum)} />
        </div>);
});

function TextContent({rowNum, panelNum, content}) {
    const {updateContentInPanel} = useContext(PanelsContentContext);
    const [editing, setEditing] = useState("");
    const titleInput = useRef();
    const textInput = useRef();
    const descripInput = useRef();
    // content.contentActual = {text: "insert text here", descrip: ""};

    function handleEditing(edit) {
        setEditing(edit);
    }

    function saveContent() {
        handleEditing("");
        const actual = {
            text: textInput.current ? textInput.current.value : content.contentActual.text,
            descrip: descripInput.current ? descripInput.current.value : content.contentActual.descrip,
        }
        const newContext = {
            contentNum: content.contentNum,
            title: titleInput.current ? titleInput.current.value : content.contentTitle,
            actual: actual,
        }
        updateContentInPanel(rowNum, panelNum, newContext);
    }

    return (<div id="text-content">
        <ContentTitle
            contentTitle={content.contentTitle}
            menuItems={[
                <button onClick={() => handleEditing("all")}>All</button>,
                <button onClick={() => handleEditing("title")}>Title</button>,
                <button onClick={() => handleEditing("text")}>Text</button>,
                <button onClick={() => handleEditing("descrip")}>Description</button>,
            ]}
            editing={editing}
            rowNum={rowNum}
            panelNum={panelNum}
            contentNum={content.contentNum}
            saveContent={saveContent}
            ref={titleInput}
        />
        {(editing !== "all" && editing !== "text") && content.contentActual.text && <p>{content.contentActual.text}</p>}
        {(editing === "all" || editing === "text") && <input ref={textInput} defaultValue={content.contentActual.text} type="text" />}
        {(editing !== "all" && editing !== "descrip") && content.contentActual.descrip && <p>{content.contentActual.descrip}</p>}
        {(editing === "all" || editing === "descrip") && <input ref={descripInput} defaultValue={content.contentActual.descrip} type="text" />}
    </div>)
}

function NumberContent({rowNum, panelNum, content}) {
    const {updateContentInPanel} = useContext(PanelsContentContext);
    const [editing, setEditing] = useState("");
    const titleInput = useRef();
    const numInput = useRef();
    const descripInput = useRef();
    // content.contentActual = {num: 0, descrip: ""};

    function handleEditing(edit) {
        setEditing(edit);
    }

    function saveContent() {
        handleEditing("");
        const actual = {
            num: numInput.current ? numInput.current.value : content.contentActual.num,
            descrip: descripInput.current ? descripInput.current.value : content.contentActual.descrip,
        }
        const newContext = {
            contentNum: content.contentNum,
            title: titleInput.current ? titleInput.current.value : content.contentTitle,
            actual: actual,
        }
        updateContentInPanel(rowNum, panelNum, newContext);
    }

    return (<div id="number-content">
        <ContentTitle
            contentTitle={content.contentTitle}
            menuItems={[
                <button onClick={() => handleEditing("all")}>All</button>,
                <button onClick={() => handleEditing("title")}>Title</button>,
                <button onClick={() => handleEditing("num")}>Number</button>,
                <button onClick={() => handleEditing("descrip")}>Description</button>,
            ]}
            editing={editing}
            rowNum={rowNum}
            panelNum={panelNum}
            contentNum={content.contentNum}
            saveContent={saveContent}
            ref={titleInput}
        />
        {(editing !== "all" && editing !== "num") && content.contentActual.num && <p>{content.contentActual.num}</p>}
        {(editing === "all" || editing === "num") && <input ref={numInput} defaultValue={content.contentActual.num} type="number" />}
        {(editing !== "all" && editing !== "descrip") && content.contentActual.descrip && <p>{content.contentActual.descrip}</p>}
        {(editing === "all" || editing === "descrip") && <input ref={descripInput} defaultValue={content.contentActual.descrip} type="text" />}
    </div>)
}

function SliderContent({rowNum, panelNum, content}) {
    const {updateContentInPanel} = useContext(PanelsContentContext);
    const [editing, setEditing] = useState("");
    const titleInput = useRef();
    const slideInput = useRef();
    const leftInput = useRef();
    const rightInput = useRef();
    const descripInput = useRef();
    // content.contentActual = {value: 0, right: "", left: "", descrip: ""};

    function handleEditing(edit) {
        setEditing(edit);
    }

    function saveContent() {
        handleEditing("");
        const actual = {
            value: slideInput.current ? slideInput.current.value : content.contentActual.value,
            right: leftInput.current ? leftInput.current.value : content.contentActual.right,
            left: rightInput.current ? rightInput.current.value : content.contentActual.left,
            descrip: descripInput.current ? descripInput.current.value : content.contentActual.descrip,
        }
        const newContext = {
            contentNum: content.contentNum,
            title: titleInput.current ? titleInput.current.value : content.contentTitle,
            actual: actual,
        }
        updateContentInPanel(rowNum, panelNum, newContext);
    }

    return (<div id="slider-content">
        <ContentTitle
            contentTitle={content.contentTitle}
            menuItems={[
                <button onClick={() => handleEditing("all")}>All</button>,
                <button onClick={() => handleEditing("title")}>Title</button>,
                <button onClick={() => handleEditing("left")}>Left</button>,
                <button onClick={() => handleEditing("right")}>Right</button>,
                <button onClick={() => handleEditing("slide")}>Slide</button>,
                <button onClick={() => handleEditing("descrip")}>Description</button>,
            ]}
            editing={editing}
            rowNum={rowNum}
            panelNum={panelNum}
            contentNum={content.contentNum}
            saveContent={saveContent}
            ref={titleInput}
        />
        <div id="content-slider">
            {(editing !== "all" && editing !== "left") && content.contentActual.left && <p>{content.contentActual.left}</p>}
            {(editing === "all" || editing === "left") && <input ref={leftInput} defaultValue={content.contentActual.left} type="text" />}
            {(editing !== "all" && editing !== "slide") && content.contentActual.value && <input type="range" min="1" max="100" value={content.contentActual.value} class="slider" id="myRange" />}
            {(editing === "all" || editing === "slide") && <input ref={slideInput} type="range" min="1" max="100" defaultValue={content.contentActual.value} class="slider" id="myRange" />}
            
            {(editing !== "all" && editing !== "right") && content.contentActual.right && <p>{content.contentActual.right}</p>}
            {(editing === "all" || editing === "right") && <input ref={rightInput} defaultValue={content.contentActual.right} type="text" />}
        </div>
        {(editing !== "all" && editing !== "descrip") && content.contentActual.descrip && <p>{content.contentActual.descrip}</p>}
        {(editing === "all" || editing === "descrip") && <input ref={descripInput} defaultValue={content.contentActual.descrip} type="text" />}
    </div>)
}

function ImageContent({rowNum, panelNum, content}) {
    const {updateContentInPanel} = useContext(PanelsContentContext);
    const [editing, setEditing] = useState("");
    const titleInput = useRef();
    const imageInput = useRef();
    const descripInput = useRef();
    // content.contentActual = {image: "image", descrip: ""};

    function handleEditing(edit) {
        setEditing(edit);
    }

    function saveContent() {
        handleEditing("");
        const actual = {
            image: imageInput.current ? imageInput.current.value : content.contentActual.image,
            descrip: descripInput.current ? descripInput.current.value : content.contentActual.descrip,
        }
        const newContext = {
            contentNum: content.contentNum,
            title: titleInput.current ? titleInput.current.value : content.contentTitle,
            actual: actual,
        }
        updateContentInPanel(rowNum, panelNum, newContext);
    }

    return (<div id="image-content">
        <ContentTitle
            contentTitle={content.contentTitle}
            menuItems={[
                <button onClick={() => handleEditing("all")}>All</button>,
                <button onClick={() => handleEditing("title")}>Title</button>,
                <button onClick={() => handleEditing("image")}>Image</button>,
                <button onClick={() => handleEditing("descrip")}>Description</button>,
            ]}
            editing={editing}
            rowNum={rowNum}
            panelNum={panelNum}
            contentNum={content.contentNum}
            saveContent={saveContent}
            ref={titleInput}
        />
        {(editing !== "all" && editing !== "image") && content.contentActual.image && <p>{content.contentActual.image}</p>}
        {(editing === "all" || editing === "image") && <input ref={imageInput} defaultValue={content.contentActual.image} type="text" />}
        {(editing !== "all" && editing !== "descrip") && content.contentActual.descrip && <p>{content.contentActual.descrip}</p>}
        {(editing === "all" || editing === "descrip") && <input ref={descripInput} defaultValue={content.contentActual.descrip} type="text" />}
    </div>)
}

export default function Content({rowNum, panelNum, content}) {
    function getContent(contentType) {
        switch(contentType) {
            case "image":
                return (<ImageContent rowNum={rowNum} panelNum={panelNum} content={content} />);
            case "slider":
                return (<SliderContent rowNum={rowNum} panelNum={panelNum} content={content} />);
            case "number":
                return (<NumberContent rowNum={rowNum} panelNum={panelNum} content={content} />);
            case "text":
            default:
                return (<TextContent rowNum={rowNum} panelNum={panelNum} content={content} />);
        }
    }

    return (<>
        {getContent(content.contentType)}
    </>);
}
