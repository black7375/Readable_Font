/** @jsx jsx */
import { Fragment } from 'react';
import { jsx, Global, css } from '@emotion/react';
import Title    from '../lib/Title';
import Checkbox from '../lib/Checkbox';
import OPTIONS  from '../lib/options';

const GlobalS = css`
  body {
    padding:    10px 10px 0;
    margin-bottom: -10px;
    width:      225px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
`;

const checkboxes = OPTIONS.map((option) => {
  const id = option.id;
  return <Checkbox key={id} id={id} label={option.label} popup={true} / >;
});

const Popup = () => {
  return (
    <Fragment>
      <Global styles={GlobalS} />
      <Title popup={true}></Title>
      {checkboxes}
    </Fragment>
  );
}
export default Popup;
