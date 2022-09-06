import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ServiceTest from "../../../service/serviceTest";
import "./test.scss";
const Test = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [Questions, setQuestions] = useState([]);
  const [value, setValue] = useState("");
  const [test, setTest] = useState(null);
  const [chosenAnswer, setChosenAnswer] = useState(null);
  const [chosensAnswers, setChosensAnswers] = useState([]);
  const [grade, setGrade] = useState(0);
  const service = new ServiceTest();
  const navigate = useNavigate();
  const { admin, account, topic, id } = useParams();
  let answerGrade = 100 / Questions.length;
  useEffect(() => {
    service.getById(id).then((data) => {
      setTest(data);
      console.log(data);
      console.log(data.Questions);
      setQuestions(data.Questions);
      setIsLoading(false);
    });
  }, [id]);
  const goToIndex = (index) => {
    setIndex(index);
  };

  const next = () => {
    if (index < Questions.length - 1) setIndex(index + 1);
  };
  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };
  const submit = () => {
    let gradeParse = parseInt(grade);
    let answerGradeParse = parseInt(answerGrade);

    for (let i = 0; i < chosensAnswers.length; i++) {
      if (chosensAnswers[i] == true) {
        gradeParse += answerGrade;
        console.log("grade", gradeParse);
      } else console.log("no grade");
    }
    setGrade(gradeParse);
    debugger;
    navigate(
      "/submit/" +
        admin +
        "/" +
        account +
        "/" +
        topic +
        "/" +
        id +
        "/" +
        gradeParse
    );
  };
  const RadioAnswer = (e, item) => {
    console.log(e.target);
    const answerRadio = e.target.checked;
    console.log(" radio", answerRadio);

    setChosenAnswer(item);
    console.log("answer--", item);
    chosensAnswers[index] = item.isCorrect;
    console.log("chosensAnswers", chosensAnswers);
  };

  if (isLoading) {
    return <h3>is Loading....</h3>;
  }
  return (
    <div>
      <div>
        <div className="horinoztal">
          {Questions.map((item, index) => (
            <div className="element" key={item.id}>
              <h3 onClick={() => goToIndex(index)}>
                {index + 1}-{item.tag}{" "}
              </h3>
            </div>
          ))}
        </div>
        <div className="Show">
          <h2 style={{ fontWeight: "bold" }}>
            {index + 1}-{Questions[index].text}
          </h2>
          {Questions[index].Answers.map((item) => (
            <div
              key={item.id}
              style={{
                display: Questions[index].layout ? "block" : "inline-block",
                padding: 10,
              }}
            >
              <h3>{item.text}</h3>
              <input
                onChange={(e) => RadioAnswer(e, item)}
                name="answer"
                checked={chosenAnswer == item}
                className="radio"
                type="radio"
              />
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => next()}>next</button>
      <button onClick={() => prev()}>prev</button>
      <br />
      <button type="submit" onClick={() => submit()}>
        Submit
      </button>
    </div>
  );
};
export default Test;
