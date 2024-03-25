import { Button, Card, Row, Col } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { SCHEDULES_BY_ROOM_ID } from '../utils/queries';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function SchedulesByRoomId({ refreshSchedules }) {
    const { id } = useParams();
    const { loading, data, refetch } = useQuery(SCHEDULES_BY_ROOM_ID, {
        variables: { roomId: id },
    });

    useEffect(() => {
            refetch();
    }, [id, refreshSchedules]);

    if (loading) {
        return <p>Loading...</p>
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
                                        <p>{employee.username}</p>
                                    </li>
                                )}
                            </ul>
                            <Link to={`/schedule/${schedule._id}`}>
                                <Button variant="primary">Assign Employee</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            )}
        </Row>
    );
}