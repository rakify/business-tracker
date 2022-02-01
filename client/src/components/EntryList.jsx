import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  overflow-x: auto;
`;
const TABLE = styled.table`
  border: 1px solid green;
  width: 100%;
`;
const CAPTION = styled.caption`
  font-weight: bolder;
  display: inline;
  font-size: 20px;
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
  cursor: pointer;
`;

export default function EntryList(props) {
  const entries = useSelector((state) => state.data.entries);
  
  return (
    <>
      <Container>
        <TABLE>
          <CAPTION>{props.month} Report</CAPTION>
          {entries.length === 0 ? (
            <>
              <h3>As empty as a politician's promises. ツ</h3>
              <h4>Lets start updating data by clicking on your username.</h4>
            </>
          ) : (
            <>
              <TBODY>
                <TR>
                  <TH>Date</TH>
                  <TH>Cost</TH>
                  <TH>Reserve</TH>
                  <TH>Customer</TH>
                </TR>
              </TBODY>
              {entries.length > 0 &&
                entries.map((item) => (
                  <TBODY key={item._id}>
                    <TR>
                      <TD>{item.date}</TD>
                      <TD>{item.cost.toFixed(2)}</TD>
                      <TD>{item.reserve.toFixed(2)}</TD>
                      <TD>{item.by}</TD>
                    </TR>
                  </TBODY>
                ))}
            </>
          )}
        </TABLE>
      </Container>
      {!props.admin && (
        <Link
          to={{ pathname: `/${props.prevYear}/${props.prevMonthId}` }}
          style={{ textDecoration: "none" }}
        >
          ❮ {props.prevMonth}, {props.prevYear} Report
        </Link>
      )}
    </>
  );
}
