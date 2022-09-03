import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DropDown from "../../globalComponent/dropDownComponent/dropDownComponent";
import ServiceAccount from "../../service/serviceAccount";
import ServiceTopic from "../../service/serviceTopic";
import "./mainMenu.scss";

const MainMenu = () => {
  let serviceAccount = new ServiceAccount();
  let serviceTopic = new ServiceTopic();
  const params = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [topic, setTopic] = useState(null);
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    serviceAccount.getById(params.id).then((data) => {
      setAccount(data);
      console.log("account", account);
    });
    serviceTopic.get().then((data) => {
      console.log("data", data);
      setTopics(data);
      setIsLoading(false);
    });
  }, [params.id]);

  if (isLoading) {
    return <h3>is Loading....</h3>;
  }
  const handleChange = (event) => {
    debugger;
    setTopic(event.target.value);
  };

  const goToQuestions = () => {
    if (topic === null) {
      setTopic(
        topics.filter((topic) => account.topicsId.includes(topic.id))[0]
      );
    }
    navigate("/Questions");
  };

  const goToTests = () => {
    if (topic === null) {
      setTopic(
        topics.filter((topic) => account.topicsId.includes(topic.id))[0]
      );
    }
    navigate("/Tests/" + topic.id);
  };
  return (
    <div className="container">
      <h1>Main Menu - {account.name}</h1>
      <label>
        Choose a topic
        <select onChange={(e) => handleChange(e)} value={topic ? "" : topic}>
          {topics
            .filter((topic) => account.topicsId.includes(topic.id))
            .map((topic, index) => (
              <option key={index} value={topic.id}>
                {topic.name}
              </option>
            ))}
        </select>
      </label>
      <div className="links">
        <a onClick={() => goToQuestions()}>Manage Question</a>
        <a onClick={() => goToTests()}>Manage Tests</a>
        <a>Reports</a>
      </div>

      {/* <Butoon onClick={goToQuestion}>Manage Question</Butoon>
      <Butoon onClick={goToTest}>Manage Tests</Butoon>
      <Butoon onClick={goToReports}>Reports</Butoon> */}
    </div>
  );
};
export default MainMenu;
