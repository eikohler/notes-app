import React, { useState } from 'react';
import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.bubble.css';
import toolBarOptions from "./toolBarOptions";

const BubbleTheme = Quill.import("themes/bubble");

class ExtendBubbleTheme extends BubbleTheme {
    constructor(quill:any, options:any) {
        super(quill, options);

        quill.on("selection-change", (range:any) => {            
            if (range) {
                console.log(quill.getBounds(range));
                quill.theme.tooltip.show();
                quill.theme.tooltip.position(quill.getBounds(range));
            }
        });
    }
}

Quill.register("themes/bubble", ExtendBubbleTheme);

const Notepad = () => {
    return (
        <ReactQuill 
            theme="bubble"             
            placeholder="Title"
            modules={{ toolbar: toolBarOptions }}
        />
    );
}

export default Notepad