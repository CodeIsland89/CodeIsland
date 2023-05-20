import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled.select`
  border-radius: 20px;
  padding: 1rem 5rem 1rem 1rem;
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 90%;
  background-position-y: 50%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 19px;
  text-align-last: left;

  @media (max-width: 768px) {
    padding: 0.5rem 2rem;
  }
`;

const StyledOption = styled.option`
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-family: 'B612 Mono';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  
`;

type SelectItem = {
  value: string;
  label: string;
};

type SelectProps = {
  items: SelectItem[];
  onChange: (value: string) => void;
};

export default function Select({ items, onChange }: SelectProps) {
  return (
    <StyledSelect onChange={(e) => onChange(e.target.value)}>
      {items.map((item) => (
        <StyledOption
          key={item.value}
          value={item.value}
        >
          {item.label}
        </StyledOption>
      ))}
    </StyledSelect>
  );
}
