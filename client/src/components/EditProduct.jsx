import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/apiCalls";

const Input = styled.input`
  margin-right: 5px;
  margin-bottom: 5px;
  width: fit-content;
  padding-left: 5px;
  text-transform: capitalize;
`;
const Button = styled.button`
  background-color: #132513;
  margin-right: 5px;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 250;
`;
const TR = styled.tr``;
const TD = styled.td`
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid black;
  &:last-child {
    background-color: #d7e5f1;
  }
`;

const EditProduct = ({ c }) => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(c._id);

  const [product, setProduct] = useState({
    email: user.email,
    key: "",
    name: c.name || "",
    price: c.price || "",
    unit: c.unit || "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setProduct((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const products = [...user.products];
    const newProduct = {
      name: product.name
        .toLowerCase()
        .replace(/(^\w{1})|(\s{1}\w{1})/g, (match) => match.toUpperCase()),
      price: product.price,
      unit: product.unit,
    };
    const productIndex = products.findIndex((item) => item.name === c.name);
    products[productIndex] = newProduct;
    const updatedUser = {
      email: product.email,
      admin_key: product.key,
      products: products,
    };
    //check if the name already exists
    let seen = new Set();
    const hasDuplicates = products.some(function (currentObject) {
      return seen.size === seen.add(currentObject.name).size;
    });
    //
    hasDuplicates && setError("name");
    //
    !hasDuplicates && product.key.length !== 4 && setError("key");
    //
    !hasDuplicates &&
      product.key.length === 4 &&
      updateUser(user._id, updatedUser, dispatch).then(
        (res) => res.request.status === 401 && setError("key")
      );
  };

  return (
    <>
      <TR>
        <TD>
          {error === "name" ? (
            <>
              <Input
                style={{ border: "1px solid red" }}
                type="text"
                name="name"
                maxLength="20"
                placeholder="Name"
                value={product.name}
                onChange={handleChange}
                required
              />
              <br />
              <i>*this name exists</i>
            </>
          ) : (
            <Input
              type="text"
              name="name"
              maxLength="20"
              placeholder="Name"
              value={product.name}
              onChange={handleChange}
              required
            />
          )}
        </TD>
        <TD>
          <Input
            type="text"
            name="price"
            maxLength="11"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
          />
        </TD>
        <TD>
          <Input
            type="text"
            name="unit"
            maxLength="20"
            placeholder="Unit"
            value={product.unit}
            onChange={handleChange}
          />
        </TD>
        <TD>
          {error !== "key" ? (
            <Input
              maxLength="4"
              minLength="4"
              type="number"
              name="key"
              placeholder="Admin Key"
              onChange={handleChange}
            />
          ) : (
            <Input
              style={{ border: "1px solid red" }}
              maxLength="4"
              minLength="4"
              type="number"
              name="key"
              placeholder="Admin Key"
              onChange={handleChange}
            />
          )}
          <Button onClick={handleSubmit}>Update</Button>
          <Button onClick={(e) => setEditId(null)}>Cancel</Button>
        </TD>
      </TR>
    </>
  );
};

export default EditProduct;
