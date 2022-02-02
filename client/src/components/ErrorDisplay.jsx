import styled from "styled-components";

const Error = styled.div`
  border: 1px solid;
  margin: 10px 0px;
  padding: 15px 10px 15px 50px;
  background-repeat: no-repeat;
  background-position: 10px center;
  cursor: pointer;
`;

const ErrorDisplay = ({ error }) => {
  return (
    <>
      {/* If Error Fetched By Server */}
      {error && error.status === 200 && (
        <Error
          style={{
            color: "#270",
            backgroundColor: "#DFF2BF",
            margin: "10px 0",
            padding: "10px",
            borderRadius: "3px 3px 3px 3px",
          }}
        >
          🌟 Update Successfull.
        </Error>
      )}
      {error && error.status !== 200 && (
        <Error
          style={{
            color: "#D8000C",
            backgroundColor: "#FFBABA",
            margin: "10px 0",
            padding: "10px",
            borderRadius: "3px 3px 3px 3px",
          }}
        >
          ☹ {error.responseText.slice(1, -1)}
        </Error>
      )}
    </>
  );
};

export default ErrorDisplay;
