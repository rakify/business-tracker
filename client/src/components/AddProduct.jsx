import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/apiCalls";
import ErrorDisplay from "./ErrorDisplay";

const Title = styled.span`
  font-weight: bolder;
  margin: 3px;
`;
const Form = styled.form`
  display: flex;
  gap: 15px;
  ${mobile({ flexDirection: "column" })}
`;
const Input = styled.input`
  margin-right: 5px;
  width: fit-content;
  padding-left: 5px;
  text-transform: capitalize;
`;
const Button = styled.button`
  background-color: #132513;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 250;
`;

const AddProduct = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [error, setError] = useState("");

  const [inputs, setInputs] = useState({
    email: user.email,
    key: "",
    name: "",
    price: "",
    unit: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let products = user.products;
    const product = [
      {
        name: inputs.name
          .toLowerCase()
          .replace(/(^\w{1})|(\s{1}\w{1})/g, (match) => match.toUpperCase()),
        price: inputs.price,
        unit: inputs.unit,
      },
    ];
    if (inputs.name.length > 3) products = [...products, ...product];

    //check if the name already exists
    let seen = new Set();
    const hasDuplicates = products.some(function (currentObject) {
      return seen.size === seen.add(currentObject.name).size;
    });

    const updatedUser = {
      email: inputs.email,
      admin_key: inputs.key,
      products: products,
    };
    //
    hasDuplicates &&
      setError({
        status: 500,
        responseText: "-A product by this name already exists!-",
      });
    //
    !hasDuplicates &&
      inputs.key.length !== 4 &&
      setError({
        status: 500,
        responseText: "-Invalid key. You are unauthorized to do that.-",
      });
    //
    !hasDuplicates &&
      inputs.key.length === 4 &&
      updateUser(user._id, updatedUser, dispatch).then((res) => {
        setError(res.request);
      });
  };

  return (
    <>
      <ErrorDisplay error={error} />

      <Title>Add a new product:</Title>
      <br />
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          maxLength="20"
          placeholder="Name"
          value={inputs.name}
          onChange={handleChange}
          required
        />
        <Input
          type="number"
          name="price"
          maxLength="11"
          placeholder="Price"
          value={inputs.price}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="unit"
          maxLength="20"
          placeholder="Unit"
          value={inputs.unit}
          onChange={handleChange}
        />
        <Input
          maxLength="4"
          minLength="4"
          type="number"
          name="key"
          placeholder="Admin Key"
          value={inputs?.key}
          onChange={handleChange}
          required
        />
        <Button>Add</Button>
      </Form>
    </>
  );
};

export default AddProduct;
