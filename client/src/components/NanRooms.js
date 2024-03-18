import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import Navigation from './Navigation';
import { useQuery } from '@apollo/client';
import { NAN_ROOMS } from '../utils/queries';
import { Link } from 'react-router-dom';


export default function NanRooms() {
    const { loading, data } = useQuery(NAN_ROOMS);

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
                    {data?.nanRooms?.map((nanRoom, index) =>
                        <Col key={index} xs={12} sm={6} md={4} lg={3} className="mt-4">
                            <Card style={{ maxWidth: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{`${nanRoom.building} ${nanRoom.roomNumber}`}</Card.Title>
                                    <Link to={`/room/${nanRoom._id}`}>
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