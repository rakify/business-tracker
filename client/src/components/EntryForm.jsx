import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { addEntry, updateUser } from "../redux/apiCalls";
import { useState, useEffect } from "react";
import KeyModal from "./KeyModal";
import ErrorDisplay from "./ErrorDisplay";

const Form = styled.form`
  flex: 1;
`;

const Title = styled.div`
  color: #20ad4ae8;
  font-weight: bolder;
  font-size: 20px;
  background-color: ghostwhite;
`;
const Top = styled.div`
  display: flex;
`;
const InputTitle = styled.div`
  color: black;
  font-weight: bolder;
  margin-right: 3px;
`;

const TABLE = styled.table`
  margin-bottom: 2px;
  width: 100%;
  background-color: #fbfcfd;
`;

const TBODY = styled.tbody`
  width: 100%;
`;
const THEAD = styled.thead`
  width: 100%;
`;
const TR = styled.tr`
  display: flex;
`;
const TH = styled.th`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: bold;
`;
const TD = styled.td`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
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
const Select = styled.select`
  margin: 3px 3px 3px 0;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
`;
const Button = styled.button`
  background-color: #066d47a4;
  width: 70px;
  border: none;
  color: white;
  padding: 2px;
  cursor: pointer;
  border-radius: 12px;
`;
const ButtonOnLoad = styled.button`
  background-color: #04aa6d;
  width: 100px;
  border: none;
  color: white;
  padding: 5px;
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BottomLeft = styled.div`
  flex: 1;
`;
const BottomRight = styled.div`
  flex: 1;
`;

