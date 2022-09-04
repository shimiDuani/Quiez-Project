import { Routes, Route } from "react-router-dom";
import ChooseAccount from "./component/chooseAccount/chooseAccount";
import MainMenu from "./component/mainMenu/mainMenu";
import ManageQuestion from "./component/manageQuestions/manageQuestion";
import ShowQuestion from "./component/manageQuestions/showQuestion/showQuestion";
import CreateQuestion from "./component/manageQuestions/createQeustion/createQestion";
import EditQuestion from "./component/manageQuestions/editQuestion/editQuestion";
import ManageTest from "./component/manageTests/manageTest";
import ShowTest from "./component/manageTests/showTest/showTest";
import StartTest from "./component/manageTests/startTest/startTest";
import Test from "./component/manageTests/test/test";
import Submit from "./component/manageTests/submit/submit";
import CreateTest from "./component/manageTests/createTest/createTest";
import EditTest from "./component/manageTests/editTest/editTest";
import LoginPage from "./component/loginPage/loginPage";

import "./App.css";
function App() {
  return (
    <header>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/chooseAccount/:id" element={<ChooseAccount />}></Route>
        <Route path="/mainMenu/:id" element={<MainMenu />}></Route>
        <Route path="/createTest/:id" element={<CreateTest />}></Route>
        <Route path="/Questions/:id" element={<ManageQuestion />}></Route>
        <Route path="/Tests/:id" element={<ManageTest />}></Route>
        <Route path="/showTest/:id" element={<ShowTest />}></Route>
        <Route path="/editTest/:id" element={<EditTest />}></Route>
        <Route path="/startTest/:id" element={<StartTest />}></Route>
        <Route path="/submit/:id" element={<Submit />}></Route>
        <Route path="/test/:id" element={<Test />}></Route>
        <Route
          path="/showQuestion/:topic/:id"
          element={<ShowQuestion />}
        ></Route>
        <Route path="/createQuestion/:id" element={<CreateQuestion />}></Route>
        <Route
          path="/editQuestion/:topic/:id"
          element={<EditQuestion />}
        ></Route>
      </Routes>
    </header>
  );
}

export default App;
