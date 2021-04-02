import Room from "./components/Room/Room.js";
import Table from "./components/Table/Table.js"

import "./App.css";

import Token from "./components/Object/Token/Token.js";

function App() {
  return (
    <div className="App">
      <Room>
        <Table>
          <Token/>
        </Table>
      </Room>
    </div>
  );
};

export default App;
