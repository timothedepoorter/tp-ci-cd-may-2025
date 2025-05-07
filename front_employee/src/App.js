import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Modal } from 'react-bootstrap';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    department: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      console.log("message !!!!")
      const response = await fetch('http://localhost:8080/employees');
      console.log(response)
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({
      ...newEmployee,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmployee),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de l\'employé');
      }

      const data = await response.json();
      
      // Réinitialiser le formulaire
      setNewEmployee({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        department: ''
      });
      
      // Fermer le formulaire
      setShowForm(false);
      
      // Actualiser la liste des employés
      fetchEmployees();
      
      // Afficher un message de succès
      setAlertVariant('success');
      setAlertMessage('Employé créé avec succès!');
      setShowAlert(true);
      
      // Masquer l'alerte après 3 secondes
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      
    } catch (error) {
      console.error('Erreur:', error);
      setAlertVariant('danger');
      setAlertMessage('Erreur lors de la création de l\'employé');
      setShowAlert(true);
    }
  };

  return (
    <div className='container'>
      <h1 className="my-4">Gestion des employés</h1>
      
      {showAlert && (
        <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
          {alertMessage}
        </Alert>
      )}
      
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-0">Liste des employés</h2>
        <Button 
          variant="primary" 
          onClick={() => setShowForm(true)}
          className="mb-3"
        >
          <i className="bi bi-plus-circle me-2"></i>
          Ajouter un employé
        </Button>
      </div>
      
      <Modal show={showForm} onHide={() => setShowForm(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un nouvel employé</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Prénom</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="firstName" 
                    value={newEmployee.firstName} 
                    onChange={handleInputChange} 
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="lastName" 
                    value={newEmployee.lastName} 
                    onChange={handleInputChange} 
                    required
                  />
                </Form.Group>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="email" 
                    value={newEmployee.email} 
                    onChange={handleInputChange} 
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Téléphone</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="phoneNumber" 
                    value={newEmployee.phoneNumber} 
                    onChange={handleInputChange} 
                  />
                </Form.Group>
              </div>
            </div>
            
            <Form.Group className="mb-3">
              <Form.Label>Département</Form.Label>
              <Form.Control 
                type="text" 
                name="department" 
                value={newEmployee.department} 
                onChange={handleInputChange} 
                required
              />
            </Form.Group>
            
            <div className="text-end">
              <Button variant="secondary" onClick={() => setShowForm(false)} className="me-2">
                Annuler
              </Button>
              <Button variant="primary" type="submit">
                Créer l'employé
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Department</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>{employee.phoneNumber}</td>
              <td>{employee.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
