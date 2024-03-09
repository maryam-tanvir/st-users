import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap'; 
import RadarChart from './RadarChart';

const App = () => {
  const [items, setItems] = useState([]);
  const [editableEmail, setEditableEmail] = useState(null);
  const [updatedEmail, setUpdatedEmail] = useState('');

  const getItems = () => {
    fetch('http://localhost:5000/crud')
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => setItems(data))
      .catch((error) => console.log(error));
  };
  

  const addItemToState = (item) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const updateState = (item) => {
    const updatedItems = items.map((data) => (data.id === item.id ? item : data));
    setItems(updatedItems);
    setEditableEmail(null);
    setUpdatedEmail('');
  };

  const deleteItemFromState = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const handleEditClick = (email) => {
    setEditableEmail(email);
    setUpdatedEmail(email);
  };

  const handleUpdateClick = (id) => {
    fetch('http://localhost:5000/crud', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        email: updatedEmail,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item)) {
          updateState(item[0]);
        } else {
          console.log('Update failure');
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteClick = (id) => {
    fetch('http://localhost:5000/crud', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.delete === 'true') {
          deleteItemFromState(id);
        } else {
          console.log('Delete failure');
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsget = await getItems();
        console.log("ITEMS", itemsget);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <Container className="App">
      <Row>
        <Col>
          <h1 style={{ margin: '20px 0' }}>CRUD Database</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <table style={{ width: '100%', borderSpacing: '10px' }}>
            <thead>
              <tr>
                <th>Email</th>
                <th>Username</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    {editableEmail === item.email ? (
                      <input
                        type="text"
                        value={updatedEmail}
                        onChange={(e) => setUpdatedEmail(e.target.value)}
                      />
                    ) : (
                      item.email
                    )}
                  </td>
                  <td>{item.username}</td>
                  <td>
                    {editableEmail === item.email ? (
                      <button onClick={() => handleUpdateClick(item.id)}>Update</button>
                    ) : (
                      <>
                        <button onClick={() => handleEditClick(item.email)}>Edit</button>
                        <button onClick={() => handleDeleteClick(item.id)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>

      <Row>
        <Col>
          <RadarChart/>
        </Col>
      </Row>
  
    </Container>
  );
};

export default App;


// LISTEN, I HAVE ADDED TABLE ON A PAGE AND IT IS REPRESENTING DATA IN TABULAR FORM. 
