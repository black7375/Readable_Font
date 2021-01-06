/** @jsx jsx */
import { Fragment } from 'react';
import { jsx, Global, css } from '@emotion/react';
import OPTIONS from '../lib/options';
import Title from '../lib/Title';
import Checkbox from '../lib/Checkbox';
import Licenses from './Licenses';

const GlobalS = css`
  body {
    margin: 20px 20px;
    font-family: "Noto Sans", sans-serif;
  }
`;

const SectionHeaderS = css`
  font-size:   30px;
  font-weight: 900;

  &::after {
    content:    '';
    display:    block;
    margin-top: 15px;
    border-top: 1.5px solid #9A9A9A;
  }
`;

interface SectionHedaerI {
  children: string;
}

const SectionHeader = ({ children }: SectionHedaerI) => {
  return (<h1 css={SectionHeaderS}>{children}</h1>);
};

const options = OPTIONS.map(option => {
  const header = option.label;
  const checkboxes = option.subs?.map((subOption) => {
    const id = subOption.id;
    return <Checkbox key={id} id={id} label={subOption.label} / >;
  });
  return (
    <Fragment>
      <SectionHeader>{ header }</SectionHeader>
      {checkboxes}
    </Fragment>
  );
});

const Options = () => {
  return (
    <Fragment>
      <Global styles={GlobalS} />
      <Title />
      {options}
      <SectionHeader>License</SectionHeader>
      {Licenses}
    </Fragment>
  );
};
export default Options;
