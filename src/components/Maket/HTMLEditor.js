import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './Editor.css'

const HTMLEditor = (props) => 

<Editor editorClassName="editor" 
editorState={props.editorState} 
onEditorStateChange={props.setEditorState}
/>
export default HTMLEditor;


