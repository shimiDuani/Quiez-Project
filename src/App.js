import { Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import ChooseAccount from "./component/chooseAccount/chooseAccount";
import MainMenu from "./component/mainMenu/mainMenu";
import ManageQuestion from "./component/manageQuestions/manageQuestion";

function App() {
  return (
    <header>
      <Routes>
        <Route path="/" element={<ChooseAccount />}></Route>
        <Route path="/:id" element={<MainMenu />}></Route>
        <Route path="/Question" element={<ManageQuestion />}></Route>
      </Routes>
    </header>
  );
}

export default App;
