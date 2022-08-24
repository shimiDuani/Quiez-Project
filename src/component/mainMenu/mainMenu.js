import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DropDown from "../../globalComponent/dropDownComponent/dropDownComponent";
import Service from "../../service/service";

const MainMenu = () => {
  const params = useParams();
  let service = new Service();
  const [account, setAccount] = useState(null);
  const topic = [
    { name: "English", value: "English" },
    { name: "Matematic", value: "English" },
    { name: "Biolig", value: "English" },
  ];
  useEffect(() => {
    service.getById(params.id).then((data) => setAccount(data));
  }, [params.id]);

  //   const goToAccount = () => {
  //     navigate("/" + params.id);
  //   };
  return (
    <div>
      <h1>Main Menu</h1>
      <DropDown />
      {/* <Butoon>Manage Question</Butoon> */}
    </div>
  );
};
export default MainMenu;
