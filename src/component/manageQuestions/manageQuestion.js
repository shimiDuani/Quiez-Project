import ServiceQuestion from "../../service/serviceQuestion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

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

  const createQuestion = () => {
    navigate("/createQuestion");
  };
  const editQuestion = (id) => {
    navigate("/editQuestion/" + id);
    debugger;
  };
  const showQuestion = (id) => {
    navigate("/showQuestion/" + id);
  };

  return (
    <div>
      <h1>Available Question For</h1>
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
        <table>
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
          {questions.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                {item.text}
                <br />
                {item.tag}
              </td>
              <td>Last Update</td>
              <td>{item.type}</td>
              <td>number</td>
              <td>
                <button onClick={() => showQuestion(item.id)}>Show</button>
                <button onClick={() => editQuestion(item.id)}>Edit</button>
                <button>Duplicate</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
      <button onClick={() => createQuestion()}>create</button>
    </div>
  );
};
export default ManageQuestion;
