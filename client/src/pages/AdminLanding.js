import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import { useQuery } from '@apollo/client';
import { EMPLOYEES } from '../utils/queries';
import { useState } from 'react';

export default function AdminLanding() {
    const { data } = useQuery(EMPLOYEES);
    const [viewSchedules, setViewSchedules] = useState(Array(data?.Employees?.length).fill(false));

    if (!data || !data.Employees) {
        return <div>Loading...</div>;
    }

    const handleViewDetails = (index) => {
        setViewSchedules((cardsClicked) => {
            const viewedSchedules = [...cardsClicked];
            viewedSchedules[index] = !viewedSchedules[index];
            return viewedSchedules
        });
    };

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Navigation />
                    </Col>
                </Row>
                <Row className="d-flex flex-wrap justify-content-center">
                    {data?.Employees?.map((employee, index) =>
                        <Col key={index} xs={12} sm={6} md={4} lg={3} className="mt-4">
                            <Card className="w-100" style={{ maxWidth: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{employee.username}</Card.Title>
                                    <Button onClick={() => handleViewDetails(index)} variant="primary">View Schedules</Button>
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
};