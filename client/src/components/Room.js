import { Card, Container, Row, Col } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { ROOM } from '../utils/queries';
import SchedulesByRoomId from './Schedules';

export default function Room() {
    const { id } = useParams();
    const { data, loading } = useQuery(ROOM, {
        variables: { id },
    });

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Navigation />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={6} md={4} lg={3} className="mt-4">
                        <Card style={{ maxWidth: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{`${data.room.building} ${data.room.roomNumber}`}</Card.Title>
                                <div>
                                    <p>Clean: {data.room.clean}</p>
                                    <p>Inspected: {data.room.inspected}</p>
                                    <p>Last Updated: {data.room.lastUpdated}</p>
                                    <p>Notes: {data.room.notes}</p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <SchedulesByRoomId />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};