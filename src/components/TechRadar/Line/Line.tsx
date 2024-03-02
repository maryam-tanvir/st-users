import React from 'react';

interface LineProps {
  x2: number;
  y2: number;
  stroke: string;
}

const Line: React.FC<LineProps> = (props) => {
  return (
    <line
      x1="0"
      y1="0"
      x2={props.x2}
      y2={props.y2}
      stroke={props.stroke}
    />
  );
};

export default Line;
