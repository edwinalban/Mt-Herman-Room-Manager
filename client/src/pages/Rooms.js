import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { useQuery } from '@apollo/client';
import { ROOMS } from '../utils/queries';
import Auth from '../utils/auth';

export default function Room() {
    const { data } = useQuery(ROOMS);

    return (
        <>
            {data?.Rooms?.map((room, index) =>
                <Card key={index} style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{`${room?.building} ${room?.roomNumber}`}</Card.Title>
                        <Button variant="primary">View Details</Button>
                    </Card.Body>
                </Card>)}
        </>
    );
};