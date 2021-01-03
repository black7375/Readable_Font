/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useState, useEffect, useCallback } from 'react';
import { getOption, setOption } from './storage';

const ToggleS = css`
  display:     block;
  margin-top:  40px;
  user-select: none;
  position:    relative;
  box-sizing:  border-box;
`;

const CheckboxS = css`
  display: none;

  &:checked + label {
    border: 5px solid #0865b0;
    background-color: #3498db;

    &::before {
      transform: translate(25px, 0);
    }
  }
`;

const BtnS = css`
  display:          inline-block;
  float:            right;
  font-size:        1.4em;
  position:         relative;
  height:           35px;
  width:            60px;
  border-radius:    70px;
  background-color: #e25d5d;
  border:           5px solid #ad1000;
  transition:       all 250ms ease-in;

  &:hover {
    cursor: pointer;
  }

  &::before {
    position:         absolute;
    width:            25px;
    height:           25px;
    border-radius:    50%;
    background-color: #f2dd68;
    border:           5px solid #e5ce5e;
  }

  &::before,
  &::after {
    content: '';
    display: block;
  }
`;

interface CheckBoxI {
  label: string;
  id:    string;
};

const Checkbox = ({label, id}: CheckBoxI) => {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    getOption(id).then((option) => setChecked(option));
  }, []);

  const onToggle = useCallback(
    () => {
      const reversed = !checked;
      setChecked(reversed);
      setOption(id, reversed);
    },
    [],
  );

  return (
    <div css={ToggleS}>
      <h2>{label}
        <input type="checkbox" id={id} css={CheckboxS} checked={checked} />
        <label htmlFor={id} css={BtnS} onPointerDown={onToggle} ></label>
      </h2>
    </div>
  );
};
export default Checkbox;
