import { useState } from 'react';
import { Button, Modal, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';

function RolesLookupModal({ rolesModal, setRolesModal }) {

    const initalState = {
        searchRoles: '',
        checkValue: ''
    };

    const [values, setValues] = useState(initalState);
    const [errors, setErrors] = useState({});

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
            name: 'Select',
            cell: row => <Form.Check
                type="checkbox"
                onChange={handleChnage}
                name='checkValue'
            />,
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

    return (
        <Modal
            show={rolesModal}
            onHide={() => setRolesModal()}
            backdrop="static"
            size="lg"
            keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Roles Lookup</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Col md={12} className='mt-3 my-3'>
                    <Form.Label>Role Selection</Form.Label>
                    <Form.Control
                        placeholder="Search Roles By Name"
                        type="text"
                        name='searchRoles'
                        onChange={handleChnage}
                    />
                </Col>
                <Col md={12} className='mt-3 my-3'>
                    <DataTable
                        columns={columns}
                        data={data}
                    />
                </Col>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setRolesModal()}>Close</Button>
                <Button variant="primary">Save</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RolesLookupModal;


