import { Card, Container, Row, Col } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { SCHEDULES_BY_DATE_RANGE } from '../utils/queries';
import { formatDate } from '../utils/formatDate';

export default function AdminLanding() {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    const { data, loading } = useQuery(SCHEDULES_BY_DATE_RANGE, {
        variables: {
            startDate: formatDate(today),
            endDate: formatDate(nextWeek)
        }
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
                <h2 className='text-center'>Active Schedules Snapshot</h2>
                <Row className='d-flex flex-wrap justify-content-center'>
                    {data?.schedulesByDateRange?.map((scheduleByDateRange, index) => (
                        <Col key={index} xs={12} sm={6} md={4} lg={3} className='mt-4 d-flex justify-content-center'>
                            <Link to={`/`}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{`${scheduleByDateRange.room.building} ${scheduleByDateRange.room.roomNumber}`}</Card.Title>
                                        <div>
                                            <p>Next cleaning date: {scheduleByDateRange.room.nextCleaningDate}</p>
                                            <p>Assigned to: {scheduleByDateRange.assignedTo.username}</p>
                                            <p>Notes: {scheduleByDateRange.room.notes}</p>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div >
    );
}