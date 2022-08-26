import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DropDown from "../../globalComponent/dropDownComponent/dropDownComponent";
import ServiceAccount from "../../service/serviceAccount";
import "./mainMenu.scss";

const MainMenu = () => {
  let service = new ServiceAccount();
  const params = useParams();
  const navigate = useNavigate();

  const [account, setAccount] = useState("");
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    service.getById(params.id).then((data) => setAccount(data));
    setTopics(account.topicsId);
    console.log(account);
    // setTopics(account.topics);
    // console.log(topics);
  }, [params.id]);

  const handleChange = (event) => {
    setAccount(event.target.value);
  };

  const goToQuestions = () => {
    navigate("/Question");
  };

  const goToTests = () => {
    navigate("/Tests");
  };
  // const goToReports = () => {
  //   navigate("/" + params.id);
  // };
  return (
    <div className="container">
      <h1>Main Menu</h1>
      {/* <label>
        Choose a topic
        <select value={topics}>
          {account &&
            account.topicsId.map((topic) => (
              <option value={topic}>{topic}</option>
            ))}
        </select>
      </label> */}
      {/* <DropDown
        text={"choose a field of study: "}
        onChange={handleChange}
        option={account && account.topicsId}
        // value={account.topicsId[0]}
      /> */}
      <div className="links">
        {account && account.topicsId}-{params.id}
        <a onClick={goToQuestions}>Manage Question</a>
        <a onClick={goToTests}>Manage Tests</a>
        <a>Reports</a>
      </div>

      {/* <Butoon onClick={goToQuestion}>Manage Question</Butoon>
      <Butoon onClick={goToTest}>Manage Tests</Butoon>
      <Butoon onClick={goToReports}>Reports</Butoon> */}
    </div>
  );
};
export default MainMenu;
