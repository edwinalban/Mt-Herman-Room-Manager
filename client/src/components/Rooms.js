import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import Navigation from './Navigation';
import { useQuery } from '@apollo/client';
import { ROOMS } from '../utils/queries';
import { Link } from 'react-router-dom';

export default function Rooms() {
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
                    {data?.rooms?.map((room, index) =>
                        <Col key={index} xs={12} sm={6} md={4} lg={3} className="mt-4">
                            <Card style={{ maxWidth: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{`${room.building} ${room.roomNumber}`}</Card.Title>
                                    <Link to={`/room/${room._id}`}>
                                        <Button variant="primary">View Details</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}
                </Row>
            </Container>
        </div>
    );
}