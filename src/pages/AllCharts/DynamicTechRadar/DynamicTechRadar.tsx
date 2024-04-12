import React from 'react';
import RadarTimer from '../../../components/TechRadar/Radar/RadarTimer';

function App() {

    const setup = {
        rings: ['adopt', 'trial', 'assess', 'hold'],
        quadrants: ['tools', 'techniques', 'platforms', 'languages'],
        data: [
            {
                name: 'D3',
                quadrant: 'tools',
                ring: "assess"
            },
            {
                name: 'TypeScript',
                quadrant: 'languages',
                ring: "trial"
            },
            {
                name: 'Storybook',
                quadrant: 'tools',
                ring: "adopt"
            },
            {
                name: 'JavaScript',
                quadrant: 'languages',
                ring: "hold"
            },
            {
                name: 'Android',
                quadrant: 'platforms',
                ring: "hold"
            }
        ]
    };

    return (
        // <div className="App">
        //     <Radar {...setup} />
        // </div>
        <div className="App">
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <RadarTimer {...setup} />
        </div>
    );
}

export default App;
