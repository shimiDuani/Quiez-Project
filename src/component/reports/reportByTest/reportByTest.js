import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ServiceTest from "../../../service/serviceTest";
import ServiceFinishTest from "../../../service/serviceFinishTest";

const ReportByTest = () => {
  let serviceTest = new ServiceTest();
  let serviceFinishTest = new ServiceFinishTest();
  const { admin, account } = useParams();
  const [finishTests, setFinishTests] = useState([]);
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [test, setTest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    serviceTest.get().then((data) => {
      setTests(data);
      setTest(data[0].id);
      console.log(data);
      setIsLoading(false);
    });
    // serviceFinishTest.get().then((data) => {
    //   setFinishTests(data);
    //   console.log("finish tests", data);
    // });
  }, []);
  if (isLoading) {
    return <h3>isLoading...</h3>;
  }
  const handleChange = (event) => {
    setTest(event.target.value);
  };
  const goToTest = () => {
    navigate("/showReportsByTest/" + admin + "/" + account + "/" + test);
  };

  return (
    <div>
      <h1>Report by test</h1>
      <div>
        <label>
          Choose a Test:
          <select onChange={(e) => handleChange(e)}>
            {tests.map((test) => (
              <option key={test.id} value={test.id}>
                {test.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button onClick={goToTest}>Go to report</button>
    </div>
  );
};
export default ReportByTest;
