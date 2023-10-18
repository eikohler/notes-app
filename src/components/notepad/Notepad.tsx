import React, { useState } from 'react';
import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.bubble.css';
import toolBarOptions from "./toolBarOptions";

const BubbleTheme = Quill.import("themes/bubble");    
class ExtendBubbleTheme extends BubbleTheme {
    constructor(quill:any, options:any) {
        super(quill, options);        

        quill.once("selection-change", () => {                        
            quill.formatLine(0, 0, 'header', 1);
        });
    }
}

Quill.register("themes/bubble", ExtendBubbleTheme);

const Notepad = () => {
    return (
        <ReactQuill             
            theme="bubble"             
            modules={{ toolbar: toolBarOptions }}
        />
    );
}

export default Notepad