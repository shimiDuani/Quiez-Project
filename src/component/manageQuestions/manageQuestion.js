import ServiceQuestion from "../../service/serviceQuestion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./manageQuestion.scss";

const ManageQuestion = () => {
  const navigate = useNavigate();
  let service = new ServiceQuestion();
  const ref = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    service.get().then((questions) => {
      setQuestions(questions);
      setIsLoading(false);
      console.log(questions);
    });
  }, []);

  if (isLoading) {
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
    navigate("/createQuestion");
  };
  const editQuestion = (id) => {
    navigate("/editQuestion/" + id);
  };
  const showQuestion = (id) => {
    navigate("/showQuestion/" + id);
  };
  const back = () => {
    navigate("/:id");
  };

  return (
    <div>
      <h1>Available Question For </h1>
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
          {questions.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>
                {item.text}
                <br />
                {item.tag}
              </td>
              <td>Last Update</td>
              <td>{item.type}</td>
              <td>number</td>
              <td class="active-row">
                <button onClick={() => showQuestion(item.id)}>Show</button>
                <button onClick={() => editQuestion(item.id)}>Edit</button>
                <button onClick={() => deleteQuestion(item.id)}>Delete</button>
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
