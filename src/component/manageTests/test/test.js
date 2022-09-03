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
  const [answer, setAnswer] = useState(null);
  const [checked, setChecked] = useState(false);
  const service = new ServiceTest();
  const navigate = useNavigate();
  let params = useParams();
  useEffect(() => {
    service.getById(params.id).then((data) => {
      setTest(data);
      console.log(data);
      console.log(data.Questions);
      setQuestions(data.Questions);

      setIsLoading(false);
    });
  }, [params.id]);
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
    navigate("/submit/" + params.id);
  };
  const changeValue = (event) => {
    setValue(event.target.value);
    console.log(value);
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

        <h2 style={{ fontWeight: "bold" }}>
          {index + 1}-{Questions[index].text}
        </h2>
        {Questions[index].Answers.map((item) => (
          <div key={item.id}>
            <h3>{item.text}</h3>
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
          </div>
        ))}
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
