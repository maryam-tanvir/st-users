import React, { useEffect, useState } from 'react';
import RadarTimer from '../../../components/TechRadarDV/Radar/RadarTimer';

function App() {
    const [setup1, setSetup1] = useState({
        rings: ['-50,0', '0-5', '5-10', 'above 10'],
        quadrants: [],
        data: []
    });
    const [battleDates1, setBattleDates1] = useState([]);
    const [selectedDate1, setSelectedDate1] = useState('');
    const [isPlaying1, setIsPlaying1] = useState(false);

    const [setup2, setSetup2] = useState({
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
                const response = await fetch('${process.env.REACT_APP_API_URL}/api/dataa');
                const data = await response.json();

                console.log('Fetched data:', data);

                if (Array.isArray(data)) {
                    const uniqueBattleDates = [...new Set(data.map(item => item.battle_date.split('T')[0]))];
                    const sectors = [...new Set(data.map(item => item.sector))];
                    const mappedData = data.map(item => ({
                        name: `Unit ${item.unit_assignment_id}`,
                        quadrant: item.sector, 
                        ring: determineRing(parseFloat(item.percentageprofitandloss)),
                        percentageprofitandloss: item.percentageprofitandloss,
                        profit_and_loss: item.profit_and_loss,
                        unit_assignment_id: item.unit_assignment_id,
                        battle_date: item.battle_date.split('T')[0]
                    }));

                    console.log('Mapped data:', mappedData);

                    setBattleDates2(uniqueBattleDates);
                    setSetup2({
                        rings: ['-50,0', '0-5', '5-10', 'above 10'],
                        quadrants: sectors,
                        data: mappedData
                    });
                } else {
                    console.error('API response is not an array:', data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData2();
    }, []);

    useEffect(() => {
        let interval;
        if (isPlaying2) {
            setSelectedDate2(battleDates2[0]); 
            interval = setInterval(() => {
                setSelectedDate2(prevDate => {
                    const currentIndex = battleDates2.indexOf(prevDate);
                    const nextIndex = currentIndex + 1;

                    if (nextIndex >= battleDates2.length) {
                        setIsPlaying2(false); 
                        clearInterval(interval);
                        return prevDate; 
                    }

                    return battleDates2[nextIndex];
                });
            }, 5000); 
        }

        return () => clearInterval(interval);
    }, [isPlaying2, battleDates2]);

    const determineRing = (percentageProfitAndLoss) => {
        if (percentageProfitAndLoss < 0) return '-50,0';
        if (percentageProfitAndLoss >= 0 && percentageProfitAndLoss <= 5) return '0-5';
        if (percentageProfitAndLoss > 5 && percentageProfitAndLoss <= 10) return '5-10';
        return 'above 10';
    };

    const filteredData1 = selectedDate1
        ? setup1.data.filter(item => item.battle_date === selectedDate1)
        : setup1.data;

    const filteredData2 = selectedDate2
        ? setup2.data.filter(item => item.battle_date === selectedDate2)
        : setup2.data;

    const handlePlayClick1 = () => {
        if (isPlaying1) {
            setIsPlaying1(false);
        } else {
            setSelectedDate1(battleDates1[0]); 
            setIsPlaying1(true);
        }
    };

    const handlePlayClick2 = () => {
        if (isPlaying2) {
            setIsPlaying2(false);
        } else {
            setSelectedDate2(battleDates2[0]); 
            setIsPlaying2(true);
        }
    };

    console.log('Setup1 quadrants:', setup1.quadrants);
console.log('Setup2 quadrants:', setup2.quadrants);


    return (
        <div style={{ marginTop: '100px', marginLeft: '50px'}}>
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