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
            setTimeout(() => {
                setIsLoading(false);
            }, 3000);
            console.log(tests);
        });
    }, []);

    if (isLoading) {
        return <h3>is Loading....</h3>;
    }

    return (
        <div>
            <h1>Manage Tests</h1>
            
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
                <button>Show</button>
                <button>Edit</button>
                <button>Duplicate</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
        </div>
    )
};
export default ManageTest;
