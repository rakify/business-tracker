import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/apiCalls";

const Input = styled.input`
  margin-right: 5px;
  margin-bottom: 5px;
  width: fit-content;
  padding-left: 5px;
  text-transform: capitalize;
`;
const Button = styled.button`
  background-color: #132513;
  margin-right: 5px;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 250;
`;
const TR = styled.tr``;
const TD = styled.td`
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid black;
  &:last-child {
    background-color: #d7e5f1;
  }
`;

const RemoveCustomer = ({ c }) => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [key, setKey] = useState("");
  const [removeId, setRemoveId] = useState(c._id);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customers = [...user.customers];
    const pos = customers.findIndex((item) => item.name === c.name);
    customers.splice(pos, 1);
    const updatedUser = {
      email: user.email,
      admin_key: key,
      customers: customers,
    };
    key.length !== 4 && setError(true);
    c.reserve === 0 &&
      key.length === 4 &&
      updateUser(user._id, updatedUser, dispatch);
  };

  return (
    <>
      <TR>
        <TD>{c.name}</TD>
        <TD>{c.pn}</TD>
        <TD>{c.address}</TD>
        <TD>{c.note}</TD>
        <TD>
          {!error ? (
            <Input
              maxLength="4"
              minLength="4"
              type="number"
              name="key"
              placeholder="Admin Key"
              onChange={(e) => setKey(e.target.value)}
            />
          ) : (
            <Input
              style={{ border: "1px solid red" }}
              maxLength="4"
              minLength="4"
              type="number"
              name="key"
              placeholder="Admin Key"
              onChange={(e) => setKey(e.target.value)}
            />
          )}
          <Button onClick={handleSubmit}>Remove</Button>
          <Button onClick={() => setRemoveId(null)}>Cancel</Button>
        </TD>
      </TR>
    </>
  );
};

export default RemoveCustomer;
