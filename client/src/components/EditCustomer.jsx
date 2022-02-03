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

const EditCustomer = ({ c }) => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(c._id);

  const [customer, setCustomer] = useState({
    email: user.email,
    key: "",
    name: c.name || "",
    pn: c.pn || "",
    address: c.address || "",
    note: c.note || "",
    reserve: c.reserve || 0,
    totalCost: c.totalCost || 0,
    totalReserve: c.totalReserve || 0,
  });

  const handleChange = (e) => {
    e.preventDefault();
    setCustomer((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customers = [...user.customers];
    const newCustomer = {
      name: customer.name
        .replace(/\s+/g, " ") //replace multiple space with single space
        .toLowerCase()
        .replace(/(^\w{1})|(\s{1}\w{1})/g, (match) => match.toUpperCase()), //make each word first letter uppercase
      _name: customer.name.toLowerCase().replace(/\s+/g, "_"), //replace space with _
      pn: customer.pn,
      address: customer.address,
      note: customer.note,
      reserve: customer.reserve,
      totalCost: customer.totalCost,
      totalReserve: customer.totalReserve,
    };
    const customerIndex = customers.findIndex((item) => item.name === c.name);
    customers[customerIndex] = newCustomer;
    const updatedUser = {
      email: customer.email,
      admin_key: customer.key,
      customers: customers,
    };
    //check if the name already exists
    let seen = new Set();
    const hasDuplicates = customers.some(function (currentObject) {
      return seen.size === seen.add(currentObject.name).size;
    });
    //
    hasDuplicates && setError("name");
    //
    !hasDuplicates && customer.key.length !== 4 && setError("key");
    //
    !hasDuplicates &&
      customer.key.length === 4 &&
      updateUser(user._id, updatedUser, dispatch).then(
        (res) => res.request.status === 401 && setError("key")
      );
  };

  return (
    <>
      <TR>
        <TD>
          {error === "name" ? (
            <>
              <Input
                style={{ border: "1px solid red" }}
                type="text"
                name="name"
                maxLength="20"
                placeholder="Name"
                value={customer.name}
                onChange={handleChange}
                required
              />
              <br />
              <i>*this name exists</i>
            </>
          ) : (
            <Input
              type="text"
              name="name"
              maxLength="20"
              placeholder="Name"
              value={customer.name}
              onChange={handleChange}
              required
            />
          )}
        </TD>
        <TD>
          <Input
            type="text"
            name="pn"
            maxLength="11"
            placeholder="Mobile"
            value={customer.pn}
            onChange={handleChange}
          />
        </TD>
        <TD>
          <Input
            type="text"
            name="address"
            maxLength="20"
            placeholder="Address"
            value={customer.address}
            onChange={handleChange}
          />
        </TD>
        <TD>
          <Input
            type="text"
            name="note"
            maxLength="20"
            placeholder="Notes"
            value={customer.note}
            onChange={handleChange}
          />
        </TD>
        <TD>
          {error !== "key" ? (
            <Input
              maxLength="4"
              minLength="4"
              type="number"
              name="key"
              placeholder="Admin Key"
              onChange={handleChange}
            />
          ) : (
              <Input
                style={{ border: "1px solid red" }}
                maxLength="4"
                minLength="4"
                type="number"
                name="key"
                placeholder="Admin Key"
                onChange={handleChange}
              />
          )}
          <Button onClick={handleSubmit}>Update</Button>
          <Button onClick={(e) => setEditId(null)}>Cancel</Button>
        </TD>
      </TR>
    </>
  );
};

export default EditCustomer;
