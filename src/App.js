import { Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import ChooseAccount from "./component/chooseAccount/chooseAccount";
import MainMenu from "./component/mainMenu/mainMenu";

function App() {
  return (
    <header>
      <Routes>
        <Route path="/" element={<ChooseAccount />}></Route>
        <Route path="/:id" element={<MainMenu />}></Route>
      </Routes>
      {/* <div className="App">
        <ChooseAccount />
      </div> */}
    </header>
  );
}

export default App;
