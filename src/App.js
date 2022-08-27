import { Routes, Route } from "react-router-dom";
import ChooseAccount from "./component/chooseAccount/chooseAccount";
import MainMenu from "./component/mainMenu/mainMenu";
import ManageQuestion from "./component/manageQuestions/manageQuestion";
import ShowQuestion from "./component/manageQuestions/showQuestion/showQuestion";
import CreateQuestion from "./component/manageQuestions/createQeustion/createQestion";
import EditQuestion from "./component/manageQuestions/createQeustion/createQestion";
import "./App.css";

function App() {
  return (
    <header>
      <Routes>
        <Route path="/" element={<ChooseAccount />}></Route>
        <Route path="/:id" element={<MainMenu />}></Route>
        <Route path="/Question" element={<ManageQuestion />}></Route>
        <Route path="/Question/:id" element={<ShowQuestion />}></Route>
        <Route path="/createQuestion" element={<CreateQuestion />}></Route>
        <Route path="/editQuestion/:id" element={<EditQuestion />}></Route>
      </Routes>
    </header>
  );
}

export default App;
