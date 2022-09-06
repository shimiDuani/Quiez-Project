import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ServiceFinishTest from "../../../service/serviceFinishTest";
import ServiceTest from "../../../service/serviceTest";

const ShowReportByTest = () => {
  const serviceFinishTest = new ServiceFinishTest();
  const serviceTest = new ServiceTest();
  const params = useParams();
  const [finishTests, setfinishTests] = useState([]);
  const [test, setTest] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    serviceTest.getById(params.id).then((data) => {
      setTest(data);
      console.log(data);
      serviceFinishTest.get().then((data) => {
        setfinishTests(data);
        console.log(data);
        setIsLoading(false);
      });
    });
  }, [params.id]);

  if (isLoading) {
    return <h3>isLoading...</h3>;
  }

  return (
    <div>
      <table class="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Responded</th>
            <th>Date</th>
            <th>Grade</th>
            <th>Passed</th>
            <th></th>
          </tr>
        </thead>
        {finishTests
          ?.filter((finishTest) => finishTest.testId?.includes(test.id))
          ?.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.studentId}</td>
              <td>{new Date(item.lastUpdate).toLocaleDateString()}</td>
              <td>{item.grade}</td>
              <td>{item.passed ? "Passed" : "Not Passed"}</td>
            </tr>
          ))}
      </table>
    </div>
  );
};
export default ShowReportByTest;
