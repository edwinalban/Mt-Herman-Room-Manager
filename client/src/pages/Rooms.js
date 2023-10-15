import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import { useQuery } from '@apollo/client';
import { ROOMS } from '../utils/queries';

export default function Room() {
    const { data } = useQuery(ROOMS);

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Navigation />
                    </Col>
                </Row>
                <Row>
                    {data?.Rooms?.map((room, index) =>
                        <Col key={index} xs={12} sm={6} md={4} lg={3} className="mt-4">
                            <Card style={{ maxWidth: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{`${room?.building} ${room?.roomNumber}`}</Card.Title>
                                    <Button variant="primary">View Details</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}
                </Row>
            </Container>
        </div>
    );
};