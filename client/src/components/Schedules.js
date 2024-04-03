import { Button, Card, Row, Col } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { SCHEDULES_BY_ROOM_ID } from '../utils/queries';
import { UNASSIGN_EMPLOYEE } from '../utils/mutations';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

// develop seems to be working

export default function SchedulesByRoomId({ refreshSchedules }) {
    const { id } = useParams();
    const { loading, data, refetch } = useQuery(SCHEDULES_BY_ROOM_ID, {
        variables: { roomId: id },
    });
    const [unassignEmployee] = useMutation(UNASSIGN_EMPLOYEE);
    const [unassignedEmployee, setUnassignedEmployee] = useState(false);

    useEffect(() => {
        console.log("Room ID:", id);
        refetch();
    }, [id, refreshSchedules, unassignedEmployee]);

    if (loading) {
        return <p>Loading...</p>
    }

    function handleUnassignEmployee(scheduleId, employeeId) {
        return () => {
            unassignEmployee({
                variables: {
                    id: scheduleId,
                    employeeId: employeeId
                },
            });
            setUnassignedEmployee(!unassignedEmployee);
        }
    }

    return (
        <Row>
            {data?.schedulesByRoomId?.map((schedule, index) =>
                <Col key={`room-${index}`} xs={12} sm={8} md={4} lg={3} className="mt-4">
                    <Card className='w-100' style={{ maxWidth: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{schedule.date}</Card.Title>
                            <ul className='list-unstyled'>
                                {schedule.assignedTo?.map((employee, index) =>
                                    <li key={index}>
                                        <p className='d-flex justify-content-between'>{employee.username}
                                            <Button onClick={handleUnassignEmployee(schedule._id, employee._id)} variant='light' size='sm' >X</Button>
                                        </p>
                                    </li>
                                )}
                            </ul>
                            <Link to={`/schedule/${schedule._id}`}>
                                <Button variant='primary'>Assign Employee</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            )}
        </Row>
    );
}