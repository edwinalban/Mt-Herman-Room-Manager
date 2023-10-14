import { useForm } from 'react-hook-form';
import { Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_EMPLOYEE } from '../utils/mutations';
import Auth from '../utils/auth';

export default function SignupForm() {
    const [addEmployee] = useMutation(ADD_EMPLOYEE);

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()

    const onSubmit = async (values, e) => {
        console.log(values);
        e.preventDefault();
        try {
            const newEmployee = await addEmployee(
                {
                    variables: {
                        username: values.username,
                        password: values.password,
                        permissions: values.permissions
                    }
                }
            );
            Auth.login(newEmployee.data.addEmployee.employee.token);
        } catch (err) {
            console.error(err);
        }
        // route to employees page
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <div className='form-wrapper' >
                <FormGroup isInvalid={errors.name}>
                    <FormLabel className='form-name' id='signup-name' htmlFor='name'>Username</FormLabel>
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
                    <FormLabel className='form-password' id='signup-password' htmlFor='password'>Password</FormLabel>
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
                    <br></br>
                    <br></br>
                    <FormLabel id='permissions' htmlFor='permissions'>Permissions</FormLabel>
                </FormGroup>
            </div>
            <div className='btn-wrapper'>
                <Button id='add-btn' isLoading={isSubmitting} type='submit'>
                    Submit
                </Button>
            </div>
        </Form>
    )
};