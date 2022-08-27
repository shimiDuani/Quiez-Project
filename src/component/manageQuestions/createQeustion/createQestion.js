import { useState, useRef, useEffect } from "react";
import ServiceQuestion from "../../../service/serviceQuestion";

const CreateQuestion = () => {
  let service = new ServiceQuestion();
  const [questions, setQuestions] = useState([]);
  const [newQeustion, setNewQuestion] = useState("");
  const [typeQuestion, setTypeQuestion] = useState("");

  const inputType = useRef(null);
  const inputText = useRef(null);
  const inputBelowQuestion = useRef(null);
  const inputTag = useRef(null);
  const inputLanguage = useRef(null);
  const inputAnswer1 = useRef(null);
  const inputAnswer2 = useRef(null);
  const inputAnswer3 = useRef(null);
  const inputAnswer4 = useRef(null);

  useEffect(() => {
    service.get().then((questions) => {
      setQuestions(questions);
    });
  }, []);

  const handleChange = (event) => {
    setTypeQuestion(event.target.value);
  };

  // const fileOnChange = (e) => {
  //   const file = e.target.files[0];
  //   console.log(file);
  //   SetSrc(file.name);
  // };

  const clickHandle = (e) => {
    const question = {
      id: questions[questions.length - 1].id + 1,
      text: inputText.current.value,
      belowText: inputBelowQuestion.current.value,
      tag: inputTag.current.value,
      type: inputType.current.value,
      language: inputLanguage.current.value,
      isActivate: false,
      answers: [
        {
          answer1: inputAnswer1.current.value,
          answer2: inputAnswer2.current.value,
          answer3: inputAnswer3.current.value,
          answer4: inputAnswer4.current.value,
        },
      ],
    };

    setNewQuestion(question);
    let questionsBefore = questions;
    questionsBefore.push(newQeustion);
    setQuestions(questionsBefore);
    service.post(question);
  };

  return (
    <form className="Container">
      <p>
        <label>Question type: </label>
        <select onChange={handleChange}>
          <option value="Single Answer Question">Single Answer Question</option>
          <option value="Multy Answer Question">Multy Answer Question</option>
        </select>
      </p>
      <p>
        <label>Question text: </label>
        <input type="text" minLength={2} ref={inputText} required />
      </p>
      <label>Text below question: </label>
      <textarea ref={inputBelowQuestion} cols={70} type="text"></textarea>

      <hr />
      <div>
        <label>Possible answers: </label>
        <p>
          <input
            ref={inputAnswer1}
            required
            className="myCorrect1"
            type="text"
          />
          <input className="radio" type="checkbox" />
          <label for="myCorrect1">Incorrect</label>
        </p>
        <p>
          <input
            ref={inputAnswer2}
            required
            className="myCorrect2"
            type="text"
          />
          <input className="radio" type="radio" />
          <label for="myCorrect2">Incorrect</label>
        </p>
        <p>
          <input
            ref={inputAnswer3}
            required
            className="myCorrect3"
            type="text"
          />
          <input className="radio" type="radio" />
          <label for="myCorrect3">Incorrect</label>
        </p>
        <p>
          <input
            ref={inputAnswer4}
            required
            className="myCorrect4"
            type="text"
          />
          <input className="radio" type="radio" />
          <label for="myCorrect4">Incorrect</label>
        </p>
        <span>
          <label>Answers layout:</label>
          <input type="radio" />
          Vertical
          <input type="radio" />
          Horizontal
        </span>
        <button>Add an answer</button>
      </div>
      <hr />
      <div>
        <p>
          <span>
            <label>Tags:</label>
            <input type="text" />
          </span>
          <button>Back</button>
          <button>Show</button>
          <input type="submit" value="send" onClick={clickHandle} />
        </p>
      </div>
    </form>
  );
};
export default CreateQuestion;
