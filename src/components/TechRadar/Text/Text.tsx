import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../theme-context';

const TextWrapper = styled.text`
  font-weight: bold;
  color: white;
  opacity: 0.6;
  text-align: right;
`;

interface TextProps {
  dx: number;
  dy: number;
  name: string;
}

const Text: React.FC<TextProps> = (props) => {
  // context variables
  const { fontSize, fontFamily } = useContext(ThemeContext);

  return (
    <TextWrapper
      className="quadrant"
      fontSize={fontSize}
      fontFamily={fontFamily}
      dx={props.dx}
      dy={props.dy}
    >
      {props.name}
    </TextWrapper>
  );
};

export default Text;
