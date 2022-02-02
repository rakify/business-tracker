import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";

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
const TR = styled.tr`
  display: flex;
`;
const TH = styled.th`
  flex: 1;
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
  flex: 1;
  text-align: left;
  padding: 10px;
  border-right: 1px solid white;
`;
const Input = styled.input`
  outline: none;
  width: 200px;
  height: 25px;
  padding: 9px;
  margin: 3px 3px 3px 3px;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: darkgray;
  margin-right: 5px;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 250;
`;

export default function EntryList(props) {
  const entries = useSelector((state) => state.data.entries);
  const [searchTerm, setSearchTerm] = useState("");

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
        <TITLE>{props.month} Report</TITLE>
        {filteredEntries.length > 0 && (
          <Input
            type="text"
            name="searchTerm"
            placeholder="Filter by Date/Customer"
            onChange={(e) => setSearchTerm(e.target.value)}
          ></Input>
        )}
      </TOP>
      <Container>
        {filteredEntries.length === 0 ? (
          <>
            <h3>As empty as a politician's promises. ツ</h3>
            <h4>Lets start updating data by clicking on your username.</h4>
          </>
        ) : (
          <TABLE>
            <THEAD>
              <TR>
                <TH>Date</TH>
                <TH>Cost(৳)</TH>
                <TH>Reserve(৳)</TH>
                <TH>Customer</TH>
                <TH>Actions</TH>
              </TR>
            </THEAD>
            <TBODY>
              {filteredEntries.length > 0 &&
                filteredEntries.map((item, i) => (
                  <TR key={item._id}>
                    <TD>{filteredEntries.length - i + ". " + item.date}</TD>
                    <TD>{item.cost.toFixed(2)}</TD>
                    <TD>{item.reserve.toFixed(2)}</TD>
                    <TD>{item.by}</TD>
                    <TD>
                      <Button>
                        <Link
                          to={{ pathname: `/entries/${item._id}` }}
                          style={{ textDecoration: "none", color: "white" }}
                        >
                          Print
                        </Link>
                      </Button>
                      <Button style={{ color: "red" }}>Remove</Button>
                    </TD>
                  </TR>
                ))}
            </TBODY>
          </TABLE>
        )}
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
