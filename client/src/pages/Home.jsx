import { useSelector, useDispatch } from "react-redux";
import { getEntry, getUser } from "../redux/apiCalls";
import { useEffect } from "react";
import { useParams } from "react-router";
import Topbar from "../components/Topbar";
import EntryList from "../components/EntryList";
import UpdateUser from "../components/UpdateUser";

const Admin = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const p = useParams();

  const Month = [];
  Month[0] = "January";
  Month[1] = "February";
  Month[2] = "March";
  Month[3] = "April";
  Month[4] = "May";
  Month[5] = "June";
  Month[6] = "July";
  Month[7] = "August";
  Month[8] = "September";
  Month[9] = "October";
  Month[10] = "November";
  Month[11] = "December";
  const d = new Date();
  let monthId = p.monthId ? p.monthId : d.getMonth();
  let month = Month[monthId];
  let year = p.year ? p.year : d.getFullYear();
  let prevMonthId, prevMonth, prevYear;

  if (monthId === "0") {
    prevMonthId = 11;
    prevYear = year - 1;
    prevMonth = "December";
  } else {
    prevMonthId = monthId - 1;
    prevMonth = Month[prevMonthId];
    prevYear = year;
  }

  //fetch api changes
  useEffect(() => {
    getEntry(user.username, monthId, year, dispatch);
  }, [user, dispatch, monthId, year]);
  
  useEffect(() => {
    getUser(user.username, dispatch);
  }, [user, dispatch]);

  return (
    <>
      <Topbar />
      {user.customers.length === 0 && <UpdateUser />}
      {user.customers.length > 0 && (
        <>
          <EntryList
            month={month}
            prevMonth={prevMonth}
            prevMonthId={prevMonthId}
            prevYear={prevYear}
          />
        </>
      )}
    </>
  );
};

export default Admin;
