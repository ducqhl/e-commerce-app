import { css } from "styled-components";

export const mobile = (props) => css`
  @media only screen and (max-width: 425px) {
    ${props}
  }
`;

export const tablet = (props) => css`
  @media (min-width: 425px) and (max-width: 768px) {
    ${props}
  }
`;
