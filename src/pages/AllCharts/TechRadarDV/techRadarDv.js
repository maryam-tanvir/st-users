import React, { useEffect, useState } from 'react';
import RadarTimer from '../../../components/TechRadarDV/Radar/RadarTimer';
//import './App.css';

function App() {
    const [setup, setSetup] = useState({
        rings: ['-50,0', '0-5', '5-10', 'above 10'],
        quadrants: [],
        data: []
    });
    const [battleDates, setBattleDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/data');
                const data = await response.json();

                console.log('Fetched data:', data);

                if (Array.isArray(data)) {
                    const uniqueBattleDates = [...new Set(data.map(item => item.battle_date.split('T')[0]))];
                    const quadrants = [...new Set(data.map(item => `Lead${item.lead_id}`))];
                    const mappedData = data.map(item => ({
                        name: `Unit ${item.unit_assignment_id}`,
                        quadrant: `Lead${item.lead_id}`,
                        ring: determineRing(parseFloat(item.percentageprofitandloss)),
                        percentageprofitandloss: item.percentageprofitandloss,
                        profit_and_loss: item.profit_and_loss,
                        unit_assignment_id: item.unit_assignment_id,
                        battle_date: item.battle_date.split('T')[0]
                    }));

                    console.log('Mapped data:', mappedData);

                    setBattleDates(uniqueBattleDates);
                    setSetup({
                        rings: ['-50,0', '0-5', '5-10', 'above 10'],
                        quadrants: quadrants,
                        data: mappedData
                    });
                } else {
                    console.error('API response is not an array:', data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        let interval;
        if (isPlaying) {
            setSelectedDate(battleDates[0]); 
            interval = setInterval(() => {
                setSelectedDate(prevDate => {
                    const currentIndex = battleDates.indexOf(prevDate);
                    const nextIndex = currentIndex + 1;

                    if (nextIndex >= battleDates.length) {
                        setIsPlaying(false); 
                        clearInterval(interval);
                        return prevDate; 
                    }

                    return battleDates[nextIndex];
                });
            }, 5000); 
        }

        return () => clearInterval(interval);
    }, [isPlaying, battleDates]);

    const determineRing = (percentageProfitAndLoss) => {
        if (percentageProfitAndLoss < 0) return '-50,0';
        if (percentageProfitAndLoss >= 0 && percentageProfitAndLoss <= 5) return '0-5';
        if (percentageProfitAndLoss > 5 && percentageProfitAndLoss <= 10) return '5-10';
        return 'above 10';
    };

    const filteredData = selectedDate
        ? setup.data.filter(item => item.battle_date === selectedDate)
        : setup.data;

    const handlePlayClick = () => {
        if (isPlaying) {
            setIsPlaying(false);
        } else {
            setSelectedDate(battleDates[0]); 
            setIsPlaying(true);
        }
    };

    return (
        <div>
            <br/><br/><br/><br/><br/><br/>
            <div className="App">
            
            <div className="dropdown-container">
                <select onChange={(e) => setSelectedDate(e.target.value)} value={selectedDate} disabled={isPlaying}>
                    <option value="">Select Battle Date</option>
                    {battleDates.map((date, index) => (
                        <option key={index} value={date}>
                            {date}
                        </option>
                    ))}
                </select>
                <button onClick={handlePlayClick}>
                    {isPlaying ? 'Stop' : 'Play'}
                </button>
            </div>
            <div className="chart-container">
                <RadarTimer {...setup} data={filteredData} animate={isPlaying} />
            </div>
        </div>
        </div>
        
    );
}

export default App;
