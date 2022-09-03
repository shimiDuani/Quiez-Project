import { useState, useRef, useEffect } from "react";
import ServiceQuestion from "../../../service/serviceQuestion";
import { useNavigate } from "react-router-dom";

const CreateQuestion = () => {
  let service = new ServiceQuestion();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [newQeustion, setNewQuestion] = useState("");
  const [answers, setAnswers] = useState([
    { id: 1, text: "", isCorrect: true },
    { id: 2, text: "", isCorrect: false },
  ]);

  const [isVertical, setIsVertical] = useState(false);

  const inputType = useRef(null);
  const inputText = useRef(null);
  const inputBelowQuestion = useRef(null);
  const inputTag = useRef(null);
  const inputLanguage = useRef(null);

  useEffect(() => {
    service.get().then((questions) => {
      setQuestions(questions);
    });
  }, []);

  const back = () => {
    navigate("/Questions");
  };

  const clickHandle = () => {
    const question = {
      id: questions[questions.length - 1].id + 1,
      text: inputText.current.value,
      textBelowQuestion: inputBelowQuestion.current.value,
      tag: inputTag.current.value,
      type: inputType.current.value,
      isActivate: false,
      lastUpdate: "",
      Answers: answers,
    };

    console.log(question);
    setNewQuestion(question);
    setNewQuestion(question.Answers);
    let questionsBefore = questions;
    questionsBefore.push(newQeustion);
    setQuestions(questionsBefore);
    service.post(question);
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

  const addAnswer = () => {
    let answer = { id: answers.length + 1, text: "", isCorrect: false };
    let a = [...answers];
    a.push(answer);
    console.log(a);
    setAnswers(a);
    console.log(answers);
  };

  return (
    <div className="container">
      <p>
        <label>Question type: </label>
        {/* <select onChange={handleChange}>
          <option value="Single Answer Question">Single Answer Question</option>
          <option value="Multy Answer Question">Multy Answer Question</option>
        </select> */}
        <input type="text" ref={inputType} />
      </p>
      <p>
        <label>Question text: </label>
        <input type="text" minLength={2} ref={inputText} required />
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
        return answer.isCorrect ? (
          <p key={answer.id}>
            <label>Answer - ({answer.id}) </label>
            <input
              onChange={(e) => inputAnswers(e, answer.id - 1)}
              type="text"
            />
            <input
              onChange={(e) => RadioAnswers(e, answer.id - 1)}
              name="answer"
              checked
              className="radio"
              type="radio"
            />
          </p>
        ) : (
          <p key={answer.id}>
            <label>Answer - ({answer.id}) </label>
            <input
              onChange={(e) => inputAnswers(e, answer.id - 1)}
              type="text"
            />
            <input
              onChange={(e) => RadioAnswers(e, answer.id - 1)}
              name="answer"
              className="radio"
              type="radio"
            />
          </p>
        );
      })}
      <button onClick={addAnswer}>Add an answer</button>
      <br />
      <br />
      {/* <span>
        <label>Answers layout:</label>
        <input name="showQuestion" type="radio" />
        Vertical
        <input name="showQuestion" type="radio" />
        Horizontal
      </span> */}
      <hr />
      <p>
        <span>
          <label>Tags:</label>
          <input type="text" ref={inputTag} />
        </span>
        <br />
        <br />
        <button onClick={() => back()}>Back</button>
        <button>Show</button>
        <input type="submit" value="send" onClick={clickHandle} />
      </p>
    </div>
  );
};
export default CreateQuestion;
