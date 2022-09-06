import { text } from "@fortawesome/fontawesome-svg-core";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ServiceQuestion from "../../../service/serviceQuestion";
import ServiceTopic from "../../../service/serviceTopic";
import "./editQuestion.scss";

const EditQuestion = () => {
  const { topic, id, admin, account } = useParams();
  let service = new ServiceQuestion();
  let serviceTopic = new ServiceTopic();

  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [myTopic, setmyTopic] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [questionSingleType, setQuestionSingleType] = useState("");
  const [isVertical, setIsVertical] = useState("");
  const [isEnglish, setIsEnglish] = useState("");

  const inputType = useRef("");
  const inputText = useRef("");
  const inputBelowQuestion = useRef("");
  const inputTag = useRef("");

  useEffect(() => {
    serviceTopic.getById(topic).then((data) => {
      setmyTopic(data);
    });
    service.getById(id).then((data) => {
      setQuestion(data);
      setAnswers(data.Answers);
      setIsVertical(data.layout);
      setQuestionSingleType(data.type);
      setIsEnglish(data.language);
      console.log(data);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) {
    return <h3>is Loading....</h3>;
  }

  const back = () => {
    navigate("/Questions/" + admin + "/" + account + "/" + topic);
  };

  const updateQuestion = () => {
    const questionBefore = {
      id: question.id,
      text: inputText.current.value,
      textBelowQuestion: inputBelowQuestion.current.value,
      tag: inputTag.current.value,
      type: questionSingleType,
      layout: isVertical,
      language: isEnglish,
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

  const CheckboxAnswers = (e, index) => {
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

  const handleClickType = () => {
    setQuestionSingleType((current) => !current);
  };
  const handleClickVertical = () => {
    setIsVertical((current) => !current);
    console.log(isVertical);
  };
  const handleClickLanguage = () => {
    setIsEnglish((current) => !current);
  };

  return (
    <div className="bigDiv">
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
        <label>below Text of question:</label>
        <input defaultValue={question.belowText} ref={inputBelowQuestion} />
      </p>

      <p>
        <label>Tag of question: </label>
        <input type="text" defaultValue={question.tag} ref={inputTag} />
      </p>
      <p>
        <label>Question language: </label>
        <input
          onChange={handleClickLanguage}
          checked={isEnglish}
          id="english"
          name="language"
          type="radio"
        />
        <label for="english">English</label>
        <input
          onChange={handleClickLanguage}
          checked={!isEnglish}
          id="hebrew"
          name="language"
          type="radio"
        />
        <label for="hebrew">Hebrew</label>
      </p>

      <p>
        <label>Answers layout:</label>
        <input
          onChange={handleClickVertical}
          id="horizontal"
          name="showQuestion"
          checked={!isVertical}
          type="radio"
        />
        <label for="horizontal">Horizontal</label>
        <input
          onChange={handleClickVertical}
          checked={isVertical}
          id="vertical"
          name="showQuestion"
          type="radio"
        />
        <label for="vertical">Vertical</label>
      </p>
      <p>
        <label>type of question:</label>
        <input
          onChange={handleClickType}
          checked={questionSingleType}
          id="single"
          name="typeAnswers"
          type="radio"
        />
        <label for="single">Single</label>
        <input
          onChange={handleClickType}
          checked={!questionSingleType}
          id="multy"
          name="typeAnswers"
          type="radio"
        />
        <label for="multy">Multy</label>
      </p>
      {answers.map((answer) => {
        return answer.isCorrect ? (
          <p key={answer.id}>
            <label>Answer - ({answer.id}) </label>
            <input
              required
              type="text"
              defaultValue={answer.text}
              onChange={(e) => updateInputAnswers(e, answer.id - 1)}
            />
            <input
              checked
              onChange={
                questionSingleType
                  ? (e) => updateRadioAnswers(e, answer.id - 1)
                  : (e) => CheckboxAnswers(e, answer.id - 1)
              }
              type={questionSingleType ? "radio" : "checkbox"}
            />
          </p>
        ) : (
          <p key={answer.id}>
            <label>Answer - ({answer.id}) </label>
            <input
              required
              type="text"
              defaultValue={answer.text}
              onChange={(e) => updateInputAnswers(e, answer.id - 1)}
            />
            <input
              onChange={
                questionSingleType
                  ? (e) => updateRadioAnswers(e, answer.id - 1)
                  : (e) => CheckboxAnswers(e, answer.id - 1)
              }
              type={questionSingleType ? "radio" : "checkbox"}
            />
          </p>
        );
      })}
      <span>
        <button type="button" class="btn btn-secondary" onClick={() => back()}>
          Back
        </button>
        <input
          type="button"
          class="btn btn-success"
          value="Create"
          onClick={updateQuestion}
        />
      </span>
    </div>
  );
};
export default EditQuestion;
