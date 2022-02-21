import { css } from "styled-components";

export const mobile = (props) => css`
  @media only screen and (max-width: 380px) {
    ${props}
  }
`;

export const tablet = (props) => css`
  @media (min-width: 380px) and (max-width: 780px) {
    ${props}
  }
`;
