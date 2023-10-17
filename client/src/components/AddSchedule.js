import { useForm } from 'react-hook-form';
import { Container, Row, Col, Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { ADD_SCHEDULE } from '../utils/mutations';

export default function AddScheduleForm() {
    const [addSchedule] = useMutation(ADD_SCHEDULE);
    const { id } = useParams();

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (values, e) => {
        e.preventDefault();
        try {
            const {data} = await addSchedule({
                variables: {
                    room: id,
                    date: values.date,
                },
            });
            console.log(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container>
        <Row className="mt-3">
            <Col>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className='border rounded text-center'>
                        <FormGroup>
                            <FormLabel htmlFor='date'>Date</FormLabel>
                            <FormControl
                                id='date'
                                placeholder='xx/xx/xx'
                                {...register('date', {
                                    required: 'This is required',
                                })}
                            />
                            <Form.Text className='text-danger'>
                                {errors.date && errors.date.message}
                            </Form.Text>
                        </FormGroup>
                    </div>
                    <div className='btn-wrapper text-center mt-3'>
                            <Button id='add-schedule-submit-btn' disabled={isSubmitting} type='submit'>
                                Submit
                            </Button>
                    </div>
                </Form>
            </Col>
        </Row>
    </Container> 
    )
};