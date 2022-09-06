import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import DropDown from "../../globalComponent/dropDownComponent/dropDownComponent";
import Button from "../../globalComponent/buttonComponent/buttonComponent";
import ServiceAccount from "../../service/serviceAccount";
import ServiceAdmin from "../../service/serviceAdmin";
import "./chooseAccount.scss";

const ChooseAccount = () => {
  let params = useParams();
  const serviceAdmin = new ServiceAdmin();
  const serviceAccount = new ServiceAccount();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState([]);
  useEffect(() => {
    //let tempData;
    serviceAdmin.getById(params.id).then((data) => {
      console.log("admin", data);
      setAdmin(data);
      console.log("admin1", admin);
      serviceAccount.get().then((accounts) => {
        console.log("accounts", accounts);
        setAccounts(accounts);
        setAccount(accounts[0].id);
        setIsLoading(false);
      });
    });
  }, [params.id]);

  if (!admin) {
    return <h3>is Loading....</h3>;
  }
  if (isLoading) {
    return <h3>is Loading....</h3>;
  }

  const goToAccount = (account) => {
    console.log(account);
    navigate("/mainMenu/" + admin.id + "/" + account); //send account.id
  };
  const handleChange = (event) => {
    setAccount(event.target.value);
  };
  return (
    <div className="choose">
      <h1>Hello {admin.name}</h1>

      <DropDown
        text={"Choose University :"}
        options={accounts.filter((account) =>
          admin.accountId.includes(account.id)
        )}
        onChange={handleChange}
      />
      <div className="submit">
        <button class="btn btn-success" onClick={() => goToAccount(account)}>
          Submit
        </button>
      </div>
    </div>
  );
};
export default ChooseAccount;
