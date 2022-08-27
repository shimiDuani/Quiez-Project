import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ServiceQuestion from "../../../service/serviceQuestion";
const ShowQuestion = () => {
  const [isLoading, setIsLoading] = useState(true);

  const service = new ServiceQuestion();
  let params = useParams();
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    service.getById(params.id).then((data) => setQuestion(data));
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    console.log(question);
  }, [params.id]);

  if (isLoading) {
    return <h3>is Loading....</h3>;
  }

  return (
    <div>
      <h1>Question #{question.id}</h1>
      <p>{question.text}</p>
    </div>
  );
};
export default ShowQuestion;