const ForgotClick = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
`;

const EntryForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const date = new Date().toLocaleString('en-us', {  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'  })
  const [inputs, setInputs] = useState({
    user: user.username,
    date: date,
    cost: 0, // todays total cost
    previousReserve: 0, // previous date final reserved
    reserve: 0, // todays reserve
    finalReserve: 0, // (previousReserve-cost)+reserve
    by: "", //buyer
    admin_key: "",
  });
  const [pos, setPos] = useState();
  const [prompt, setPrompt] = useState(false);
  const [error, setError] = useState(); // after submitting show result
  const [loading, setLoading] = useState(false); // after submitting show loading animation

  //set initialQuantity per product as 0
  let initialQuantity = {};
  for (let i = 0; i < user.products.length; i++) {
    initialQuantity[user.products[i].name] = 0;
  }

  const [quantity, setQuantity] = useState({ ...initialQuantity });
  const [subtotal, setSubtotal] = useState({ ...initialQuantity });

  //handle string value
  const handleSelectChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //handle number values
  const handleChange = (e) => {
    //if client forgets to put any number greater then 0 set it auto as 0
    isNaN(e.target.valueAsNumber) &&
      setInputs((prev) => ({
        ...prev,
        [e.target.name]: 0,
      }));
    !isNaN(e.target.valueAsNumber) &&
      setInputs((prev) => ({
        ...prev,
        [e.target.name]: e.target.valueAsNumber,
      }));
  };

  //control when inputs.by changes and update previousReserve instantly
  useEffect(() => {
    const pos = user.customers.findIndex((item) => item.name === inputs.by);
    pos !== -1 && setPos(pos);
    const customer = user.customers[pos];
    customer &&
      setInputs((prev) => ({ ...prev, previousReserve: customer.reserve }));
  }, [inputs.by, user.customers]);

  //check item and subtotal changes and update total cost value
  useEffect(() => {
    let total = 0;
    for (let item in subtotal) {
      total += subtotal[item];
    }
    setInputs((prev) => ({ ...prev, cost: total }));
  }, [subtotal]);

  //with cost, previous reserve and todays reserve, update final reserved
  useEffect(() => {
    let totalCost = inputs.previousReserve - inputs.cost;
    let finalReserve = totalCost + inputs.reserve;
    setInputs((prev) => ({ ...prev, finalReserve: finalReserve }));
  }, [inputs.cost, inputs.previousReserve, inputs.reserve]);

  // Handle change in quantity and also update subtotal
  const handleQuantity = (e, price) => {
    let value = 0;
    if (e.target.value !== "") value = e.target.value;
    setSubtotal((prev) => {
      return { ...prev, [e.target.name]: value * price };
    });
    setQuantity((prev) => {
      return { ...prev, [e.target.name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const products = user.products;
    setLoading(true);
    //setup for updating customer reserve
    const customers = [...user.customers];
    const customer = customers[pos];
    const newCustomer = {
      name: customer?.name,
      _name: customer._name,
      pn: customer?.pn,
      address: customer?.address,
      note: customer?.note,
      reserve: inputs?.finalReserve,
      totalCost: inputs.cost+customer.totalCost,
      totalReserve: inputs.reserve+customer.totalReserve,
    };
    customers[pos] = newCustomer;
    const updatedUser = {
      email: customer?.email,
      admin_key: inputs?.admin_key,
      customers: customers,
    };
    //add new entry
    addEntry({ ...inputs, products, quantity, subtotal }, dispatch).then(
      (res) => {
        res.status === 200 && updateUser(user._id, updatedUser, dispatch);
        setError(res.request);
        setLoading(false);
      }
    );
  };

  return (
    <>
      {/* Reset Key Modal */}
      {prompt && <KeyModal id={user._id} />}
      {/* If Error Fetched By Server */}
      {error && <ErrorDisplay error={error} />}
      
      {/* Admin Form */}
      <Form onSubmit={handleSubmit}>
        {/* Start Form Inputs */}
        <Title>Submit Todays Entry</Title>
        <br />
        <Top>
          <InputTitle>
            Select Customer:
            <Select
              name="by"
              value={inputs.by}
              onChange={handleSelectChange}
              required
            >
              <option value="" disabled>
                Select
              </option>
              {user.customers.map((i) => (
                <option value={i.name} key={i._id}>
                  {i.name}
                </option>
              ))}
            </Select>
          </InputTitle>
        </Top>
        {/* Add Products */}
        <TABLE style={{ border: "1px solid green" }}>
          <caption>
            <h3>Select Products</h3>
          </caption>
          <THEAD>
            <TR>
              <TH>Name</TH>
              <TH>Unit Price(৳)</TH>
              <TH>Quantity</TH>
              <TH>Subtotal(৳)</TH>
            </TR>
          </THEAD>
          {user.products.map((i) => (
            <TBODY key={i._id}>
              <TR>
                <TD>{i.name}</TD>
                <TD>{i.price.toFixed(2)}</TD>
                <TD>
                  {
                    <Input
                      style={{ fontSize: "12px", width: "70px" }}
                      type="number"
                      placeholder="0"
                      min="0"
                      name={i.name}
                      onChange={(e) => {
                        handleQuantity(e, i.price);
                      }}
                    />
                  }
                </TD>
                <TD>{subtotal[i.name].toFixed(2)}</TD>
              </TR>
            </TBODY>
          ))}
        </TABLE>
        <Bottom>
          <BottomLeft>
            <InputTitle>Current Cost: {inputs.cost}৳</InputTitle>
            {inputs.by &&
              inputs.previousReserve !== 0 &&
              (inputs.previousReserve > 0 ? (
                <InputTitle style={{ color: "green" }}>
                  Previous Reserve: {inputs.previousReserve}৳
                </InputTitle>
              ) : (
                <InputTitle style={{ color: "red" }}>
                  Previous Due: {Math.abs(inputs.previousReserve)}৳
                </InputTitle>
              ))}
          </BottomLeft>
          <BottomRight>
            <InputTitle>
              Current Reserve:
              <Input
                style={{ width: "80px", margin: "3px" }}
                type="number"
                name="reserve"
                placeholder="0৳"
                min="0"
                onChange={handleChange}
              />
            </InputTitle>
            <InputTitle>
              {inputs.finalReserve >= 0
                ? `Final Reserve:
                ${inputs.finalReserve}৳`
                : `Final Due:${Math.abs(inputs.finalReserve)}৳`}
            </InputTitle>
          </BottomRight>
        </Bottom>
        <br />
        <InputTitle>
          Manager Key:
          <Input
            style={{ fontSize: "12px", width: "70px" }}
            type="number"
            placeholder="0000"
            name="admin_key"
            onChange={handleChange}
            required
          />
        </InputTitle>
        <br />
        {/* If Button is Loading */}
        {loading && (
          <ButtonOnLoad disabled>
            <i className="fa fa-spinner fa-spin"></i> Submitting
          </ButtonOnLoad>
        )}
        {/* Normal Button */}
        {!loading && <Button>Submit</Button>}
      </Form>
      <br />
      Can't remember manager key (
      <ForgotClick onClick={() => setPrompt(true)}>?</ForgotClick>)
    </>
  );
};

export default EntryForm;
