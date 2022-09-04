import ServiceTest from "../../service/serviceTest";
import ServiceTopic from "../../service/serviceTopic";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./manageTest.scss";

const ManageTest = () => {
  let params = useParams();
  const navigate = useNavigate();
  let serviceTest = new ServiceTest();
  let serviceTopic = new ServiceTopic();
  const ref = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [topic, setTopic] = useState(null);
  const [tests, setTests] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    serviceTopic.getById(params.id).then((Data) => {
      setTopic(Data);
      console.log("topic", Data);
      serviceTest.get().then((tests) => {
        setTests(tests);
        console.log("tests", tests);
      });
    });
    setIsLoading(false);
  }, [params.id]);

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
    navigate("/createTest/" + params.id);
  };
  const editTest = (id) => {
    navigate("/editTest/" + id);
  };
  const showTest = (id) => {
    navigate("/showTest/" + id);
  };
  const startTest = (id) => {
    navigate("/startTest/" + id);
  };
  const deleteTest = (item) => {
    console.log("item--", item);
    console.log("id--", item.id);
    let newTopic = topic;
    newTopic.testid.pop(item.id);
    setTopic(newTopic);
    console.log("topic---", topic);
    setTests((state) => state.filter((v) => v != item));
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
          <button onClick={theFilterSearch}>search</button>
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
                  <button onClick={() => showTest(item.id)}>Show</button>
                  <button onClick={() => editTest(item.id)}>Edit</button>
                  <button onClick={() => startTest(item.id)}>Strat</button>
                  <button onClick={() => deleteTest(item)}>Delete</button>
                </td>
              </tr>
            ))}
        </table>
      </div>
      <button onClick={() => createTest()}>create</button>
    </div>
  );
};
export default ManageTest;
