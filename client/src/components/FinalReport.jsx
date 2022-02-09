import styled from "styled-components";
import { useSelector } from "react-redux";

const Container = styled.div``;
const TABLE = styled.table`
  margin-bottom: 2px;
  width: 100%;
  box-shadow: 1px 1px 1px 0.5px rgba(0, 0, 0, 0.75) inset;
  &:nth-child(even) {
    background-color: #c0d4e4;
  }
  background-color: #fbfcfd;
`;
const THEAD = styled.thead``;
const TBODY = styled.tbody``;
const TR = styled.tr`
  display: flex;
`;
const TH = styled.th`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: normal;
`;
const TD = styled.td`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FinalReport = () => {
  const entries = useSelector((state) => state.data.entries);
  const user = useSelector((state) => state.user.currentUser);

  const date = new Date().toLocaleString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  

  let totalSells = 0,
    totalDeposit = 0,
    todayTotalSells = 0,
    todayTotalDeposit = 0;

  // up until now total sells and deposit calculate
  for (let i = 0; i < user.customers.length; i++) {
    totalSells += user.customers[i].totalCost;
    totalDeposit += user.customers[i].totalReserve;
  }

  // todays calculation
  const todayEntries = entries.filter((item) => item.date === date);
  for (let i = 0; i < todayEntries.length; i++) {
    todayTotalSells += todayEntries[i].cost;
    todayTotalDeposit += todayEntries[i].reserve;
  }


  return (
    <Container>
      <TABLE>
        <THEAD>
          <TR>
            <TH>Todays Total Sells</TH>
            <TH>Total Deposit</TH>
            <TH>{totalSells - totalDeposit >= 0 ? "Due" : "Extra Ammount"}</TH>
          </TR>
        </THEAD>
        <TBODY>
          <TR>
            <TD>{todayTotalSells.toFixed(2)}</TD>
            <TD>{todayTotalDeposit.toFixed(2)}</TD>
            <TD>{Math.abs(todayTotalSells - todayTotalDeposit)}</TD>
          </TR>
        </TBODY>
      </TABLE>
      <br />
      <TABLE>
        <THEAD>
          <TR>
            <TH>So Far Total Sells</TH>
            <TH>Total Deposit</TH>
            <TH>
              {totalSells - totalDeposit >= 0
                ? "Total Due Ammount"
                : "Extra Ammount"}
            </TH>
          </TR>
        </THEAD>
        <TBODY>
          <TR>
            <TD>{totalSells.toFixed(2)}</TD>
            <TD>{totalDeposit.toFixed(2)}</TD>
            <TD>{Math.abs(totalSells - totalDeposit)}</TD>
          </TR>
        </TBODY>
      </TABLE>
      <br />
    </Container>
  );
};

export default FinalReport;
