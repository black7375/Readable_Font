/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useState, useEffect, useCallback } from 'react';
import { getOption, setOption } from './storage';
import { LableS } from './styles';

const ToggleS = css`
  contain:         content;
  display:         flex;
  flex-direction:  row;
  justify-content: space-between;
  align-items:     center;
  margin-bottom:   40px;
  user-select:     none;
  position:        relative;
  box-sizing:      border-box;
`;

const CheckboxS = css`
  display: none;

  &:checked + label {
    border: 5px solid #0865b0;
    background-color: #3498db;

    &::before {
      transform:  translate(25px, 0);
    }
  }
`;

const BtnS = css`
  height:           35px;
  width:            60px;
  border-radius:    70px;
  background-color: #e25d5d;
  border:           5px solid #ad1000;
  box-sizing:       border-box;

  &:hover {
    cursor: pointer;
  }

  &::before {
    width:            15px;
    height:           15px;
    border-radius:    50%;
    background-color: #f2dd68;
    border:           5px solid #e5ce5e;
    transition:       all 350ms ease-in;
  }

  &::before,
  &::after {
    content: '';
    display: block;
  }
`;

interface CheckBoxI {
  label:  string;
  id:     string;
  popup?: boolean;
};

const Checkbox = ({label, id, popup = false}: CheckBoxI) => {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    getOption(id).then((option) => {
      if(option !== undefined) {
        setChecked(option);
      }
    });
  }, []);

  const onToggle = useCallback(
    () => {
      const reversed = !checked;
      setChecked(reversed);
      setOption(id, reversed);
    },
    [checked],
  );

  return (
    <div css={ToggleS}>
      <h2 css={LableS(popup)}>{label}</h2>
      <input type="checkbox" id={id} css={CheckboxS} checked={checked} />
      <label htmlFor={id} css={BtnS} onPointerDown={onToggle} ></label>
    </div>
  );
};
export default Checkbox;
