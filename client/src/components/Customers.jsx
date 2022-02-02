import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Topbar from "./Topbar";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import RemoveCustomer from "./RemoveCustomer";

const Form = styled.form`
  display: flex;
  gap: 15px;
  ${mobile({ flexDirection: "column" })}
`;

const TABLE = styled.table`
  width: 100%;
`;

const TBODY = styled.tbody`
  &:nth-child(even) {
    background-color: #d7e5f1;
  }
  background-color: #e5ecf0;
`;
const TR = styled.tr`
  display: flex;
`;
const THEAD = styled.thead``;
const TH = styled.th`
  flex: 1;
  text-align: left;
  border-bottom: 1px solid black;
  padding: 10px;
  background-color: #8aa18a;
  border-right: 1px solid white;
`;
const TD = styled.td`
  flex: 1;
  text-align: left;
  padding: 10px;
  border-right: 1px solid white;
`;
const Button = styled.button`
  background-color: #132513;
  margin-right: 5px;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 250;
`;

const Customers = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [customers, setCustomers] = useState(user.customers);
  const [editId, setEditId] = useState("");
  const [removeId, setRemoveId] = useState("");

  useEffect(() => {
    setCustomers(user.customers);
  }, [user.customers]);

  const handleEdit = (e, customer) => {
    e.preventDefault();
    setEditId(customer._id);
    setRemoveId("");
  };
  const handleRemove = (e, customer) => {
    e.preventDefault();
    setRemoveId(customer._id);
    setEditId("");
  };

  return (
    <>
      <Topbar />
      <Form>
        <TABLE>
          <THEAD>
            <TR>
              <TH>Name</TH>
              <TH>Mobile</TH>
              <TH>Address</TH>
              <TH>Notes</TH>
              <TH>Actions</TH>
            </TR>
          </THEAD>
          <TBODY>
            {customers.map((customer) => (
              <React.Fragment key={customer._id}>
                {editId === customer._id ? (
                  <EditCustomer c={customer} />
                ) : removeId === customer._id ? (
                  <RemoveCustomer c={customer} />
                ) : (
                  <TR>
                    <TD>{customer.name}</TD>
                    <TD>{customer.pn}</TD>
                    <TD>{customer.address}</TD>
                    <TD>{customer.note}</TD>
                    <TD>
                      <Button onClick={(e) => handleEdit(e, customer)}>
                        Edit
                      </Button>
                      {customer.reserve === 0 && (
                        <Button
                          onClick={(e) => handleRemove(e, customer)}
                        >
                          Remove
                        </Button>
                      )}
                    </TD>
                  </TR>
                )}
              </React.Fragment>
            ))}
          </TBODY>
        </TABLE>
      </Form>

      <AddCustomer />
    </>
  );
};

export default Customers;
