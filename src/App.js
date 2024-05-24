import { useState } from 'react';
import './App.css';

function App() {
  const [value, setValue] = useState('');
  const [notes, setNotes] = useState([]);
  const [edit, setEdit] = useState([]);

  const removeElement = (ele) => {
    const updatedNotes = notes.filter(note => note !== ele);
    setNotes(updatedNotes);
    setEdit(edit.filter((_, index) => index !== notes.indexOf(ele)));
  }

  const editElement = (ind) => {
    const updatedEdit = [...edit];
    updatedEdit[ind] = true;
    setEdit(updatedEdit);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setNotes([...notes, value]);
    setValue('');
  }

  const handleEditSubmit = (e, ind) => {
    e.preventDefault();
    const updatedNotes = [...notes];
    updatedNotes[ind] = value;
    setNotes(updatedNotes);
    setEdit(edit.map((item, index) => index === ind ? false : item));
    setValue('');
  }

  return (
    <>
      <div className='App'>
        <h1>To-Do App</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Enter your note...'
              className='notes'
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button type='submit'>Add here</button>
          </form>
        </div>
        <div>
          {notes.map((ele, ind) => (
            <div key={ind} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {edit[ind] !== true ? (
                <>
                  <h5>{ele}</h5>
                  <button
                    style={{
                      marginLeft: '1rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    onClick={() => removeElement(ele)}
                  >
                    X
                  </button>
                  <button
                    onClick={() => editElement(ind)}
                  >
                    Edit
                  </button>
                </>
              ) : (
                <form onSubmit={(e) => handleEditSubmit(e, ind)}>
                  <input
                    type='text'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                  <button type='submit'>Save</button>
                </form>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
