import React, { useState } from 'react';

const initialEmployees = [
  { id: 1, firstName: 'Alice', lastName: 'Johnson', email: 'alice@example.com', department: 'HR', role: 'Manager' },
  { id: 2, firstName: 'Bob', lastName: 'Smith', email: 'bob@example.com', department: 'Engineering', role: 'Developer' }
];

const App = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    role: ''
  });

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddClick = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      department: '',
      role: ''
    });
    setEditEmployee(null);
    setShowForm(true);
  };

  const handleEditClick = employee => {
    setFormData(employee);
    setEditEmployee(employee);
    setShowForm(true);
  };

  const handleDelete = id => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (editEmployee) {
      // Update
      setEmployees(employees.map(emp => (emp.id === editEmployee.id ? { ...formData, id: emp.id } : emp)));
    } else {
      // Add new
      const newEmployee = { ...formData, id: Date.now() };
      setEmployees([...employees, newEmployee]);
    }

    setShowForm(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      department: '',
      role: ''
    });
  };

  const filteredEmployees = employees.filter(emp =>
    `${emp.firstName} ${emp.lastName} ${emp.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main style={{ padding: '20px', fontFamily: 'Arial' }}>
      <header>
        <h1>Employee Directory</h1>
        <input
          type="search"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button onClick={() => alert('Filter popup placeholder')}>Filter</button>
      </header>

      <div className="filter-options" style={{ marginTop: '10px', marginBottom: '20px' }}>
        <div>
          <span>Sort</span>
          <select>
            <option>First Name</option>
            <option>Last Name</option>
            <option>Email</option>
            <option>Department</option>
            <option>Role</option>
          </select>

          <span>Show</span>
          <select>
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
        </div>
        <button className="add-employee-button" onClick={handleAddClick}>
          Add Employee
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
          <h3>{editEmployee ? 'Edit' : 'Add'} Employee</h3>
          <input
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleInputChange}
            required
          />
          <input
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleInputChange}
            required
          />
          <button type="submit">{editEmployee ? 'Update' : 'Add'}</button>
          <button type="button" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </form>
      )}

      <section>
        {filteredEmployees.length ? (
          filteredEmployees.map(emp => (
            <div key={emp.id} className="employee-card" style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>
              <strong>{emp.firstName} {emp.lastName}</strong>
              <p>{emp.email}</p>
              <p>{emp.department} | {emp.role}</p>
              <button onClick={() => handleEditClick(emp)}>Edit</button>
              <button onClick={() => handleDelete(emp.id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No employees found.</p>
        )}
      </section>
    </main>
  );
};

export default App;
