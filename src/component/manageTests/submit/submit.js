import { faRulerCombined } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ServiceTest from "../../../service/serviceTest";

const Submit = () => {
  let { id, grade } = useParams();
  let showGrade = parseInt(grade);
  let serviceTest = new ServiceTest();
  const [test, setTest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    serviceTest.getById(id).then((data) => {
      setTest(data);
      console.log(data);
      setIsLoading(false);
    });
  }, [id]);
  if (isLoading) {
    return <h3>is Loading....</h3>;
  }
  return (
    <div>
      <h1>Your test is finised</h1>
      <h3>Your Grade is:{showGrade}</h3>
      <h3>Test Passing Grade :{test.passingGrade}</h3>
      <div>
        {showGrade >= test.passingGrade ? (
          <p
            style={{
              color: "green",
              fontWeight: "bold",
            }}
          >
            You Passed The Test{" "}
          </p>
        ) : (
          <p
            style={{
              color: "red",
              fontWeight: "bold",
            }}
          >
            You Failed The Test
          </p>
        )}
      </div>
    </div>
  );
};
export default Submit;
