import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEntryByCustomer, updateUser } from "../redux/apiCalls";

const Input = styled.input`
  margin-right: 5px;
  margin-bottom: 5px;
  max-width: 200px;
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
const TR = styled.tr`
  display: flex;
`;
const TD = styled.td`
  flex: 1;
  text-align: left;
  padding: 10px;
  border-right: 1px solid white;
`;

const RemoveCustomer = ({ c }) => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [key, setKey] = useState();
  const [removeId, setRemoveId] = useState(c._id);

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
    c.reserve === 0 && updateUser(user._id, updatedUser, dispatch).then((res) => {
      res.status===200 && deleteEntryByCustomer(c.name,key);
      setError(res.request);
    });
  };

  return (
    <>
      <TR>
        <TD>{c.name}</TD>
        <TD>{c.pn}</TD>
        <TD>{c.address}</TD>
        <TD>{c.note}</TD>
        <TD>
          <Input
            style={{ display: "flex" }}
            maxLength="4"
            minLength="4"
            type="number"
            name="key"
            placeholder="Admin Key"
            onChange={(e) => setKey(e.target.value)}
          />
          <Button onClick={handleSubmit}>Remove</Button>
          <Button onClick={(e) => setRemoveId(null)}>Cancel</Button>
        </TD>
      </TR>
    </>
  );
};

export default RemoveCustomer;
