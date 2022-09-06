import ServiceTest from "../../service/serviceTest";
import ServiceTopic from "../../service/serviceTopic";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./manageTest.scss";

const ManageTest = () => {
  let { admin, account, id } = useParams();
  const navigate = useNavigate();
  let serviceTest = new ServiceTest();
  let serviceTopic = new ServiceTopic();
  const ref = useRef();
  const [topicTestId, setTopicTestId] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [topic, setTopic] = useState(null);
  const [tests, setTests] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    serviceTopic.getById(id).then((Data) => {
      setTopic(Data);
      console.log("topic", Data);
      serviceTest.get().then((tests) => {
        setTests(tests);
        console.log("tests", tests);
        setIsLoading(false);
      });
    });
  }, [id]);

  if (isLoading) {
    return <h3>is Loading....</h3>;
  }
  const theFilterSearch = () => {
    let searchTest = [];
    tests.map((item) => {
      if (query === "") {
        return item;
      } else if (item.tag.toLowerCase().includes(query.toLowerCase())) {
        console.log(item);
        searchTest.push(item);
        return item;
      }
    });
    setTests(searchTest);
  };
  const createTest = () => {
    navigate("/createTest/" + admin + "/" + account + "/" + topic.id);
  };
  const editTest = (id) => {
    navigate("/editTest/" + admin + "/" + account + "/" + topic.id + "/" + id);
  };
  const showTest = (id) => {
    navigate("/showTest/" + admin + "/" + account + "/" + topic.id + "/" + id);
  };
  const startTest = (id) => {
    navigate("/startTest/" + admin + "/" + account + "/" + topic.id + "/" + id);
  };

  const back = () => {
    navigate("/mainMenu/" + admin + "/" + account);
  };

  const deleteTest = (item) => {
    console.log("item--", item);
    console.log("id--", item.id);
    setTopicTestId(topic.testId);
    const newTopicTestId = topicTestId.filter((testId) => testId !== item.id);
    setTopicTestId(newTopicTestId);
    let newTopic = topic;
    newTopic.testId = newTopicTestId;
    setTopic(newTopic);
    console.log("topic---", topic);
    let newTests = tests;
    newTests.filter((test) => test.id !== item.id);
    setTests(newTests);
    serviceTopic.put(topic);
    serviceTest.delete(item.id);
  };

  return (
    <div>
      <h1>Manage Tests</h1>
      <div>
        <span>
          <label>Filter by tags or content:</label>
          <input
            ref={ref}
            placeholder="Test Search"
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
              <th>Test Text and Tags</th>
              <th>Last Update</th>
              <th>Language</th>
              <th>Passing Grade</th>
              <th></th>
            </tr>
          </thead>
          {tests
            .filter((test) => topic.testId.includes(test.id))
            .map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  {item.name}
                  <br />
                  {item.tag}
                </td>
                <td>{item.Date}</td>
                <td>{item.language}</td>
                <td>{item.passingGrade}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={() => showTest(item.id)}
                  >
                    Show
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    onClick={() => editTest(item.id)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-success"
                    onClick={() => startTest(item.id)}
                  >
                    Start
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => deleteTest(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </table>
      </div>
      <button
        type="button"
        class="btn btn-success"
        onClick={() => createTest()}
      >
        create
      </button>
      <button type="button" class="btn btn-secondary" onClick={() => back()}>
        back
      </button>
    </div>
  );
};
export default ManageTest;
