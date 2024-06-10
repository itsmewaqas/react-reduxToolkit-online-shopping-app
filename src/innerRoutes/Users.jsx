import { useState, useEffect } from 'react'
import { Container, Row, Col, Table, Button, Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, fetchUsers, deleteUser, updateUser, searchUser } from '../redux/slices/userDetail';
import validateInfo from '../components/validation';
import { BiSkipPrevious, BiSkipNext } from "react-icons/bi";

function Users() {

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userDetail);
  console.log('get userDetail', userData);

  const initalState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    cell: '',
    usertype: '',
    address: '',
    gender: '',
    education: []
  };

  const [values, setValues] = useState(initalState);
  const [errors, setErrors] = useState({});
  const [edu, setEdu] = useState([]);
  const [id, setId] = useState();
  const [conditionBlock, setConditionBlock] = useState(false);
  const [disabled, setdisabled] = useState(false);
  const [search, setSearch] = useState('');
  const [radioData, setRadioData] = useState("");

  useEffect(() => {
    dispatch(searchUser(search));
  }, [search])

  // checkbox ctrl start
  const list = ["matric", "intermediate", "graduation", "masters"];

  const checkHandle = e => {
    const { name, type, checked, value } = e.currentTarget;
    setEdu(
      prev => checked
        ? [...prev, value]
        : prev.filter(val => val !== value)
    );
  };
  // checkbox ctrl end

  const handleChnage = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    })
  }

  let getedu = edu;
  values.education = getedu;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateInfo({ values }));
    if (values.name != '' &&
      values.email != '' &&
      values.password != '' &&
      values.confirmPassword != '' &&
      values.cell != '' &&
      values.usertype != '' &&
      values.address != '' &&
      values.gender != '' &&
      values.education != '') {
      dispatch(createUser({ ...values, confirmPassword: undefined }));
      if (values) {
        setValues({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          cell: '',
          usertype: '',
          address: '',
          gender: '',
          education: setEdu([]),
        })
      }
    }
  }

  const removeUser = (id) => {
    dispatch(deleteUser(id))
  }

  const editUser = (id) => {
    setConditionBlock(true)
    setdisabled(true)
    let editRow = userData.userDetail.filter((x) => x.id === id);;
    values.id = editRow[0].id;
    values.name = editRow[0].name;
    values.email = editRow[0].email;
    values.password = editRow[0].password;
    values.confirmPassword = editRow[0].password;
    values.cell = editRow[0].cell;
    values.usertype = editRow[0].usertype;
    values.address = editRow[0].address;
    values.gender = editRow[0].gender;
    const eduList = editRow[0].education.toString().split(',');
    setEdu(eduList);
  }


  const updateHandle = (e) => {
    e.preventDefault();
    setConditionBlock(false)
    setdisabled(false)
    setErrors(validateInfo({ values }));
    if (values.name != '' &&
      values.email != '' &&
      values.password != '' &&
      values.cell != '' &&
      values.usertype != '' &&
      values.address != '' &&
      values.gender != '' &&
      values.education != '') {
      dispatch(updateUser({ ...values, confirmPassword: undefined }));
      if (values) {
        setValues({
          name: '',
          email: '',
          password: '',
          cell: '',
          usertype: '',
          address: '',
          gender: '',
          education: setEdu([]),
        })
      }
    }
  }

  const resetUpdate = () => {
    setConditionBlock(false)
    setdisabled(false)
    setValues({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      cell: '',
      usertype: '',
      address: '',
      gender: '',
      education: setEdu([]),
    })
  }

  useEffect(() => {
    dispatch(fetchUsers());
  }, [])


  if (userData.loading) {
    return (<Spinner animation="border" role="status" variant="primary" size="md">
      <span className="visually-hidden">Loading...</span>
    </Spinner>)
  }

  return (
    <div>
      <Container>
        <h1>Users</h1>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control name='name' type="text" value={values.name} onChange={handleChnage} />
                {errors.name && <p className='error'>{errors.name}</p>}
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control name='email' type="email" value={values.email} onChange={handleChnage} />
                {errors.email && <p className='error'>{errors.email}</p>}
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control disabled={disabled} value={values.password} name='password' type="password" onChange={handleChnage} />
                {errors.password && <p className='error'>{errors.password}</p>}
              </Form.Group>
            </Col>
            {conditionBlock == false ?
              <>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control disabled={disabled} value={values.confirmPassword} name='confirmPassword' type="password" onChange={handleChnage} />
                    {errors.confirmPassword && <p className='error'>{errors.confirmPassword}</p>}
                  </Form.Group>
                </Col>
              </> : null}
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Cell</Form.Label>
                <Form.Control name='cell' type="text" value={values.cell} onChange={handleChnage} />
                {errors.cell && <p className='error'>{errors.cell}</p>}
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>User Type</Form.Label>
                <Form.Select name="usertype" value={values.usertype} onChange={handleChnage}>
                  <option hidden selected>Select</option>
                  <option value="Admin">Admin</option>
                  <option value="Employee">Employee</option>
                </Form.Select>
                {errors.usertype && <p className='error'>{errors.usertype}</p>}
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control name='address' type="text" value={values.address} onChange={handleChnage} />
                {errors.address && <p className='error'>{errors.address}</p>}
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <br />
                <Form.Check
                  inline
                  type='radio'
                  label='Male'
                  checked={values.gender === 'Male'}
                  name='gender'
                  value="Male"
                  onChange={handleChnage}
                />
                <Form.Check
                  inline
                  type='radio'
                  label='Female'
                  checked={values.gender === 'Female'}
                  name='gender'
                  value="Female"
                  onChange={handleChnage}
                />
                {errors.gender && <p className='error'>{errors.gender}</p>}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                {list.map(item => (
                  <Form.Check
                    inline
                    key={item.toString()}
                    label={item}
                    value={item}
                    type="checkbox"
                    checked={edu.some(val => val === item)}
                    onChange={checkHandle}
                  />
                ))}
                {errors.education && <p className='error'>{errors.education}</p>}
              </Form.Group>
            </Col>
            <div class="d-flex justify-content-start">
              {conditionBlock == false ?
                <Button type='submit' variant="success" className='mt-1 my-3'>Add</Button>
                :
                <>
                  <Button type='submit' variant="success" onClick={updateHandle} className='mt-1 my-3'>update</Button>
                  <Button type='submit' variant="success" onClick={resetUpdate} className='mt-1 my-3'>Cancel</Button>
                </>
              }
            </div>
          </Row>
        </form>
        <Row>
          <input type="text"
            name='search'
            placeholder='Search User'
            onChange={(e) => setSearch(e.target.value)} />
        </Row>
        <Row>
          <Form.Group className="mb-3">
            <Form.Check
              inline
              type='radio'
              label='All'
              checked={radioData === ''}
              name='gender'
              value="All"
              onChange={(e) => setRadioData(e.target.value)}
            />
            <Form.Check
              inline
              type='radio'
              label='Male'
              checked={radioData === 'Male'}
              name='gender'
              value="Male"
              onChange={(e) => setRadioData(e.target.value)}
            />
            <Form.Check
              inline
              type='radio'
              label='Female'
              checked={radioData === 'Female'}
              name='gender'
              value="Female"
              onChange={(e) => setRadioData(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Table size="md">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Cell</th>
              <th>Address</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userData.userDetail
              &&
              userData.userDetail.filter((el) => {
                if (userData.search.length === 0) {
                  return el;
                }
                else {
                  return el.name.toLowerCase().includes(search.toLowerCase())
                }
              }).filter((el) => {
                if (radioData === "Male") {
                  return el.gender === radioData;
                }
                else if (radioData === "Female") {
                  return el.gender === radioData;
                }
                else return el;
              })
                .map((item, index) => {
                  return (
                    <tr key={index.toString()}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.cell}</td>
                      <td>{item.address}</td>
                      <td>{item.gender}</td>
                      <td>
                        <Button onClick={() => editUser(item.id)} variant="outline-dark" size="sm">Edit</Button>
                        <Button onClick={() => removeUser(item.id)} variant="outline-dark" size="sm">Delete</Button>
                      </td>
                    </tr>
                  )
                })}
          </tbody>
        </Table>
      </Container>
    </div>
  )
}

export default Users
