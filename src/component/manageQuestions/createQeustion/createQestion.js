import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ServiceQuestion from "../../../service/serviceQuestion";
import ServiceTopic from "../../../service/serviceTopic";
import "./createQuestion.scss";

const CreateQuestion = () => {
  let serviceQuestion = new ServiceQuestion();
  let serviceTopic = new ServiceTopic();

  const inputText = useRef(null);
  const inputBelowQuestion = useRef(null);
  const inputTag = useRef(null);

  const navigate = useNavigate();

  const { admin, account, id } = useParams();

  const [topic, setTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [newQeustion, setNewQuestion] = useState("");

  const [questionSingleType, setQuestionSingleType] = useState(true);
  const [isVertical, setIsVertical] = useState(true);
  const [isEnglish, setIsEnglish] = useState(true);

  const [answers, setAnswers] = useState([
    { id: 1, text: "", isCorrect: false },
    { id: 2, text: "", isCorrect: false },
  ]);

  useEffect(() => {
    serviceTopic.getById(id).then((topic) => {
      setTopic(topic);
      serviceQuestion.get().then((questions) => {
        setQuestions(questions);
      });
    });
  }, []);

  const back = () => {
    navigate("/Questions/" + admin + "/" + account + "/" + id);
  };

  const clickHandle = () => {
    const question = {
      id: questions[questions.length - 1].id + 1,
      text: inputText.current.value,
      textBelowQuestion: inputBelowQuestion.current.value,
      tag: inputTag.current.value,
      type: questionSingleType,
      language: isEnglish,
      layout: isVertical,
      isActivate: false,
      lastUpdate: "",
      Answers: answers,
    };

    setNewQuestion(question);
    setNewQuestion(question.Answers);
    let questionsBefore = questions;
    questionsBefore.push(newQeustion);
    setQuestions(questionsBefore);

    let newTopic = topic;
    newTopic.questionId.push(question.id);
    setTopic(newTopic);
    serviceTopic.put(topic);
    serviceQuestion.post(question);
  };

  const inputAnswers = (e, index) => {
    console.log(e.target);
    const answerText = e.target.value;
    answers[index].text = answerText;
    console.log(answers[index]);
    setAnswers(answers);
  };

  const RadioAnswers = (e, index) => {
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
    if (answerRadio) {
      answers[index].isCorrect = true;
    }
    console.log(answers[index]);
    setAnswers(answers);
  };

  const addAnswer = () => {
    let answer = { id: answers.length + 1, text: "", isCorrect: false };
    let a = [...answers];
    a.push(answer);
    console.log(a);
    setAnswers(a);
    console.log(answers);
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
    <div className="container">
      <p>
        <label>Question type: </label>
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
      <p>
        <label>Question text: </label>
        <input type="text" minLength={2} ref={inputText} required />
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
        <label for="single">English</label>
        <input
          onChange={handleClickLanguage}
          checked={!isEnglish}
          id="hebrew"
          name="language"
          type="radio"
        />
        <label for="multy">Hebrew</label>
      </p>
      <p>
        <label>Text below question: </label>
        <br />
        <br />
        <textarea
          ref={inputBelowQuestion}
          cols={60}
          rows={8}
          type="text"
        ></textarea>
      </p>
      <hr />
      <label>Possible answers: </label>
      {answers.map((answer) => {
        return (
          <p key={answer.id}>
            <label>Answer - ({answer.id}) </label>
            <input
              required
              onChange={(e) => inputAnswers(e, answer.id - 1)}
              type="text"
            />
            <input
              onChange={
                questionSingleType
                  ? (e) => RadioAnswers(e, answer.id - 1)
                  : (e) => CheckboxAnswers(e, answer.id - 1)
              }
              name="answer"
              type={questionSingleType ? "radio" : "checkbox"}
            />
          </p>
        );
      })}
      <button type="button" class="btn btn-success" onClick={addAnswer}>
        Add{" "}
      </button>
      <br />
      <br />
      <span>
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
      </span>
      <hr />
      <p>
        <span>
          <label>Tags:</label>
          <input minLength={2} type="text" ref={inputTag} />
        </span>
        <br />
        <span>
          <button
            type="button"
            class="btn btn-secondary"
            onClick={() => back()}
          >
            Back
          </button>
          <input
            type="button"
            class="btn btn-success"
            value="Create"
            onClick={clickHandle}
          />
        </span>
      </p>
    </div>
  );
};
export default CreateQuestion;
