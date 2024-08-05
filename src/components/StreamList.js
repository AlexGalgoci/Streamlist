// src/components/StreamList.js
import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const StreamList = () => {
  const [input, setInput] = useState('');
  const [type, setType] = useState('Movie');
  const [list, setList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [editingType, setEditingType] = useState('Movie');

  const handleAdd = () => {
    if (input) {
      setList([...list, { text: input, type }]);
      setInput('');
      setType('Movie');
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingText(list[index].text);
    setEditingType(list[index].type);
  };

  const handleSave = (index) => {
    const updatedList = [...list];
    updatedList[index] = { text: editingText, type: editingType };
    setList(updatedList);
    setEditingIndex(null);
    setEditingText('');
    setEditingType('Movie');
  };

  const handleDelete = (index) => {
    setList(list.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>StreamList</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a movie or show"
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="Movie">Movie</option>
        <option value="Show">Show</option>
      </select>
      <button onClick={handleAdd}>Add</button>
      <ul>
        {list.map((item, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <select value={editingType} onChange={(e) => setEditingType(e.target.value)}>
                  <option value="Movie">Movie</option>
                  <option value="Show">Show</option>
                </select>
                <button onClick={() => handleSave(index)}>Save</button>
              </>
            ) : (
              <>
                {item.text} ({item.type})
                <button onClick={() => handleEdit(index)}><FaEdit /></button>
                <button onClick={() => handleDelete(index)}><FaTrash /></button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StreamList;
