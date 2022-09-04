import ServiceQuestion from "../../service/serviceQuestion";
import ServiceTopic from "../../service/serviceTopic";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./manageQuestion.scss";

const ManageQuestion = () => {
  const navigate = useNavigate();
  let service = new ServiceQuestion();
  let serviceTopic = new ServiceTopic();
  const params = useParams();
  const ref = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [topic, setTopic] = useState(null);
  const [query, setQuery] = useState(null);

  useEffect(() => {
    serviceTopic.getById(params.id).then((data) => {
      setTopic(data);
      console.log("topic", data);
    });
    service.get().then((questions) => {
      setQuestions(questions);
      setIsLoading(false);
      console.log(questions);
    });
  }, [params.id]);

  if (!topic || isLoading) {
    return <h3>is Loading....</h3>;
  }

  const theFilterSearch = () => {
    let searchQuestion = [];
    questions.map((item) => {
      if (query === "") {
        return item;
      } else if (item.text.toLowerCase().includes(query.toLowerCase())) {
        console.log(item);
        searchQuestion.push(item);
        return item;
      }
    });
    setQuestions(searchQuestion);
  };

  const deleteQuestion = (id) => {
    service.delete(id).then(() => {
      let allQuestions = [...questions];
      allQuestions = questions.filter((question) => question.id !== id);
      setQuestions(allQuestions);
    });
  };

  const createQuestion = () => {
    navigate("/createQuestion/" + topic.id);
  };
  const editQuestion = (id) => {
    navigate("/editQuestion/" + topic.id + "/" + id);
  };
  const showQuestion = (id) => {
    navigate("/showQuestion/" + topic.id + "/" + id);
  };
  const back = () => {
    navigate("/mainMenu/" + params.id);
  };

  return (
    <div>
      <h1>Available Question For : {topic.name}</h1>
      <div>
        <span>
          <label>Filter by tags or content:</label>
          <input
            ref={ref}
            placeholder="Question Search"
            onChange={(e) => setQuery(e.target.value)}
            className="search"
          />
          <button onClick={theFilterSearch}>search</button>
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
                  <br />
                  {item.tag}
                </td>
                <td>{new Date(item.lastUpdate).toLocaleDateString()}</td>
                <td>{item.type}</td>
                <td>number</td>
                <td class="active-row">
                  <button onClick={() => showQuestion(item.id)}>Show</button>
                  <button onClick={() => editQuestion(item.id)}>Edit</button>
                  <button onClick={() => deleteQuestion(item.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </table>
      </div>
      <button className="btnEnd" onClick={() => createQuestion()}>
        create
      </button>
    </div>
  );
};
export default ManageQuestion;
