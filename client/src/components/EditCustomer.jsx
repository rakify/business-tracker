import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/apiCalls";

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

const EditCustomer = ({ c }) => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [editId, setEditId] = useState(c._id);

  const [customer, setCustomer] = useState({
    email: user.email,
    key: "",
    name: c.name || "",
    pn: c.pn || "",
    address: c.address || "",
    note: c.note || "",
    reserve: c.reserve || 0,
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
      name: customer.name,
      pn: customer.pn,
      address: customer.address,
      note: customer.note,
      reserve: customer.reserve
    };
    const pos = customers.findIndex((item) => item.name === c.name);
    customers[pos] = newCustomer;
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

    !hasDuplicates && updateUser(user._id, updatedUser, dispatch);
    hasDuplicates && setError(true);
  };

  return (
    <>
      <TR>
        <TD>
          {error ? (
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
          <Input
            style={{ display: "flex" }}
            maxLength="4"
            minLength="4"
            type="number"
            name="key"
            placeholder="Admin Key"
            onChange={handleChange}
          />
          <Button onClick={handleSubmit}>Update</Button>
          <Button onClick={(e) => setEditId(null)}>Cancel</Button>
        </TD>
      </TR>
    </>
  );
};

export default EditCustomer;
