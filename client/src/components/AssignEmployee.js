import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Row, Form, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { EMPLOYEES } from '../utils/queries';
import { ASSIGN_EMPLOYEE } from '../utils/mutations';
import { useNavigate, useParams } from 'react-router-dom';

export default function AssignEmployee() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data } = useQuery(EMPLOYEES);
    const [assignEmployee] = useMutation(ASSIGN_EMPLOYEE);
    const [checkedItems, setCheckedItems] = useState({});

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = useForm();

    const onSubmit = async (values, e) => {
        e.preventDefault();
        let filterIds = Object.values(checkedItems);
        filterIds = filterIds.filter(item => item != false);
        if (filterIds.length > 0) {
            const { data } = await assignEmployee(
                {
                    variables: {
                        employeeIds: filterIds,
                        id: id
                    }
                }
            )
            navigate(`/room/${data.assignEmployee.room._id}`)
        }
    }

    const handleCheckboxChange = (e, id) => {
        setCheckedItems({ ...checkedItems, [e.target.name]: e.target.checked ? id : false })
    }

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className='border rounded text-center p-5'>
                        <ul>
                            {data?.employees?.map((employee, index) =>
                                <li key={index}>
                                    <label>
                                        {employee.username}
                                        <input
                                            type='checkbox'
                                            name={employee.username}
                                            onChange={(e) => { handleCheckboxChange(e, employee._id) }}
                                            checked={checkedItems[employee.username] || false}
                                        />
                                    </label>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className='btn-wrapper text-center mt-3'>
                        <Button id='login-btn' disabled={isSubmitting} type='submit'>
                            Submit
                        </Button>
                    </div>
                </Form>
            </Row>
        </Container>
    )
}