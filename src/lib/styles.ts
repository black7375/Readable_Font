import { css } from '@emotion/react';

export const LableS = (popup: boolean) => css`
  font-size:   24px;
  font-weight: ${popup ? "900" : "800"};
`;
