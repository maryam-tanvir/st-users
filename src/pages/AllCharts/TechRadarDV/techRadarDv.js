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
    const [battleDates2, setBattleDates2] = useState([]);
    const [selectedDate2, setSelectedDate2] = useState('');
    const [isPlaying2, setIsPlaying2] = useState(false);

    useEffect(() => {
        const fetchData1 = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/data');
                const data = await response.json();

                console.log('Fetched data from api/data:', data);

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

                    setBattleDates1(uniqueBattleDates);
                    setSetup1({
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

        fetchData1();
    }, []);

    useEffect(() => {
        let interval;
        if (isPlaying1) {
            setSelectedDate1(battleDates1[0]); 
            interval = setInterval(() => {
                setSelectedDate1(prevDate => {
                    const currentIndex = battleDates1.indexOf(prevDate);
                    const nextIndex = currentIndex + 1;

                    if (nextIndex >= battleDates1.length) {
                        setIsPlaying1(false); 
                        clearInterval(interval);
                        return prevDate; 
                    }

                    return battleDates1[nextIndex];
                });
            }, 5000); 
        }

        return () => clearInterval(interval);
    }, [isPlaying1, battleDates1]);

    useEffect(() => {
        const fetchData2 = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/dataa');
                const data = await response.json();

                console.log('Fetched data from api/dataa:', data);

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

                    setBattleDates2(uniqueBattleDates);
                    setSetup2({
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

    return (
        <div style={{ marginTop: '100px', marginLeft: '50px'}}>
            <div className="App">
                <div className="dropdown-container">
                    <select onChange={(e) => setSelectedDate1(e.target.value)} value={selectedDate1} disabled={isPlaying1}>
                        <option value="">Select Battle Date</option>
                        {battleDates1.map((date, index) => (
                            <option key={index} value={date}>
                                {date}
                            </option>
                        ))}
                    </select>
                    <button onClick={handlePlayClick1}>
                        {isPlaying1 ? 'Stop' : 'Play'}
                    </button>
                </div>
                <div className="chart-container">
                    <RadarTimer {...setup1} data={filteredData1} animate={isPlaying1} />
                </div>

                <div className="dropdown-container">
                    <select onChange={(e) => setSelectedDate2(e.target.value)} value={selectedDate2} disabled={isPlaying2}>
                        <option value="">Select Battle Date</option>
                        {battleDates2.map((date, index) => (
                            <option key={index} value={date}>
                                {date}
                            </option>
                        ))}
                    </select>
                    <button onClick={handlePlayClick2}>
                        {isPlaying2 ? 'Stop' : 'Play'}
                    </button>
                </div>
                <div className="chart-container">
                    <RadarTimer {...setup2} data={filteredData2} animate={isPlaying2} />
                </div>
            </div>
            
        </div> 
    );
}

export default App;
