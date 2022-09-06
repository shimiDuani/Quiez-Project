import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ServiceQuestion from "../../../service/serviceQuestion";
import ServiceTopic from "../../../service/serviceTopic";
import "./showQuestion.scss";
const ShowQuestion = () => {
  const service = new ServiceQuestion();

  const [isVertical, setIsVertical] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState(null);

  const navigate = useNavigate();

  const { topic, id, admin, account } = useParams();

  useEffect(() => {
    service.getById(id).then((data) => {
      setQuestion(data);
      setAnswers(data.Answers);
      setIsLoading(false);
      console.log(data);
      console.log(data.Answers);
    });
  }, [id]);

  if (isLoading) {
    return <h3>is Loading....</h3>;
  }

  const back = () => {
    navigate("/Questions/" + admin + "/" + account + "/" + topic);
  };

  const handleClick = () => {
    setIsVertical((current) => !current);
  };

  return (
    <div className="show">
      <h1>Question #{question.id}</h1>
      <p style={{ fontWeight: "bold" }}>{question.text}</p>
      <div>
        {answers.map((answer) => {
          return answer.isCorrect ? (
            <div
              style={{
                display: isVertical ? "block" : "inline-block",
                padding: 10,
              }}
              key={answer.id}
            >
              <p
                style={{
                  color: "green",
                  fontWeight: "bold",
                }}
              >
                ({answer.id}) {answer.text} -{" "}
                {(answer.isCorrect = "is correct")}
              </p>
            </div>
          ) : (
            <div
              style={{
                display: isVertical ? "block" : "inline-block",
                padding: 10,
              }}
            >
              <p>
                ({answer.id}) {answer.text}
              </p>
            </div>
          );
        })}
      </div>
      <button type="button" class="btn btn-success" onClick={handleClick}>
        change layout
      </button>
      <button
        type="button"
        class="btn btn-secondary"
        className="btn"
        onClick={back}
      >
        Back
      </button>
    </div>
  );
};
export default ShowQuestion;
