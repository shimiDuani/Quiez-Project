import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ServiceQuestion from "../../../service/serviceQuestion";
const ShowQuestion = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState(null);

  const service = new ServiceQuestion();
  let params = useParams();
  useEffect(() => {
    service.getById(params.id).then((data) => {
      setQuestion(data);
      setAnswers(data.Answers);
      setIsLoading(false);
    });
    console.log(answers);
  }, [params.id]);

  if (isLoading) {
    return <h3>is Loading....</h3>;
  }

  return (
    <div className="container">
      <h1>Question #{question.id}</h1>
      <p style={{ fontWeight: "bold" }}>{question.text}</p>
      {answers.map((answer) => {
        return answer.isCorrect ? (
          <div key={answer.id}>
            <p style={{ color: "green", fontWeight: "bold" }}>
              {answer.text}- {(answer.isCorrect = "is correct")}
            </p>
          </div>
        ) : (
          <div>
            <p>{answer.text}</p>
          </div>
        );
      })}
    </div>
  );
};
export default ShowQuestion;
