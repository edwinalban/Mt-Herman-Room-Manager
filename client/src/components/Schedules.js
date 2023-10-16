import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useLazyQuery } from '@apollo/client';
import { SCHEDULES_BY_ROOM_ID } from '../utils/queries';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function SchedulesByRoomId() {
    const { id } = useParams();
    const [schedulesByRoomId, { loading, data }] = useLazyQuery(SCHEDULES_BY_ROOM_ID, {
        variables: { roomId: id },
    });

    useEffect(() => {
        schedulesByRoomId(
            {
                variables: {
                    roomId: id
                }
            }
        )
    }, [id]);

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <Container>
            <Row>
                <Col xs={12} sm={6} md={4} lg={3} className="mt-4">
                    {data?.schedulesByRoomId?.map((schedule, index) =>
                        <Card key={`room-${index}`} style={{ maxWidth: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{schedule.date}</Card.Title>
                                <ul>
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
                    )}
                </Col>
            </Row>
        </Container>
    )
}