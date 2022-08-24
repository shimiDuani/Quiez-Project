import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DropDown from "../../globalComponent/dropDownComponent/dropDownComponent";
import Button from "../../globalComponent/buttonComponent/buttonComponent";
import Service from "../../service/service";

const ChooseAccount = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState([]);

  const service = new Service();

  useEffect(() => {
    service.get().then((accounts) => {
      setAccount(accounts);
    });
  }, []);

  const goToAccount = (id) => {
    navigate("/" + id);
  };

  const handleChange = (event) => {
    setAccount(event.target.value);
  };

  return (
    <div>
      <DropDown
        text={"Choose Account:"}
        value={account}
        options={account.Name}
        onChange={handleChange}
      />
      <Button onClick={goToAccount} text={"Submit"} />
    </div>
  );
};
export default ChooseAccount;
