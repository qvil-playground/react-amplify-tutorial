import styled from "styled-components";

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  color: ${props => props.color || "mediumseagreen"};
  background-color: white;
  border: 2px solid ${props => props.color || "mediumseagreen"};
`;

export default Button;
