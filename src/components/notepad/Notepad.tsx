import React, { useState } from 'react';
import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.bubble.css';
import toolBarOptions from "./toolBarOptions";

const BubbleTheme = Quill.import("themes/bubble");    
class ExtendBubbleTheme extends BubbleTheme {
    constructor(quill:any, options:any) {
        super(quill, options);
        let quillStart = true;

        quill.on("selection-change", (range:any) => {            
            if (range) {
                // console.log(quill.getBounds(range));
                // console.log(quill.theme.tooltip.position(quill.getBounds(range)));
                quill.theme.tooltip.show();
                quill.theme.tooltip.position(quill.getBounds(range));
            }
            if(quillStart){
                quillStart = false;
                quill.formatLine(0, 0, 'header', 1);
            }
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