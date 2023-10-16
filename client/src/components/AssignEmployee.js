import { useForm } from 'react-hook-form';
import { Container, Row, Col, Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ASSIGN_EMPLOYEE } from '../utils/mutations';

export default function AssignEmployee() {
    const [assignEmployee] = useMutation(ASSIGN_EMPLOYEE)

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();


    const onSubmit = async (values, e) => {
        e.preventDefault();
        try {
            const { data } = await assignEmployee({
                variables: {
                    username: values.username,
                },
            });
            console.log(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col xs={12} sm={10} md={8} lg={6}>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <div className='border rounded text-center p-5'>
                            <FormGroup>
                                <FormLabel htmlFor='username'>Username</FormLabel>
                                <FormControl
                                    id='username'
                                    placeholder='username'
                                />
                                <Form.Text className='text-danger'>
                                    {errors.username && errors.username.message}
                                </Form.Text>
                            </FormGroup>
                        </div>
                        <div className='btn-wrapper text-center mt-3'>
                            <Button id='login-btn' disabled={isSubmitting} type='submit'>
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}