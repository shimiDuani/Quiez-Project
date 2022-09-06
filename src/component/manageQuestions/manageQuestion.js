import ServiceQuestion from "../../service/serviceQuestion";
import ServiceTopic from "../../service/serviceTopic";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./manageQuestion.scss";

const ManageQuestion = () => {
  const navigate = useNavigate();
  let service = new ServiceQuestion();
  let serviceTopic = new ServiceTopic();
  const { admin, account, id } = useParams();
  const ref = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [topicQuestionId, setTopicQuestionId] = useState([]);
  const [topic, setTopic] = useState(null);
  const [query, setQuery] = useState(null);

  useEffect(() => {
    serviceTopic.getById(id).then((data) => {
      setTopic(data);
      setTopicQuestionId(data.questionId);
      console.log("topic", data);
      service.get().then((questions) => {
        setQuestions(questions);
        console.log(questions);
      });
    });
    setIsLoading(false);
  }, [id]);

  if (!topic || isLoading) {
    return <h3>is Loading....</h3>;
  }

  const theFilterSearch = () => {
    let searchQuestion = [];
    questions.map((item) => {
      if (query === "") {
        return item;
      } else if (item.tag.toLowerCase().includes(query.toLowerCase())) {
        console.log(item);
        searchQuestion.push(item);
        return item;
      }
    });
    setQuestions(searchQuestion);
  };

  const deleteQuestion = (id) => {
    const newTopicQuestionId = topicQuestionId.filter(
      (questionId) => questionId !== id
    );
    setTopicQuestionId(newTopicQuestionId);
    let newTopic = topic;
    newTopic.questionId = newTopicQuestionId;
    setTopic(newTopic);
    serviceTopic.put(topic);
    service.delete(id).then(() => {
      let allQuestions = [...questions];
      allQuestions = questions.filter((question) => question.id !== id);
      setQuestions(allQuestions);
    });
  };

  const createQuestion = () => {
    navigate("/createQuestion/" + admin + "/" + account + "/" + topic.id);
  };

  const editQuestion = (id) => {
    navigate(
      "/editQuestion/" + admin + "/" + account + "/" + topic.id + "/" + id
    );
  };
  const showQuestion = (id) => {
    navigate(
      "/showQuestion/" + admin + "/" + account + "/" + topic.id + "/" + id
    );
  };
  const back = () => {
    navigate("/mainMenu/" + admin + "/" + account);
  };

  return (
    <div>
      <h1>Available Question For : {topic.name}</h1>
      <div>
        <span>
          <label>Filter by tag question:</label>
          <input
            ref={ref}
            placeholder="Question Search"
            onChange={(e) => setQuery(e.target.value)}
            className="search"
          />
          <button
            type="button"
            class="btn btn-success"
            onClick={theFilterSearch}
          >
            search
          </button>
        </span>
      </div>
      <div>
        <table class="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Question Text and Tags</th>
              <th>Last Update</th>
              <th>Question Type</th>
              <th># of Tests</th>
              <th></th>
            </tr>
          </thead>
          {questions
            .filter((question) => topic.questionId.includes(question.id))
            .map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>
                  {item.text}
                  <p style={{ fontWeight: "bold" }}>{item.tag}</p>
                </td>
                <td>{new Date(item.lastUpdate).toLocaleDateString()}</td>
                <td>{item.type ? "Single" : "Multy"}</td>
                <td>number</td>
                <td class="active-row">
                  <div>
                    <button
                      class="btn btn-primary"
                      onClick={() => showQuestion(item.id)}
                    >
                      Show
                    </button>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      onClick={() => editQuestion(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={() => deleteQuestion(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </table>
      </div>
      <div className="buttons">
        <button
          type="button"
          class="btn btn-success"
          onClick={() => createQuestion()}
        >
          create
        </button>
        <button type="button" class="btn btn-secondary" onClick={back}>
          Back
        </button>
      </div>
    </div>
  );
};
export default ManageQuestion;
