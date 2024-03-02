import React from 'react';
import Radar from '../../../components/TechRadar/Radar/Radar';

function TechRadar(props : any) {
  const setup = {
    rings: ['adopt', 'trial', 'assess', 'hold'],
    quadrants: ['tools', 'techniques', 'platforms', 'languages'],
    data: [
      {
        name: 'D3',
        quadrant: 'tools',
        ring: 'assess',
      },
      {
        name: 'JSX',
        quadrant: 'languages',
        ring: 'trial',
      },
      {
        name: 'Python',
        quadrant: 'languages',
        ring: 'trial',
      },
      {
        name: 'C',
        quadrant: 'languages',
        ring: 'trial',
      },
      {
        name: 'Storybook',
        quadrant: 'tools',
        ring: 'adopt',
      },
    ],
  };

  return (
    <div className="App">
      <div style={{ background: '#F7F8FA', padding: '20px' }}>
        <h2>Tech Radar</h2>
        <Radar {...setup} />
      </div>
    </div>
  );
}

export default TechRadar;
