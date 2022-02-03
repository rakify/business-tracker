import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import styled from "styled-components";
import Topbar from "./Topbar";

const Title = styled.div`
  padding: 10px;
  font-weight: bolder;
  width: fit-content;
  background: lightblue;
`;
const P = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const Menu = styled.div`
  display: flex;
`;
const Left = styled.div`
  flex: 2;
`;
const Right = styled.div`
  flex: 8;
  margin-left: 5px;
`;
const TABLE = styled.table`
  width: 100%;
`;
const THEAD = styled.thead``;
const TBODY = styled.tbody``;
const TR = styled.tr``;
const TH = styled.th`
  padding: 10px;
  background: black;
  color: white;
  border: 1px solid white;
`;
const TD = styled.td`
  padding: 10px;
  border: 1px solid black;
`;

const Customer = () => {
  const user = useSelector((state) => state.user.currentUser);
  const entries = useSelector((state) => state.data.entries);
  const customerName = useLocation().pathname.substring(10);
  const customerIndex = user.customers.findIndex(
    (item) => item._name === customerName
  );
  const customer = user.customers[customerIndex];

  const filteredEntries = entries.filter((item) => item.by === customer.name);

  return (
    <>
      <Topbar />
      <h1>{customer.name}</h1>
      <Menu>
        <Left>
          <Title>Basic Info</Title>
          <P>
            <li>Name: </li>
            <b>{customer.name || "[Empty]"}</b>
          </P>
          <P>
            <li>Address: </li>
            <b>{customer.address || "[Empty]"}</b>
          </P>
          <P>
            <li>Mobile: </li>
            <b>{customer.pn || "[Empty]"}</b>
          </P>
          <P>
            <li>Note: </li>
            <b>{customer.note || "[Empty]"}</b>
          </P>
          <P>
            <li>Total Purchase: </li>
            <b>{customer.totalCost}৳</b>
          </P>
          <P>
            <li>Total Submit: </li>
            <b>{customer.totalReserve}৳</b>
          </P>
          <P>
            <li>
              {customer.reserve < 0 ? "Unpaid Amount:" : "Extra Ammount:"}
            </li>
            <b>{Math.abs(customer.reserve)}৳</b>
          </P>
        </Left>
        <Right>
          <Title>All Purchases</Title>
          <br />
          {filteredEntries.length === 0 ? (
            <b>This customer has no past purchases.</b>
          ) : (
            <TABLE>
              <THEAD>
                <TR>
                  <TH>Date</TH>
                  <TH>Cost</TH>
                  <TH>Reserve</TH>
                </TR>
              </THEAD>
              <TBODY>
                {filteredEntries.map((item, i) => (
                  <TR key={item._id}>
                    <TD>{i + 1 + ". " + item.date}</TD>
                    <TD>{item.cost.toFixed(2)}</TD>
                    <TD>{item.reserve.toFixed(2)}</TD>
                  </TR>
                ))}
              </TBODY>
            </TABLE>
          )}
        </Right>
      </Menu>
    </>
  );
};

export default Customer;
