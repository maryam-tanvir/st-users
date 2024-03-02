import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  useEffect(() => {
    axios.get<User[]>('/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddUser = () => {
    axios.post<User>('/api/users', formData)
      .then(response => setUsers([...users, response.data]))
      .catch(error => console.error(error));
  };

  const handleUpdateUser = (id: number) => {
    axios.put<User>(`/api/users/${id}`, formData)
      .then(response => {
        const updatedUsers = users.map(user => (user.id === id ? response.data : user));
        setUsers(updatedUsers);
      })
      .catch(error => console.error(error));
  };

  const handleDeleteUser = (id: number) => {
    axios.delete(`/api/users/${id}`)
      .then(() => {
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>React PostgreSQL CRUD</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <button onClick={() => handleUpdateUser(user.id)}>Update</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <input type="text" name="username" placeholder="Username" onChange={handleInputChange} />
        <input type="text" name="email" placeholder="Email" onChange={handleInputChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
        <button onClick={handleAddUser}>Add User</button>
      </div>
    </div>
  );
};

export default App;
