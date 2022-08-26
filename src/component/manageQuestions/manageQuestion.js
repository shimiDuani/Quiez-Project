import ServiceQuestion from "../../service/serviceQuestion";
import { useState, useEffect } from "react";

const ManageQuestion = () => {
  let service = new ServiceQuestion();

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    service.get().then((questions) => {
      setQuestions(questions);
      console.log(questions);
    });
  }, []);
  return (
    // <div>
    //   <div>
    //     <span>
    //       <label>Filter by tags or content:</label>
    //       <input type="text" />
    //     </span>
    //   </div>
    <div>
      {questions.map((item, i) => {
        <table>
          <tr key={i} value={item}>
            <th>ID:</th>
            <th>Text:</th>
            <th>Tag</th>
            <th>Type</th>
            <th>language</th>
          </tr>
          <tr>
            <td>{item.id}</td>
            <td>{item.text}</td>
            <td>{item.tag}</td>
            <td>{item.type}</td>
            <td>{item.language}</td>
          </tr>
        </table>;
        debugger;
      })}
    </div>
  );
};
export default ManageQuestion;
