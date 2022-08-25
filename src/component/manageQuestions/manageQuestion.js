import ServiceQuestion from "../../service/serviceQuestion";
import { useState, useEffect } from "react";

const ManageQuestion = () => {
  let service = new ServiceQuestion();

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    service.get().then((questions) => {
      console.log(questions);
      setQuestions(questions);
    });
  }, []);
  return (
    <div>
      <div>
        <span>
          <label>Filter by tags or content:</label>
          <input type="text" />
        </span>
      </div>
    </div>
  );
};
export default ManageQuestion;
