import { useState } from 'react';
import './App.css';
import GeographicalSelector from './GeographicalSelector';

function App() {
  const [name, setName] = useState(null);
  const [id, setID] = useState(null);
  const [type, setType] = useState(null);

  const onChoice = (id, name, type) => {
    setName(name)
    setID(id)
    setType(type)
  }

  return (
    <div className="App">

      <GeographicalSelector onSelect={onChoice} />  
      <dl>
        <dt>Name</dt>
        <dd>{name || '-'}</dd>
        <dt>ID</dt>
        <dd>{id || '-'}</dd>
        <dt>Type</dt>
        <dd>{type || '-'}</dd>
      </dl>
    </div>
  );
}

export default App;
