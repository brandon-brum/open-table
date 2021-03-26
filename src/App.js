import Room from './components/Room/Room.js';
import Table from './components/Table/Table.js'

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Room>
        <Table/>
      </Room>
    </div>
  );
};

export default App;
