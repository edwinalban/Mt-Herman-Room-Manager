import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

import { useQuery } from '@apollo/client';
import { EMPLOYEES } from '../utils/queries';
import { useState } from 'react';

export default function AdminLanding() {
    const { data } = useQuery(EMPLOYEES);
    const [viewSchedules, setViewSchedules] = useState(Array(data?.Employees?.length).fill(false));
    console.log(data);

    const handleViewDetails = (index) => {
        setViewSchedules((cardsClicked) => {
            const viewedSchedules = [...cardsClicked];
            viewedSchedules[index] = !viewedSchedules[index];
            return viewedSchedules
        });
    };

    return (
        <Container>
            <div className="d-flex flex-wrap">
                {data?.Employees?.map((employee, index) =>
                <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 m-3">
                    <Card className="w-100" style={{ maxWidth: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{employee?.username}</Card.Title>
                            <Button onClick={() => handleViewDetails(index)} variant="primary">View Schedules</Button>
                            {viewSchedules[index] && (
                                <div>
                                    <p>Schedules:</p>
                                    {employee.schedules.map((schedule, scheduleIndex) => (
                                        <div key={scheduleIndex} className="border rounded p-3">
                                            <p>Room: {`${schedule.room.building} ${schedule.room.roomNumber}`}</p>
                                            <p>Next Cleaning Date: {schedule.room.nextCleaningDate}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </div>
                )}
            </div>
        </Container>
    );
};