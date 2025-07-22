import React, { useState } from 'react';
import { Editor, EditorState } from 'draft-js';
import Toolbar from './Toolbar';
import 'draft-js/dist/Draft.css';

const styleMap = {
  '12px': {
    fontSize: '12px',
  },
  '16px': {
    fontSize: '16px',
  },
  '20px': {
    fontSize: '20px',
  },
  '24px': {
    fontSize: '24px',
  },
  'Arial': {
    fontFamily: 'Arial',
  },
  'Georgia': {
    fontFamily: 'Georgia',
  },
  'Times New Roman': {
    fontFamily: 'Times New Roman',
  },
  'Verdana': {
    fontFamily: 'Verdana',
  },
  'ALIGN_LEFT': {
    textAlign: 'left',
  },
  'ALIGN_CENTER': {
    textAlign: 'center',
  },
  'ALIGN_RIGHT': {
    textAlign: 'right',
  },
  'CODE': {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

const RichTextEditor = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const blockStyleFn = (contentBlock) => {
    const type = contentBlock.getType();
    if (type === 'atomic') {
      return 'atomic-block';
    }

    const data = contentBlock.getData();
    const textAlign = data.get('textAlign');
    if (textAlign) {
      return `align-${textAlign}`;
    }

    return '';
  };

  return (
    <div className="rich-text-editor">
      <Toolbar editorState={editorState} setEditorState={setEditorState} />
      <Editor
        customStyleMap={styleMap}
        editorState={editorState}
        onChange={setEditorState}
        blockStyleFn={blockStyleFn}
      />
    </div>
  );
};

export default RichTextEditor;
