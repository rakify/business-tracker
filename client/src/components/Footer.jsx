import styled from "styled-components";
import { useLocation } from "react-router";
const Container = styled.div`
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: black;
  color: white;
  text-align: center;
`;
const Footer = () => {
  const pos = useLocation();

  return (
    <>
      {pos.pathname.substring(1, 8) === "entries" ? (
        <Container style={{ display: "none" }}></Container>
      ) : (
        <Container id="google_translate_element"></Container>
      )}
    </>
  );
};

export default Footer;
