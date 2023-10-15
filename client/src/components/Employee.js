import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { useQuery } from '@apollo/client';
import { EMPLOYEE } from '../utils/queries';

export default function Employee() {
    const { data } = useQuery(EMPLOYEE);

    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{data.employee?.schedule}</Card.Title>
                    <Button variant="primary">Update Schedule</Button>
                </Card.Body>
            </Card>
        </>
    );
};