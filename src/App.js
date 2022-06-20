import React, { useEffect } from 'react';
import './App.css';
import {Table} from './Table';


function App() {
  const columns = [
    { accessor: 'name', label: 'Name' },
    { accessor: 'sales', label: 'Sales' },
    { accessor: 'salary', label: 'Salary' },
    { accessor: 'age', label: 'Age' },
    { accessor: 'start_date', label: 'Start Date' },
  ]

  return (
    <div className="App">
      <h4>Users List</h4>
      <Table 
        columns={columns} 
        />
    </div>
  );
}

export default App;
