import { useCallback, useEffect, useState } from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.bubble.css';
import toolBarOptions from "./toolBarOptions";

const Notepad = (props:any) => {

    // For editor placeholder    
    const namesArr = ['masterpiece', 'story', 'art', 'book', 'song', 'adventure', 'plan', 'day'];

    const {noteID, content, updateList} = props;
    const [value, setValue] = useState(content);
    // const [noteName, setNoteName] = useState(namesArr[Math.floor(Math.random()*namesArr.length)]);

    useEffect(() => {
        setValue(content);        
    }, [noteID]);

    const updatePlaceHolder = (quill:any) =>{        
        const prevName = quill.root.dataset.placeholderName || 'masterpiece';
        const newNameArr = namesArr.filter((name:any)=> name !== prevName );
        const newName = newNameArr[Math.floor(Math.random()*newNameArr.length)]; 
        quill.root.dataset.placeholderName = newName;
        quill.root.dataset.placeholder=`your ${newName} ...`;
    }

    const onChange = (newContent: any, delta: any, source: any, editor: any) => {
        setValue(newContent);
        if(editor.getLength() > 1){
            const header = editor.getContents().ops[0];
            let str = header.insert;
            str = str.replace(/\s/g, '');
            const title = str.length ? header.insert : "Untitled";

            const data = {
                title : title,
                content : newContent,
                id : noteID,
                number: 1
            }
            updateList(data);
        }else{
            updateList(null);
        }
    };

    const quill = useCallback((quill:any) => {
        if(quill){
            quill = quill.getEditor();
            quill.focus();
            quill.formatLine(0, 0, 'header', 1);
            
            quill.on('editor-change', function() {
                quill.formatLine(0, 0, 'header', 1);
                if(quill.getLength() === 1) quill.root.classList.add("ql-blank");                
            });                                  

            setInterval(()=>updatePlaceHolder(quill), 1000);
        }
    }, []);

    return (
        <ReactQuill
            ref={quill}
            theme="bubble"
            value={value}
            placeholder={`your masterpiece ...`}
            onChange={onChange}
            modules={{ toolbar: toolBarOptions }}
        />
    );
}

export default Notepad;