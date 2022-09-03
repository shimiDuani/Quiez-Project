import { useState, useRef, useEffect } from "react";
import ServiceQuestion from "../../../service/serviceQuestion";
import ServiceTest from "../../../service/serviceTest";
import { useParams } from "react-router-dom";

const EditTest = () => {
  let params = useParams();
  let serviceTest = new ServiceTest();
  let serviceQuestion = new ServiceQuestion();
  const [isLoading, setIsLoading] = useState(true);
  const [testQuestions, setTestQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [test, setTest] = useState([]);
  const inputName = useRef(null);
  const inputTag = useRef(null);
  const inputDate = useRef(null);
  const inputLanguage = useRef(null);
  const passingGrade = useRef(null);
  useEffect(() => {
    serviceTest.getById(params.id).then((data) => {
      setTest(data);
      // console.log(data);
      // console.log(data.Questions)
      setTestQuestions(data.Questions);
      //     setQuestions(data.Qustions)
      //   setAnswers(data.Qustions.Answers);
    });
    serviceQuestion.get().then((data) => {
      setAllQuestions(data);
      // console.log(data);
    });
    setIsLoading(false);
  }, [params.id]);

  const updateTest = (e) => {
    e.preventDefault();
    const test = {
      name: inputName.current.value,
      tag: inputTag.current.value,
      Date: inputDate.current.value,
      language: inputLanguage.current.value,
      passingGrade: passingGrade.current.value,
      Questions: testQuestions,
    };
    console.log("Test---", test);
    serviceTest.put(params.id, test);
  };

  const addQuestion = (e, item) => {
    e.preventDefault();
    setTestQuestions((state) => [...state, item]);
  };
  const removeQuestion = (e, item) => {
    e.preventDefault();
    setTestQuestions((state) => state.filter((v) => v != item));
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
            defaultValue={test.name}
            ref={inputName}
          />
        </p>

        <p>
          <label>Tag of Test: </label>
          <input type="text" defaultValue={test.tag} ref={inputTag} />
        </p>
        <p>
          <label>Date of Test: </label>
          <input type="Date" defaultValue={test.Date} ref={inputDate} />
        </p>
        <p>
          <label>Language of Test: </label>
          <input type="text" defaultValue={test.language} ref={inputLanguage} />
        </p>
        <p>
          <label>Passing Grade of Test: </label>
          <input
            type="text"
            defaultValue={test.passingGrade}
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
          <h1>All Questions:</h1>
          {allQuestions.map((item, index) => (
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
    </div>
  );
};
export default EditTest;
