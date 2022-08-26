import { Routes, Route } from "react-router-dom";
import ChooseAccount from "./component/chooseAccount/chooseAccount";
import MainMenu from "./component/mainMenu/mainMenu";
import ManageQuestion from "./component/manageQuestions/manageQuestion";
import ManageTest from "./component/manageTests/manageTest";
import "./App.css";

function App() {
  return (
    <header>
      <Routes>
        <Route path="/" element={<ChooseAccount />}></Route>
        <Route path="/:id" element={<MainMenu />}></Route>
        <Route path="/Question" element={<ManageQuestion />}></Route>
        {/* <Route path="/Tests" element={<ManageQuestion />}></Route> */}
      </Routes>
    </header>
  );
}

export default App;
