import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import { useMutation, useQuery } from '@apollo/client';
import { EMPLOYEES } from '../utils/queries';
import { DELETE_EMPLOYEE } from '../utils/mutations';
import { useState } from 'react';

export default function AllEmployees() {
    const { data } = useQuery(EMPLOYEES);
    const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);
    const [viewSchedules, setViewSchedules] = useState(Array(data?.employees?.length).fill(false));

    if (!data || !data.employees) {
        return <div>Loading...</div>;
    }

    const handleViewDetails = (index) => {
        setViewSchedules((cardsClicked) => {
            const viewedSchedules = [...cardsClicked];
            viewedSchedules[index] = !viewedSchedules[index];
            return viewedSchedules
        });
    }

    function handleDeleteEmployee(index) {
        const deletedEmployeeId = data.employees[index]._id
        console.log(deletedEmployeeId);
        deleteEmployee({
            variables: { id: deletedEmployeeId},
            refetchQueries: [{query: EMPLOYEES}]
        });
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Navigation />
                    </Col>
                </Row>
                <Row className='d-flex flex-wrap justify-content-center'>
                    {data?.employees?.map((employee, index) =>
                        <Col key={index} xs={12} sm={6} md={4} lg={3} className='mt-4'>
                            <Card className='w-100' style={{ maxWidth: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{employee.username}</Card.Title>
                                    <Button onClick={() => handleViewDetails(index)} variant='primary' className='me-4 mb-2'>View Schedules</Button>
                                    <Button onClick={() => handleDeleteEmployee(index)} variant='danger' className='mb-2'>Delete Employee</Button>
                                    {viewSchedules[index] && (
                                        <div>
                                            <p>Schedules:</p>
                                            {employee.schedules.map((schedule, scheduleIndex) => (
                                                <div key={scheduleIndex} className="border rounded p-3">
                                                    <p>Room: {`${schedule.room.building} ${schedule.room.roomNumber}`}</p>
                                                    <p>Next Cleaning Date: {schedule.room.nextCleaningDate}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    )}
                </Row>
            </Container>
        </div>
    );
}