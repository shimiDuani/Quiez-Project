import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ServiceTest from "../../../service/serviceTest";
const ShowTest = () => {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [Questions, setQuestions] = useState([]);
  const [test, setTest] = useState(null);
  const service = new ServiceTest();
  let params = useParams();
  useEffect(() => {
    service.getById(params.id).then((data) => {
      setTest(data);
      console.log(data);
      console.log(data.Questions);
      setQuestions(data.Questions);

      //   setQuestions(data.Qustions)
      //   setAnswers(data.Qustions.Answers);
      setIsLoading(false);
    });
    console.log(answers);
  }, [params.id]);

  const show = (id) => {
    navigate("/Question/" + id);
  };

  if (isLoading) {
    return <h3>is Loading....</h3>;
  }
  return (
    <div>
      <h1></h1>
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
        {Questions.map((item) => (
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
              <button onClick={() => show(item.id)}>Show</button>
              <button>Edit</button>
              <button>Duplicate</button>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};
export default ShowTest;
