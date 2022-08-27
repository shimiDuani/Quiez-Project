import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DropDown from "../../globalComponent/dropDownComponent/dropDownComponent";
import Button from "../../globalComponent/buttonComponent/buttonComponent";
import ServiceAccount from "../../service/serviceAccount";
import "./chooseAccount.scss";

const ChooseAccount = () => {
  const service = new ServiceAccount();
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState([]);

  useEffect(() => {
    service.get().then((accounts) => {
      console.log(accounts);
      setAccounts(accounts);
      setAccount(accounts[0].id);
    });
  }, []);

  const goToAccount = (account) => {
    console.log(account);
    navigate("/" + account); //send account.id
  };

  // const goToImage = (id) => {
  //   navigate("/gallery/" + id);
  // };
  const handleChange = (event) => {
    setAccount(event.target.value);
  };

  return (
    <div className="choose">
      <DropDown
        text={"Choose Account:"}
        options={accounts}
        onChange={handleChange}
        //  value={account}
      />
      <div className="submit">
        <Button onClick={() => goToAccount(account)}>Submit</Button>
      </div>
    </div>
  );
};
export default ChooseAccount;
