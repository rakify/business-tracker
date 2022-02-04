import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Topbar from "../components/Topbar";
import AddCustomer from "../components/AddCustomer";
import EditCustomer from "../components/EditCustomer";
import RemoveCustomer from "../components/RemoveCustomer";

const Form = styled.form`
  display: flex;
  overflow-x: auto;
  gap: 15px;
  ${mobile({ flexDirection: "column" })}
`;
const TITLE = styled.div`
  font-weight: bolder;
  display: inline;
  font-size: 20px;
`;

const TABLE = styled.table`
  width: 100%;
`;

const TBODY = styled.tbody``;
const TR = styled.tr``;
const THEAD = styled.thead``;
const TH = styled.th`
  text-align: left;
  border-bottom: 2px solid black;
  padding: 10px;
  &:last-child {
    background-color: #d7e5f1;
  }
  background-color: #8aa18a;
  border-right: 1px solid white;
`;
const TD = styled.td`
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid black;
  &:last-child {
    background-color: #d7e5f1;
  }
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
      <TITLE>Customers</TITLE>
      <Form>
        <TABLE>
          <THEAD>
            <TR>
              <TH>Name</TH>
              <TH>Mobile</TH>
              <TH>Address</TH>
              <TH>Notes</TH>
              <TH>Control</TH>
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
                      <Button>
                        <Link
                          to={{ pathname: `/customer/${customer._name}` }}
                          style={{
                            textDecoration: "none",
                            color: "white",
                            cursor: "pointer",
                          }}
                        >
                         See Details
                        </Link>
                      </Button>
                      <Button onClick={(e) => handleEdit(e, customer)}>
                        Edit
                      </Button>
                      {customer.reserve === 0 && (
                        <Button onClick={(e) => handleRemove(e, customer)}>
                          Delete
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
      <br />
      <AddCustomer />
    </>
  );
};

export default Customers;
