import { text } from "@fortawesome/fontawesome-svg-core";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ServiceQuestion from "../../../service/serviceQuestion";
import ServiceTopic from "../../../service/serviceTopic";

const EditQuestion = () => {
  const { topic, id } = useParams();
  let service = new ServiceQuestion();
  let serviceTopic = new ServiceTopic();

  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [myTopic, setmyTopic] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [updateLastQuestion, setUpdateLastQuestion] = useState("");

  const inputType = useRef("");
  const inputText = useRef("");
  const inputBelowQuestion = useRef("");
  const inputTag = useRef("");
  const inputLanguage = useRef("");
  const inputIsActivate = useRef("");

  useEffect(() => {
    serviceTopic.getById(topic).then((data) => {
      setmyTopic(data);
    });
    service.getById(id).then((data) => {
      setQuestion(data[0]);
      setAnswers(data[0].Answers);
      setIsLoading(false);
    });
  }, [id]);

  const back = () => {
    navigate("/Questions/" + topic);
  };

  const updateQuestion = () => {
    const questionBefore = {
      id: question.id,
      text: inputText.current.value,
      textBelowQuestion: inputBelowQuestion.current.value,
      tag: inputTag.current.value,
      type: inputType.current.value,
      language: inputLanguage.current.value,
      isActivate: question.isActivate,
      lastUpdate: question.lastUpdate,
      Answers: answers,
    };

    setQuestion(questionBefore);
    service.put(questionBefore);
  };

  const updateInputAnswers = (e, index) => {
    console.log(e.target);
    const answerText = e.target.value;
    answers[index].text = answerText;
    console.log(answers[index]);
    setAnswers(answers);
  };

  const updateRadioAnswers = (e, index) => {
    console.log(e.target);
    const answerRadio = e.target.checked;
    answers.map((answer) => {
      answer.isCorrect = false;
    });
    if (answerRadio) {
      answers[index].isCorrect = true;
    }
    console.log(answers[index]);
    setAnswers(answers);
  };

  if (isLoading) {
    return <h3>is Loading....</h3>;
  }

  return (
    <div>
      <h1>Edit Question #{question.id}</h1>
      <p>
        <label>Text Of Question: </label>
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
      <p>
        <label>type of question:</label>
        <input defaultValue={question.type} ref={inputType} />
      </p>
      <p>
        <label>language of question:</label>
        <input defaultValue={question.language} ref={inputLanguage} />
      </p>
      {answers.map((answer) => {
        return answer.isCorrect ? (
          <p key={answer.id}>
            <label>Answer - {answer.id} </label>
            <input
              type="text"
              defaultValue={answer.text}
              onChange={(e) => updateInputAnswers(e, answer.id - 1)}
            />
            <input
              name="InCorrect"
              type="radio"
              defaultValue={answer.isCorrect}
              checked
              value="correct"
              onChange={(e) => updateRadioAnswers(e, answer.id - 1)}
            />
          </p>
        ) : (
          <p key={answer.id}>
            <label>Answer - {answer.id} </label>
            <input
              type="text"
              defaultValue={answer.text}
              onChange={(e) => updateInputAnswers(e, answer.id - 1)}
            />
            <input
              name="InCorrect"
              type="radio"
              defaultChecked={answer.isCorrect}
              onChange={(e) => updateRadioAnswers(e, answer.id - 1)}
            />
          </p>
        );
      })}
      <button onClick={() => back()}>Back</button>
      <input type="submit" value="update" onClick={updateQuestion} />
    </div>
  );
};
export default EditQuestion;
