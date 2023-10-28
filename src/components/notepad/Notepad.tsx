import { useCallback, useEffect, useState } from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.bubble.css';
import toolBarOptions from "./toolBarOptions";

const Notepad = (props:any) => {

    // For editor placeholder    
    const phArr = [
        'masterpiece', 
        'story', 
        'art', 
        'song', 
        'adventure', 
        'plan'
    ];
    
    const {noteID, content, updateList} = props;
    const [value, setValue] = useState(content);
    const [phActive, setphActive] = useState(true);

    useEffect(() => {
        setValue(content);        
    }, [noteID]);

    
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
                // if(quill.getLength() === 1) quill.root.classList.add("ql-blank");                            
                setphActive(quill.getLength() === 1);
            });             
            
            // quill.once('editor-change', function() {                
            //     setInterval(()=>{
            //         const prevIndex = parseInt(quill.root.dataset.prevIndex) || 0,
            //         newIndex = (prevIndex + 1) < namesArr.length ? prevIndex + 1 : 0;
            //         quill.root.dataset.prevIndex = newIndex;
            //         quill.root.dataset.placeholder=`Your ${namesArr[newIndex]} ...`;
            //     }, 3000);
            // });               
        }
    }, []);

    return (
        <>
            <div className={`placeHolderAnim ${phActive && 'active'}`}>
                <h1>Your {phArr.map((name)=>{return(
                    <span key={name}>{name}</span>
                )})} ...</h1>
            </div>
            <ReactQuill
                ref={quill}
                theme="bubble"
                value={value}
                // placeholder={`Your ${namesArr[0]} ...`}
                onChange={onChange}
                modules={{ toolbar: toolBarOptions }}
            />
        </>
    );
}

export default Notepad;