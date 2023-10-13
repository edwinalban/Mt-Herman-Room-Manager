import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { useQuery } from '@apollo/client';
import { EMPLOYEES } from '../utils/queries';

export default function AdminLanding() {
    const { data } = useQuery(EMPLOYEES);

    return (
        <>
            {data?.Employees?.map((employee, index) =>
                <Card key={index} style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{employee?.username}</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>)}
        </>
    );
};