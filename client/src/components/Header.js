import { Container, Row, Col } from 'react-bootstrap';

export default function Header() {
    return (
        <header style={{ height: '80px' }}>
            <Container fluid>
                <Row className="justify-content-center align-items-center">
                    <Col>
                        <h1 className="text-center">Mt. Herman Cleaning Schedule</h1>
                    </Col>
                </Row>
            </Container>
        </header>
    );
}
