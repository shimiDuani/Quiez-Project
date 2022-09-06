import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ServiceTest from "../../../service/serviceTest";
import "./startTest.scss";

function StartTest() {
  const [isLoading, setIsLoading] = useState(true);
  const [Questions, setQuestions] = useState([]);
  const [test, setTest] = useState(null);
  const service = new ServiceTest();
  const navigate = useNavigate();
  const { admin, account, topic, id } = useParams();
  useEffect(() => {
    service.getById(id).then((data) => {
      setTest(data);
      console.log(data);
      console.log(data.Questions);
      setQuestions(data.Questions);

      //     setQuestions(data.Qustions)
      //   setAnswers(data.Qustions.Answers);
      setIsLoading(false);
    });
  }, [id]);
  const strat = () => {
    navigate("/test/" + admin + "/" + account + "/" + topic + "/" + id);
  };
  if (isLoading) {
    return <h3>is Loading....</h3>;
  }

  return (
    <div className="page">
      <form>
        <h1>Login:</h1>
        <h3>Name:</h3>
        <input type="text" minLength={2} />
        <h3>Mail:</h3>
        <input type="email" minLength={2} />
        <br />
        <input type="submit" value="start" onClick={() => strat()} />
      </form>
      <div className="info">
        <h1>Info:</h1>
        <h2>Test Name: {test.name}</h2>
        <h3>Test Tag: {test.tag}</h3>
        <h3>Test Language: {test.language}</h3>
        <h3>Test Passing Gard: {test.passingGrade}</h3>
        <h3>Qustions: {Questions.length}</h3>
      </div>
    </div>
  );
}
export default StartTest;
