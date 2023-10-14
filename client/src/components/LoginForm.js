import { useForm } from 'react-hook-form';
import { Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

export default function LoginForm() {
    const [login] = useMutation(LOGIN);

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()

    const onSubmit = async (values, e) => {
        e.preventDefault();
        try {
            const { data } = await login(
                {
                    variables: {
                        username: values.username,
                        password: values.password
                    }
                }
            );
            Auth.login(data.login.token);
        } catch (err) {
            console.error(err);
        }
        // route to appropriate landing page
    }

    return (
            <div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mt-5 border rounded text-center p-5 mx-auto'>
                        <FormGroup isInvalid={errors.name}>
                            <FormLabel className='form-name' id='login-name' htmlFor='username'>Username</FormLabel>
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
                            <br></br>
                            <br></br>
                            <FormLabel className='form-password' id='login-password' htmlFor='password'>Password</FormLabel>
                            <FormControl
                                id='password'
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
                    <div className='btn-wrapper'>
                        <Button id='login-btn' isLoading={isSubmitting} type='submit'>
                            Submit
                        </Button>
                    </div>
                </Form>
                <div className='text-center mt-3'>
                    <Link to='/signup'>Don't have an account? Sign up here</Link>
                </div>
            </div>
    )
};