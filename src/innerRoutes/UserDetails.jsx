import { useState, useEffect } from 'react'
import { Container, Row, Col, Table, Button, ListGroup, Form } from 'react-bootstrap';
import { CustomContainers } from '../components/CustomContainers';
import DataTable from 'react-data-table-component';
import { BiTrashAlt } from "react-icons/bi";
import RolesLookupModal from './RolesLookupModal';

function UserDetails() {

  const initalState = {
    userid: '',
    email: '',
    firstName: '',
    lastName: '',
    telNo: '',
    cellNo: '',
    department: '',
    userType: '',
    branchNo: '',
    externalUserName: '',
    rmName: '',
    active: '',
  };

  const [values, setValues] = useState(initalState);
  const [errors, setErrors] = useState({});
  const [rolesModal, setRolesModal] = useState(false);

  const handleChnage = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    })
  }

  const columns = [
    {
      name: 'Title',
      selector: row => row.title,
    },
    {
      name: 'Year',
      selector: row => row.year,
    },
    {
      name: 'Actions',
      cell: row => <BiTrashAlt size={20} row={row} />,
      allowOverflow: true,
      button: true,
      width: '56px',
    },
  ];

  const data = [
    {
      id: 1,
      title: 'Beetlejuice',
      year: '1988',
    },
    {
      id: 2,
      title: 'Ghostbusters',
      year: '1984',
    },
  ]

  const str = 'my name is waqas my age is thirty my area is north nazimabad my education is bs';
  const obj = {};
  for (let x of str) {
    if (obj[x]) {
      obj[x] += 1;
    }
    else {
      obj[x] = 1;
    }
  }
  console.log('the sum of chracters == ',obj);


  const num = [1,2,3,4,5,6,7,8,9,1,1,3,3,3,3,4,4,4,4,4,4,7,7,7,7,9,9,9,9,9,9];
  const numobj = [];
  for (let y of num) {
    if (numobj[y]) {
      numobj[y] += 1;
    }
    else {
      numobj[y] = 1;
    }
  }
  console.log('the sum of numbers == ',numobj);


  useEffect(() => {
  }, [])

  return (
    <div>
      {rolesModal && <RolesLookupModal rolesModal={rolesModal} setRolesModal={setRolesModal} />}
      <h1>User Details</h1>
      <Row>
        <Col md={12}>
          <CustomContainers title="User Detail">
            <Row>
              <Col md={4} className='mt-3 my-3'>
                <Form.Label>User Id</Form.Label>
                <Form.Control
                  type="text"
                  name='userid'
                  onChange={handleChnage}
                />
              </Col>
              <Col md={4} className='mt-3 my-3'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name='email'
                  onChange={handleChnage}
                />
              </Col>
              <Col md={4} className='mt-3 my-3'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name='firstName'
                  onChange={handleChnage}
                />
              </Col>
              <Col md={4} className='mt-3 my-3'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name='lastName'
                  onChange={handleChnage}
                />
              </Col>
              <Col md={4} className='mt-3 my-3'>
                <Form.Label>Tel No</Form.Label>
                <Form.Control
                  type="text"
                  name='telNo'
                  onChange={handleChnage}
                />
              </Col>
              <Col md={4} className='mt-3 my-3'>
                <Form.Label>Cell No</Form.Label>
                <Form.Control
                  type="text"
                  name='cellNo'
                  onChange={handleChnage}
                />
              </Col>
              <Col md={4} className='mt-3 my-3'>
                <Form.Label>Department</Form.Label>
                <Form.Select name="department" value={values.department} onChange={handleChnage}>
                  <option hidden selected>Select</option>
                  <option value="Admin">Admin</option>
                  <option value="Employee">Employee</option>
                </Form.Select>
              </Col>
              <Col md={4} className='mt-3 my-3'>
                <Form.Label>Record Status</Form.Label>
                <Form.Select name="userType" value={values.userType} onChange={handleChnage}>
                  <option hidden selected>User Type</option>
                  <option value="Admin">Admin</option>
                  <option value="Employee">Employee</option>
                </Form.Select>
              </Col>
              <Col md={4} className='mt-3 my-3'>
                <Form.Label>Branch No</Form.Label>
                <Form.Control
                  type="text"
                  name='branchNo'
                  onChange={handleChnage}
                />
              </Col>
              <Col md={4} className='mt-3 my-3'>
                <Form.Label>External User Name</Form.Label>
                <Form.Control
                  type="text"
                  name='externalUserName'
                  onChange={handleChnage}
                />
              </Col>
              <Col md={4} className='mt-3 my-3'>
                <Form.Label>RM Name (Phoenix)</Form.Label>
                <Form.Control
                  type="text"
                  name='rmName'
                  onChange={handleChnage}
                />
              </Col>
              <Col md={4} className='mt-3 my-3'>
                <Form.Label>&nbsp;</Form.Label>
                <Form.Check
                  type="checkbox"
                  onChange={handleChnage}
                  label="Active"
                  name='active'
                />
              </Col>
            </Row>
            <div class="d-flex justify-content-end">
              <Button variant="success">Add Roles</Button>
              <Button variant="primary" className='mx-2' onClick={() => setRolesModal(true)}>Update User</Button>
            </div>
          </CustomContainers>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <CustomContainers title="Assigned Groups">
            <DataTable
              columns={columns}
              data={data}
            />
          </CustomContainers>
        </Col>
      </Row>
    </div>
  )
}

export default UserDetails;
