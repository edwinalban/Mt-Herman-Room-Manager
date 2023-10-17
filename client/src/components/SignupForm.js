import { useForm } from 'react-hook-form';
import { Container, Row, Col, Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_EMPLOYEE } from '../utils/mutations';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

export default function SignupForm() {
    const [addEmployee] = useMutation(ADD_EMPLOYEE);

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (values, e) => {
        e.preventDefault();
        try {
            const newEmployee = await addEmployee({
                variables: {
                    username: values.username,
                    password: values.password,
                },
            });
            Auth.login(newEmployee.data.addEmployee.employee.token);
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
                                    {...register('username', {
                                        required: 'This is required',
                                    })}
                                />
                                <Form.Text className='text-danger'>
                                    {errors.username && errors.username.message}
                                </Form.Text>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel htmlFor='password'>Password</FormLabel>
                                <FormControl
                                    id='password'
                                    type="password"
                                    placeholder='password'
                                    {...register('password', {
                                        required: 'This is required',
                                    })}
                                />
                                <Form.Text className='text-danger'>
                                    {errors.password && errors.password.message}
                                </Form.Text>
                            </FormGroup>
                        </div>
                        <div className='btn-wrapper text-center mt-3'>
                            <Button id='add-btn' disabled={isSubmitting} type='submit'>
                                Submit
                            </Button>
                        </div>
                    </Form>
                    <div className='text-center mt-3'>
                        <Link to='/'>Already have an account? Log in here</Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
