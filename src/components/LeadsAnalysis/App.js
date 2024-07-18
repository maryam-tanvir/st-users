import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap'; // Assuming you're using Reactstrap

const App = () => {
  // State variables for data and editing (assuming you have editing functionality)
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editableId, setEditableId] = useState(null);

  // Function to fetch items from the server with the new query
  const getItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/crud');
      const data = await response.json();
      if (data.length > 0) {
        setItems(data);
      } else {
        console.warn('No data received from server');
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await getItems();
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle edit click, setting the editable ID (assuming you have implementation)
  const handleEditClick = (id) => {
    setEditableId(id);
  };

  // Function to handle delete click, sending the delete request to the server (assuming you have implementation)
  const handleDeleteClick = async (id) => {
    // Implement the delete logic here (e.g., using fetch with DELETE method)
  };

  return (
    <Container className="App">
      <Row>
        <Col>
          <h1 style={{ margin: '20px 0' }}>Leads Analysis</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          {isLoading && <p>Loading data...</p>}
          {items.length > 0 && (
            <table style={{ width: '100%', borderSpacing: '10px' }}>
              <thead>
                <tr>
                  <th>Lead Date</th>
                  <th>Stock Name</th>
                  <th>Sector</th>
                  <th>Company</th>
                  <th>Percentage Change</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Duration</th>
                  <th>Lagging</th>
                  <th>Actual</th>
                  <th>Lead Percentage Change</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}> {/* Use a unique identifier from the data for the key */}
                    <td>
                      {item.lead_date ? new Date(item.lead_date).toLocaleDateString() : 'N/A'}
                    </td>
                    <td>{item.stock_name || 'N/A'}</td>
                    <td>{item.sector || 'N/A'}</td>
                    <td>{item.company || 'N/A'}</td>
                    <td>
                      {typeof item.percentage_change === 'number' ? item.percentage_change.toFixed(2) : 'N/A'}
                    </td>
                    <td>
                      {item.start_date ? new Date(item.start_date).toLocaleDateString() : 'N/A'}
                    </td>
                    <td>
                      {item.end_date ? new Date(item.end_date).toLocaleDateString() : 'N/A'}
                    </td>
                    <td>
                      {item.duration ? item.duration.toFixed(2) : 'N/A'} {/* Assuming duration is a number */}
                    </td>
                    <td>
                      {item.lagging ? item.lagging.toFixed(2) : 'N/A'} {/* Assuming lagging is a number */}
                    </td>
                    <td>
                      {item.actual ? item.actual.toFixed(2) : 'N/A'} {/* Assuming actual is a number */}
                    </td>
                    <td>
                      {typeof item.lead_percentage_change === 'number' ? item.lead_percentage_change.toFixed(2) : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default App;
