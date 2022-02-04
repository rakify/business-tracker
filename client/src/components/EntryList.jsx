import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { deleteEntry, updateUser } from "../redux/apiCalls";
import ErrorDisplay from "./ErrorDisplay";

const Container = styled.div`
  display: flex;
  overflow-x: auto;
  background: #63aa9c;
`;
const TOP = styled.div`
  display: flex;
  justify-content: space-between;
`;
const TABLE = styled.table`
  width: 100%;
`;
const TITLE = styled.div`
  font-weight: bolder;
  display: inline;
  font-size: 20px;
`;
const THEAD = styled.thead``;
const TBODY = styled.tbody``;
const TR = styled.tr``;
const TH = styled.th`
  text-align: left;
  border-bottom: 1px solid black;
  padding: 10px;
  &:last-child {
    background-color: #d7e5f1;
  }
  background-color: #b2cecf;
  border-right: 1px solid white;
`;
const TD = styled.td`
  &:last-child {
    background-color: #d7e5f1;
  }
  background-color: #e5ecf0;
  text-align: left;
  padding: 10px;
  border-right: 1px solid white;
`;
const Input = styled.input`
  outline: none;
  width: fit-content;
  margin-bottom: 2px;
`;

const Button = styled.button`
  background-color: darkgray;
  margin-right: 5px;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 250;
`;

export default function EntryList() {
  const user = useSelector((state) => state.user.currentUser);
  const entries = useSelector((state) => state.data.entries);
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [key, setKey] = useState("");
  const [removeId, setRemoveId] = useState("");

  const date = new Date().toLocaleString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleRemove = (entry) => {
    key.length === 4 &&
      deleteEntry(removeId, key, dispatch).then((res) => {
        setError(res.request);
        //update customer also
        const customers = [...user.customers];
        const customerIndex = customers.findIndex(
          (item) => item.name === entry.by
        );
        const customer = customers[customerIndex];
        const newCustomer = {
          name: customer.name,
          _name: customer._name,
          pn: customer.pn,
          address: customer.address,
          note: customer.note,
          reserve: customer.reserve - entry.finalReserve,
          totalCost: customer.totalCost - entry.cost,
          totalReserve: customer.totalReserve - entry.reserve,
        };
        customers[customerIndex] = newCustomer;
        const updatedUser = {
          email: customer.email,
          admin_key: key,
          customers: customers,
        };
        updateUser(user._id, updatedUser, dispatch);
      });
  };

  const filteredEntries = entries.filter((item) =>
    searchTerm === ""
      ? item
      : item.by
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase() ||
              item.date.toLowerCase().includes(searchTerm.toLowerCase())
          )
      ? item
      : ""
  );

  return (
    <>
      <TOP>
        {error && <ErrorDisplay error={error} />}
        <TITLE>All Report</TITLE>
        {filteredEntries.length > 0 && (
          <Input
            type="text"
            name="searchTerm"
            placeholder="Filter by Date/Customer"
            onChange={(e) => setSearchTerm(e.target.value)}
          ></Input>
        )}
      </TOP>
      {filteredEntries.length === 0 && (
        <>
          <h3>As empty as a politician's promises. ツ</h3>
          <h4>Lets start updating data by clicking on your username.</h4>
        </>
      )}
      <Container>
        {filteredEntries.length > 0 && (
          <TABLE>
            <THEAD>
              <TR>
                <TH>No.</TH>
                <TH>Date</TH>
                <TH>Cost(৳)</TH>
                <TH>Deposit(৳)</TH>
                <TH>Customer</TH>
                <TH>Control</TH>
              </TR>
            </THEAD>
            <TBODY>
              {filteredEntries.length > 0 &&
                filteredEntries.map((item, i) => (
                  <TR key={item._id}>
                    <TD>{item.entryNo}</TD>
                    <TD>{item.date}</TD>
                    <TD>{item.cost.toFixed(2)}</TD>
                    <TD>{item.reserve.toFixed(2)}</TD>
                    <TD>{item.by}</TD>
                    <TD>
                      {removeId !== item._id && (
                        <Button>
                          <Link
                            to={{ pathname: `/entries/${item._id}` }}
                            style={{ textDecoration: "none", color: "white" }}
                          >
                            Print
                          </Link>
                        </Button>
                      )}
                      {removeId === item._id ? (
                        <>
                          <Input
                            type="text"
                            placeholder="Key"
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                          />
                          <br />
                          <Button
                            style={{ color: "red" }}
                            onClick={() => handleRemove(item)}
                          >
                            Delete
                          </Button>
                          <Button onClick={() => setRemoveId(null)}>
                            Cancel
                          </Button>
                        </>
                      ) : date === item.date ? (
                        <Button
                          style={{ color: "red" }}
                          onClick={() => setRemoveId(item._id)}
                        >
                          Delete
                        </Button>
                      ) : (
                        ""
                      )}
                    </TD>
                  </TR>
                ))}
            </TBODY>
          </TABLE>
        )}
      </Container>
    </>
  );
}
