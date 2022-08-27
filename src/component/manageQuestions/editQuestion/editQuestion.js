import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ServiceQuestion from "../../../service/serviceQuestion";

const editQuestion = () => {
  let params = useParams();
  let service = new ServiceQuestion();

  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const inputType = useRef("");
  const inputText = useRef("");
  const inputBelowQuestion = useRef("");
  const inputTag = useRef("");
  const inputLanguage = useRef("");
  const inputIsActivate = useRef("");
  const inputAnswer1 = useRef("");
  const inputAnswer2 = useRef("");
  const inputAnswer3 = useRef("");
  const inputAnswer4 = useRef("");

  useEffect(() => {
    service.getById(params.id).then((data) => setQuestion(data));
    debugger;
    console.log(data);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [params.id]);

  const updateQuestion = () => {
    const questionBefore = {
      id: questions[questions.length - 1].id + 1,
      text: inputText.current.value,
      belowText: inputBelowQuestion.current.value,
      tag: inputTag.current.value,
      type: inputType.current.value,
      language: inputLanguage.current.value,
      isActivate: inputIsActivate.current.value,
      answers: [
        {
          answer1: inputAnswer1.current.value,
          answer2: inputAnswer2.current.value,
          answer3: inputAnswer3.current.value,
          answer4: inputAnswer4.current.value,
        },
      ],
    };
    setQuestion(questionBefore);
    service.put(questionBefore.id, questionBefore);
  };

  if (isLoading) {
    return <h3>is Loading....</h3>;
  }

  return (
    <div>
      <p>
        <label>Text Of Movie: </label>
        <input
          type="text"
          minLength={2}
          defaultValue={question.text}
          ref={inputText}
        />
      </p>

      <p>
        <label>Tag of question: </label>
        <input type="text" defaultValue={question.tag} ref={inputTag} />
      </p>

      <p>
        <label>below Text of question:</label>
        <input defaultValue={question.belowText} ref={inputBelowQuestion} />
      </p>

      <input type="submit" value="update" onClick={updateQuestion} />
    </div>
  );
};
export default editQuestion;
