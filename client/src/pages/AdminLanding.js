import { Button, Container, Row, Col } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import { Link } from 'react-router-dom';

export default function AdminLanding() {
    const links = ['Lakeside', 'Laurel', 'Gwinn', 'Madrone', 'Maple', 'Oak', 'Fir', 'Pine', 'Manzanita', 'Sequoia', 'Woodward', 'Aspen', 'Birch', 'Buckeye', 'Misc']
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Navigation />
                    </Col>
                </Row>
                <Row className='d-flex flex-wrap justify-content-center'>
                    {links.map((link, index) => (
                    <Col key={index} xs={12} sm={6} md={4} lg={3} className='mt-4 d-flex justify-content-center'>
                        <Link to={`/${link}`}>
                            <Button variant='primary' className='me-4 mb-2' style={{ width: '10rem'}}>{link}</Button>
                        </Link>
                    </Col>
                    ))}
                </Row>
            </Container>
        </div >
    );
}