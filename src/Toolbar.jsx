import React from 'react';
import { RichUtils, EditorState } from 'draft-js';

const Toolbar = ({ editorState, setEditorState }) => {
  const fontFamilies = ['Arial', 'Georgia', 'Times New Roman', 'Verdana'];
  const fontSizes = ['12px', '16px', '20px', '24px'];
  const blockTypes = [
    { label: 'Paragraph', style: 'unstyled' },
    { label: 'Header 1', style: 'header-one' },
    { label: 'Header 2', style: 'header-two' },
    { label: 'Header 3', style: 'header-three' },
  ];

  const applyStyle = (style) => {
    if (style.startsWith('ALIGN_')) {
      const textAlign = style.replace('ALIGN_', '').toLowerCase();
      const newContentState = editorState.getCurrentContent();
      const selection = editorState.getSelection();
      const block = newContentState.getBlockForKey(selection.getStartKey());
      const newBlock = block.set('data', block.getData().set('textAlign', textAlign));
      const newContentStateWithBlock = newContentState.merge({
        blockMap: newContentState.getBlockMap().set(selection.getStartKey(), newBlock),
      });
      const newEditorState = EditorState.push(
        editorState,
        newContentStateWithBlock,
        'change-block-data'
      );
      setEditorState(newEditorState);
    } else {
      setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    }
  };

  const applyBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const addLink = () => {
    const url = prompt('Enter a URL:');
    if (!url) {
      return;
    }
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    setEditorState(RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey));
  };

  return (
    <div className="toolbar">
      <select onChange={(e) => applyStyle(e.target.value)}>
        {fontFamilies.map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>
      <select onChange={(e) => applyStyle(e.target.value)}>
        {fontSizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      <select onChange={(e) => applyBlockType(e.target.value)}>
        {blockTypes.map((type) => (
          <option key={type.label} value={type.style}>
            {type.label}
          </option>
        ))}
      </select>
      <button onClick={() => applyStyle('ALIGN_LEFT')}>Left</button>
      <button onClick={() => applyStyle('ALIGN_CENTER')}>Center</button>
      <button onClick={() => applyStyle('ALIGN_RIGHT')}>Right</button>
      <button onClick={addLink}>Link</button>
      <button onClick={() => applyBlockType('code-block')}>Code Block</button>
      <button onClick={() => applyStyle('CODE')}>Code</button>
    </div>
  );
};

export default Toolbar;
