import { useState, useRef, useEffect } from "react";
import ServiceQuestion from "../../../service/serviceQuestion";
import ServiceTest from "../../../service/serviceTest";
import ServiceTopic from "../../../service/serviceTopic";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const CreateTest = () => {
  let { admin, account, id } = useParams();

  const navigate = useNavigate();
  let serviceQuestion = new ServiceQuestion();
  let serviceTest = new ServiceTest();
  let serviceTopic = new ServiceTopic();
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [tests, setTests] = useState([]);
  const [topic, setTopic] = useState(null);
  const [topicTestId, setTopicTestId] = useState(null);
  const [newTest, setNewTest] = useState(null);
  const [testQuestions, setTestQuestions] = useState([]);
  const inputName = useRef(null);
  const inputTag = useRef(null);
  const inputDate = useRef(null);
  const inputLanguage = useRef(null);
  const passingGrade = useRef(null);
  useEffect(() => {
    serviceTopic.getById(id).then((data) => {
      console.log("topic", data);
      console.log("Topic Id", data.testId);
      setTopic(data);
      setTopicTestId(data.testId);
      setIsLoading(false);
      serviceQuestion.get().then((questions) => {
        setQuestions(questions);
        console.log(questions);
        serviceTest.get().then((data) => {
          setTests(data);
          console.log(data);
        });
      });
    });
  }, [id]);
  const back = () => {
    navigate("/Tests/" + admin + "/" + account + "/" + id);
  };
  const addQuestion = (e, item) => {
    console.log("item-----", item);
    e.preventDefault();
    setTestQuestions((prev) => [...prev, item]);
    // console.log(testQuestions);
  };
  const removeQuestion = (e, item) => {
    e.preventDefault();
    setTestQuestions((state) => state.filter((v) => v != item));
  };
  const clickHandle = (e) => {
    e.preventDefault();
    console.log(testQuestions);
    const test = {
      id: tests[tests.length - 1].id + 1,
      name: inputName.current.value,
      tag: inputTag.current.value,
      Date: inputDate.current.value,
      language: inputLanguage.current.value,
      passingGrade: passingGrade.current.value,
      Questions: testQuestions,
    };
    setTests((prev) => [...prev, test]);
    debugger;
    topicTestId.push(test.id);
    console.log("topic-id----", topicTestId);
    let newTopic = topic;
    newTopic.testid = topicTestId;
    setTopic(newTopic);
    console.log("newTopic", topic);
    serviceTopic.put(topic);
    serviceTest.post(test);
    //   navigate("/Tests/" + admin + "/" + account + "/" + id);
  };
  if (isLoading) {
    return <h3>is Loading....</h3>;
  }
  return (
    <form>
      <p>
        <label>Test Name: </label>
        <input type="text" minLength={2} ref={inputName} required />
      </p>
      <p>
        <label>Test Tag: </label>
        <input type="text" minLength={2} ref={inputTag} required />
      </p>
      <p>
        <label>Test Date: </label>
        <input type="Date" minLength={2} ref={inputDate} required />
      </p>
      <p>
        <label>Test Language: </label>
        <input type="text" minLength={2} ref={inputLanguage} required />
      </p>
      <p>
        <label>Test passing Grade: </label>
        <input type="text" minLength={2} ref={passingGrade} required />
      </p>
      <hr />
      <div>
        <h1>Test Questions: </h1>
        <div>
          {testQuestions.map((item, index) => (
            <div key={item.id}>
              <h3>
                {index + 1}-{item.text}{" "}
              </h3>
              <button onClick={(e) => removeQuestion(e, item)}>Remove</button>
              <button>Show</button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1>Add Questions: </h1>
        <div>
          {questions
            .filter((Question) => topic.questionId.includes(Question.id))
            .map((item, index) => (
              <div key={item.id}>
                <h3>
                  {index + 1}-{item.text}{" "}
                </h3>
                <button onClick={(e) => addQuestion(e, item)}>Add</button>
                <button>Show</button>
              </div>
            ))}
        </div>
        <input type="submit" value="create" onClick={(e) => clickHandle(e)} />
        <br />

        <button onClick={() => back()}>Back</button>
      </div>
    </form>
  );
};

export default CreateTest;
