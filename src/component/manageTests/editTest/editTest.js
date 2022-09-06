import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ServiceQuestion from "../../../service/serviceQuestion";
import ServiceTest from "../../../service/serviceTest";
import ServiceTopic from "../../../service/serviceTopic";
import { useParams } from "react-router-dom";

const EditTest = () => {
  const { admin, account, topic, id } = useParams();
  const navigate = useNavigate();
  let serviceTopic = new ServiceTopic();
  let serviceTest = new ServiceTest();
  let serviceQuestion = new ServiceQuestion();
  const [myTopic, setMyTopic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [testQuestions, setTestQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [myTest, setMyTest] = useState(null);
  const inputName = useRef(null);
  const inputTag = useRef(null);
  const inputDate = useRef(null);
  const inputLanguage = useRef(null);
  const passingGrade = useRef(null);
  useEffect(() => {
    serviceTopic.getById(topic).then((data) => {
      setMyTopic(data);
      console.log("topic", data);

      serviceTest.getById(id).then((data) => {
        setMyTest(data);
        setTestQuestions(data.Questions);

        serviceQuestion.get().then((data) => {
          setAllQuestions(data);
          // console.log(data);
          setIsLoading(false);
        });
      });
    });
  }, [id]);
  const updateTest = (e) => {
    e.preventDefault();
    debugger;
    const test = {
      id: myTest.id,
      name: inputName.current.value,
      tag: inputTag.current.value,
      date: inputDate.current.value,
      language: inputLanguage.current.value,
      passingGrade: passingGrade.current.value,
      Questions: testQuestions,
    };
    debugger;
    console.log("Test---", test);
    serviceTest.put(test);
  };
  const addQuestion = (e, item) => {
    e.preventDefault();
    setTestQuestions((state) => [...state, item]);
  };
  const removeQuestion = (e, item) => {
    e.preventDefault();
    setTestQuestions((state) => state.filter((v) => v != item));
  };
  const back = () => {
    navigate("/Tests/" + admin + "/" + account + "/" + topic);
  };
  if (isLoading) {
    return <h3>is Loading....</h3>;
  }
  return (
    <div>
      <form>
        <h1>Edit:</h1>
        <p>
          <label>Name Of Test: </label>
          <input
            type="text"
            minLength={2}
            defaultValue={myTest.name}
            ref={inputName}
          />
        </p>

        <p>
          <label>Tag of Test: </label>
          <input type="text" defaultValue={myTest.tag} ref={inputTag} />
        </p>
        <p>
          <label>Date of Test: </label>
          <input type="Date" defaultValue={myTest.date} ref={inputDate} />
        </p>
        <p>
          <label>Language of Test: </label>
          <input
            type="text"
            defaultValue={myTest.language}
            ref={inputLanguage}
          />
        </p>
        <p>
          <label>Passing Grade of Test: </label>
          <input
            type="text"
            defaultValue={myTest.passingGrade}
            ref={passingGrade}
          />
        </p>
        <div>
          <h1>Test Questions:</h1>
          {testQuestions.map((item, index) => (
            <div key={item.id}>
              <h3>
                {index + 1}-{item.text}{" "}
              </h3>
              <button onClick={(e) => removeQuestion(e, item)}>Remove</button>
            </div>
          ))}
        </div>
        <div>
          <h1>All Topic Questions:</h1>
          {allQuestions
            .filter((Question) => myTopic.questionId.includes(Question.id))
            .map((item, index) => (
              <div key={item.id}>
                <h3>
                  {index + 1}-{item.text}{" "}
                </h3>
                <button onClick={(e) => addQuestion(e, item)}>Add</button>
              </div>
            ))}
        </div>
        <input type="submit" value="update" onClick={(e) => updateTest(e)} />
      </form>
      <button onClick={back}>back</button>
    </div>
  );
};

export default EditTest;
