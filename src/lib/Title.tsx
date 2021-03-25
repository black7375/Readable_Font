 /** @jsx jsx */
import { jsx, css } from '@emotion/react';

const TitleS = (popup: boolean) => css`
  text-align:  center;
  font-weight: 900;
  font-family: "Noto Serif", serif;
  font-size:   ${popup ? "23px" : "30px" };
  margin-bottom: ${popup ? "35px" : "0"};
`;

interface TitleI {
  popup?: boolean;
}

const Title = ({ popup = false }: TitleI) => {
  return (
  <div css={TitleS(popup)}>Readable Font</div>);
};
export default Title;
