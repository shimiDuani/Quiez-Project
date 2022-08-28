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

  const [isLoading, setIsLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [topic, setTopic] = useState(null);

  useEffect(() => {
    service.getById(params.id).then((data) => {
      setAccount(data);
      setTopic(data.topicsId[0]);
      setIsLoading(false);
    });
  }, [params.id]);

  if (isLoading) {
    return <h3>is Loading....</h3>;
  }

  const handleChange = (event) => {
    setTopic(event.target.value);
  };

  const goToQuestions = () => {
    navigate("/Question");
  };

  const goToTests = () => {
    navigate("/Tests");
  };

  return (
    <div className="container">
      <h1>Main Menu - {account.name}</h1>
      <label>
        Choose a topic
        <select onChange={handleChange} value={topic}>
          {account.topicsId.map((topic) => (
            <option value={topic}>{topic}</option>
          ))}
        </select>
      </label>
      <div className="links">
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
