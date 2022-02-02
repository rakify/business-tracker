import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import styled from "styled-components";

const FifthLine = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;
const TABLE = styled.table`
  width: 100%;
`;
const TBODY = styled.tbody``;
const TFOOT = styled.tfoot``;
const TR = styled.tr`
  display: flex;
`;
const TH = styled.th`
  flex: 1;
  font-weight: bolder;
  padding: 10px;
  background: black;
  color:white;
  -webkit-print-color-adjust: exact !important; 
  border: 1px solid white;
`;
const TD = styled.td`
  flex: 1;
  padding: 10px;
  border: 1px solid black;
`;
const TD2 = styled.td`
  flex: 1;
  padding: 10px;
`;

const EntryDetails = () => {
  const user = useSelector((state) => state.user.currentUser);
  const entries = useSelector((state) => state.data.entries);
  const entryId = useLocation().pathname.substring(9);
  const entryIndex = entries.findIndex((item) => item._id === entryId);
  const entry = entries[entryIndex];
  const byIndex = user.customers.findIndex((item) => item.name === entry.by);
  const by = user.customers[byIndex];
  console.log(entry);
  return (
    <>
      <h1 style={{ textAlign: "center" }}>
        {user.shopName
          ? user.shopName
          : "Please Add Your Shop Name from Settings"}
      </h1>
      {user.shopAddress && (
        <p style={{ textAlign: "center", fontWeight: "bold" }}>
          {user.shopAddress}
        </p>
      )}
      {user.shopDetails && (
        <p style={{ textAlign: "center" }}>{user.shopDetails}</p>
      )}
      {(user.shopOfficePn || user.shopOtherPn) && (
        <p style={{ textAlign: "center" }}>
          {user.shopOfficePn && `Office: ${user.shopOfficePn}`}{" "}
          {user.shopOfficePn && `Mobile: ${user.shopOtherPn}`}
        </p>
      )}
      <FifthLine>
        <p>Entry No.: {entries.length - entryIndex}</p>
        <p>Date: {entry.date.substring(entry.date.indexOf(",") + 1)}</p>
        <p>Day: {entry.date.substring(0, entry.date.indexOf(","))}</p>
      </FifthLine>
      <p>
        Name: <u>{entry.by}</u>
      </p>
      <p>
        Address: <u>{by.address}</u>
      </p>

      <TABLE>
        <TBODY>
          <TR>
            <TH>Name</TH>
            <TH>Price</TH>
            <TH>Quantity</TH>
            <TH>Subtotal</TH>
          </TR>
        </TBODY>
        <TBODY>
          {entry.products.map((item) => (
            <TR>
              <TD>{item.name}</TD>
              <TD>{item.price}</TD>
              <TD>{entry.quantity[`${item.name}`]}</TD>
              <TD>{entry.subtotal[`${item.name}`]}</TD>
            </TR>
          ))}
        </TBODY>
        <TFOOT>
          <TR>
            <TD2></TD2>
            <TD2></TD2>
            <TD>Total:</TD>
            <TD>{entry.cost}</TD>
          </TR>
          <TR>
            <TD2></TD2>
            <TD2></TD2>
            <TD>
              {entry.previousReserve < 0
                ? `Previous Due:`
                : `Previous Deposit:`}
            </TD>
            <TD>
              {entry.previousReserve < 0
                ? Math.abs(entry.previousReserve)
                : entry.previousReserve}
            </TD>
          </TR>
          <TR>
            <TD2></TD2>
            <TD2></TD2>
            <TD>Today Deposit:</TD>
            <TD>{entry.reserve}</TD>
          </TR>
          <TR>
            <TD2></TD2>
            <TD2></TD2>
            <TD> {entry.finalReserve < 0 ? `Due Left:` : `Reserve Left:`}</TD>
            <TD>
              {entry.finalReserve < 0
                ? Math.abs(entry.finalReserve)
                : entry.finalReserve}
            </TD>
          </TR>
        </TFOOT>
      </TABLE>
    </>
  );
};

export default EntryDetails;
