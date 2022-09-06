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
import ReportByTest from "./component/reports/reportByTest/reportByTest";

import "./App.scss";
import ShowReportByTest from "./component/reports/showReporsByTest/showReportByTest";
function App() {
  return (
    <header>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/chooseAccount/:id" element={<ChooseAccount />}></Route>
        <Route path="/mainMenu/:admin/:id" element={<MainMenu />}></Route>
        <Route
          path="/reportsByTest/:admin/:account"
          element={<ReportByTest />}
        ></Route>
        <Route
          path="/showReportsByTest/:admin/:account/:id"
          element={<ShowReportByTest />}
        ></Route>
        <Route
          path="/createTest/:admin/:account/:id"
          element={<CreateTest />}
        ></Route>
        <Route
          path="/Questions/:admin/:account/:id"
          element={<ManageQuestion />}
        ></Route>
        <Route
          path="/Tests/:admin/:account/:id"
          element={<ManageTest />}
        ></Route>
        <Route
          path="/showTest/:admin/:account/:topic/:id"
          element={<ShowTest />}
        ></Route>
        <Route
          path="/editTest/:admin/:account/:topic/:id"
          element={<EditTest />}
        ></Route>
        <Route
          path="/startTest/:admin/:account/:topic/:id"
          element={<StartTest />}
        ></Route>
        <Route
          path="/submit/:admin/:account/:topic/:id/:grade"
          element={<Submit />}
        ></Route>
        <Route
          path="/test/:admin/:account/:topic/:id"
          element={<Test />}
        ></Route>
        <Route
          path="/showQuestion/:admin/:account/:topic/:id"
          element={<ShowQuestion />}
        ></Route>
        <Route
          path="/createQuestion/:admin/:account/:id"
          element={<CreateQuestion />}
        ></Route>
        <Route
          path="/editQuestion/:admin/:account/:topic/:id"
          element={<EditQuestion />}
        ></Route>
      </Routes>
    </header>
  );
}

export default App;
