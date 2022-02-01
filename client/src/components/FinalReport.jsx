import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateUser } from "../redux/apiCalls";

const Container = styled.div`
  flex: 1;
`;
const MAINTABLE = styled.table`
  margin-bottom: 1px;
  width: 100%;
  background-color: #a79ea2e6;
`;
const TABLE = styled.table`
  margin-bottom: 2px;
  width: 100%;
  box-shadow: 1px 1px 1px 0.5px rgba(0, 0, 0, 0.75) inset;
  &:nth-child(even) {
    background-color: #c0d4e4;
  }
  background-color: #fbfcfd;
`;
const CAPTION = styled.caption`
  font-weight: bolder;
  display: inline;
`;

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
const Input = styled.input`
  outline: none;
  font-size: 12px;
  width: 50px;
`;
const Button = styled.button`
  background-color: #7a0710;
  width: 35px;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 40%;
`;
const Info = styled.div`
  color: #059;
  background-color: #bef;
  margin: 10px 0;
  padding: 10px;
  border-radius: 3px 3px 3px 3px;
`;

const FinalReport = ({ admin }) => {
  const dispatch = useDispatch();
  const entries = useSelector((state) => state.data.entries);
  const user = useSelector((state) => state.user.currentUser);
  const [key, setKey] = useState("");
  const [info, setInfo] = useState("");

  let TotalMoney = 0,
    allSpent = 0,
    allReserved = 0;

  // set initialMoney per customer to 0
  let initialMoney = {};
  for (let i = 0; i < user.customers.length; i++) {
    initialMoney[user.customers[i]] = 0;
  }

  // set initialReserved per customer to 0
  let initialReserved = {};
  for (let i = 0; i < user.customers.length; i++) {
    initialReserved[user.customers[i]] = 0;
  }

  for (const i in entries) {
    const by = entries[i].by;
    initialReserved[by] += entries[i].reserved;
    TotalMoney += entries[i].total;
    allSpent += entries[i].spent;
    allReserved += entries[i].reserved;
    // for (let j = 0; j < user.customers.length; j++) {
    //   initialMoney[user.customers[j]] += entries[i].meals[user.customers[j]];
    //   if (isNaN(initialMeals[user.customers[j]]))
    //     initialMeals[user.customers[j]] = 0;
    // }
  }
//   let mealRate = allSpent / TotalMoney;

//   const deleteMember = (id) => {
//     let members = [...user.members];
//     members.splice(id, 1);
//     updateUser(user._id, { members: members, admin_key: key }, dispatch);
//   };

  return (
    <Container>
      {info && <Info>{info}</Info>}
      <MAINTABLE>
        <CAPTION>Final Calculation</CAPTION>
        <TBODY>
          <TR>
            <TH>Total Meals</TH>
            <TH>Total Spent</TH>
            <TH>Total Reserve</TH>
            <TH>Remaining</TH>
            {/* <TH>Meal Rate</TH> */}
          </TR>
        </TBODY>
        <TBODY>
          <TR>
            <TD>{TotalMoney}</TD>
            <TD>{allSpent.toFixed(2)}</TD>
            <TD>{allReserved.toFixed(2)}</TD>
            <TD>{(allReserved - allSpent).toFixed(2)}</TD>
            {/* <TD>{isNaN(mealRate)?"0.00":mealRate.toFixed(2)}</TD> */}
          </TR>
        </TBODY>
      </MAINTABLE>
      <br />
      {/* {user.members.map((i, j) => (
        <TABLE key={j}>
          <CAPTION>{i}</CAPTION>
          <TBODY>
            <TR>
              <TH>Meals</TH>
              <TH>Reserved</TH>
              <TH>Due(-) | Extra(+)</TH>
              {admin && <TH>Actions</TH>}
            </TR>
          </TBODY>
          <TBODY>
            <TR>
              <TD>{initialMeals[i]}</TD>
              <TD>{initialReserved[i].toFixed(2)}</TD>
              <TD>
                {isNaN(initialReserved[i] - initialMeals[i] * mealRate)?"0.00":(initialReserved[i] - initialMeals[i] * mealRate).toFixed(2)}
              </TD>
              {admin && initialMeals[i] === 0 && initialReserved[i] === 0 ? (
                <TD>
                  <Input
                    type="number"
                    name="key"
                    minLength="4"
                    maxLength="4"
                    value={key}
                    placeholder="Key"
                    required
                    onChange={(e) => setKey(e.target.value)}
                  />
                  <Button onClick={(e) => deleteMember(j)}>✘</Button>
                </TD>
              ) : (
                admin && (
                  <TD>
                    <Button
                      onClick={() =>
                        setInfo(
                          `You Can't Do Anything With This Member Right Now Since S/He Has Contributed To This Month.`
                        )
                      }
                    >
                      VIP
                    </Button>
                  </TD>
                )
              )}
            </TR>
          </TBODY>
        </TABLE>
      ))} */}
    </Container>
  );
};

export default FinalReport;
