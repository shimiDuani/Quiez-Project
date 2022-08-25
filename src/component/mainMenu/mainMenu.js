import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DropDown from "../../globalComponent/dropDownComponent/dropDownComponent";
import ServiceAccount from "../../service/serviceAccount";
import "./mainMenu.scss";

const MainMenu = () => {
  const params = useParams();
  let service = new ServiceAccount();
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [account, setAccount] = useState([]);

  useEffect(() => {
    service.getById(params.id).then((data) => setAccount(data));
    setTopics(account.topics);
    console.log(topics);
  }, [params.id]);

  const handleChange = (event) => {
    setTopics(event.target.value);
  };
  const goToQuestion = () => {
    navigate("/Question");
  };
  // const goToTest = () => {
  //   navigate("/" + params.id);
  // };
  // const goToReports = () => {
  //   navigate("/" + params.id);
  // };
  return (
    <div className="container">
      <h1>Main Menu</h1>
      {/* <DropDown
        text={"choose a field of study: "}
        onChange={handleChange}
        option={topics}
        value={topics[0]}
      /> */}
      <div className="links">
        <a onClick={goToQuestion}>Manage Question</a>
        <a>Manage Tests</a>
        <a>Reports</a>
      </div>

      {/* <Butoon onClick={goToQuestion}>Manage Question</Butoon>
      <Butoon onClick={goToTest}>Manage Tests</Butoon>
      <Butoon onClick={goToReports}>Reports</Butoon> */}
    </div>
  );
};
export default MainMenu;
