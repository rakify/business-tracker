import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/apiCalls";
import ErrorDisplay from "./ErrorDisplay";

const Title = styled.span`
  font-weight: bolder;
  margin: 3px;
`;
const Form = styled.form`
  display: flex;
  gap: 15px;
  ${mobile({ flexDirection: "column" })}
`;
const Input = styled.input`
  margin-right: 5px;
  max-width: 200px;
  padding-left: 5px;
  text-transform: capitalize;
`;
const Button = styled.button`
  background-color: #132513;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 250;
`;

const AddCustomer = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [error, setError] = useState("");

  const [inputs, setInputs] = useState({
    email: user.email,
    key: "",
    name: "",
    pn: "",
    address: "",
    note: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let customers = user.customers;
    const customer = [
      {
        name: inputs.name.toLowerCase().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()),
        _name: inputs.name.toLowerCase().replace(/\s+/g, '_'),
        pn: inputs.pn,
        address: inputs.address,
        note: inputs.note,
        reserve: 0, //initial reserve set to 0, it will update each time this person buys something
        totalCost: 0, //initial cost 0
        totalReserve: 0 // initial all reserve 0
      },
    ];
    if (inputs.name.length > 3) customers = [...customers, ...customer];

    //check if the name already exists
    let seen = new Set();
    const hasDuplicates = customers.some(function (currentObject) {
      return seen.size === seen.add(currentObject.name).size;
    });

    const updatedUser = {
      email: inputs.email,
      admin_key: inputs.key,
      customers: customers,
    };
    !hasDuplicates && inputs.key.length===4 &&
      updateUser(user._id, updatedUser, dispatch).then((res) => {
        setError(res.request);
      });
    hasDuplicates &&
      setError({
        status: 500,
        responseText: "-A customer by this name already exists!-",
      });
  };

  return (
    <>
      <ErrorDisplay error={error} />

      <Title>Add a new customer:</Title>
      <br />
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          maxLength="20"
          placeholder="Name"
          value={inputs.name}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="pn"
          maxLength="11"
          placeholder="Mobile"
          value={inputs.pn}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="address"
          maxLength="20"
          placeholder="Address"
          value={inputs.address}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="note"
          maxLength="20"
          placeholder="Notes"
          value={inputs.note}
          onChange={handleChange}
        />
        <Input
          maxLength="4"
          minLength="4"
          type="number"
          name="key"
          placeholder="Admin Key"
          value={inputs?.key}
          onChange={handleChange}
          required
        />
        <Button>Add</Button>
      </Form>
    </>
  );
};

export default AddCustomer;
