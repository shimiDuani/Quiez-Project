import ServiceTest from "../../service/serviceTest";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";


const ManageTest = () => {
    const navigate = useNavigate();
    let service = new ServiceTest();
    const ref = useRef();
    const [isLoading, setIsLoading] = useState(true);
    const [tests, setTests] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        service.get().then((tests) => {
            setTests(tests);         
            setIsLoading(false);
           
            console.log(tests);
        });
    }, []);

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
        navigate("/createTest");
      };
      const editTest = (id) => {
        navigate("/editTest/" + id);
        debugger;
      };
      const showTest = (id) => {
        navigate("/showTest/" + id);
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
        <table>
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
          {tests.map((item) => (
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
                <button onClick={() => showTest(item.id)} >Show</button>
                <button onClick={() => editTest(item.id)} >Edit</button>
                <button>Duplicate</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
      <button onClick={() => createTest()}>create</button>
        </div>
    )
};
export default ManageTest;
