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
  const { admin, id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [topicID, setTopicID] = useState("");
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    serviceAccount.getById(id).then((data) => {
      setAccount(data);
      console.log("account", account);
      serviceTopic.get().then((topic) => {
        console.log("topics", topic);
        setTopics(topic);
        setTopicID(topic[0].id);
        setIsLoading(false);
      });
    });
  }, [id]);

  if (isLoading) {
    return <h3>is Loading....</h3>;
  }

  const handleChange = (event) => {
    setTopicID(event.target.value);
  };

  const goToQuestions = () => {
    navigate("/Questions/" + admin + "/" + id + "/" + topicID);
  };

  const goToTests = () => {
    navigate("/Tests/" + admin + "/" + id + "/" + topicID);
  };
  const goToReports = () => {
    navigate("/ReportsByTest/" + admin + "/" + id);
  };

  const back = () => {
    navigate("/chooseAccount/" + admin);
  };
  return (
    <div className="container">
      <h1>Main Menu - {account.name}</h1>
      <div>
        <label>
          Choose a topic:
          <select onChange={(e) => handleChange(e)}>
            {topics
              .filter((topic) => account.topicsId.includes(topic.id))
              .map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.name}
                </option>
              ))}
          </select>
        </label>
      </div>
      <div className="links">
        <a onClick={() => goToQuestions()}>Manage Question</a>
        <a onClick={() => goToTests()}>Manage Tests</a>
        <a onClick={() => goToReports()}>Reports</a>
      </div>
      <button
        class="btn btn-secondary
"
        onClick={back}
      >
        Back
      </button>
      {/* <Butoon onClick={goToQuestion}>Manage Question</Butoon>
      <Butoon onClick={goToTest}>Manage Tests</Butoon>
      <Butoon onClick={goToReports}>Reports</Butoon> */}
    </div>
  );
};
export default MainMenu;
