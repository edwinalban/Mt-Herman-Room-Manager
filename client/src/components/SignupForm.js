import { useForm } from 'react-hook-form';
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { ADD_EMPLOYEE } from '../utils/mutations';
import { Select } from '@chakra-ui/react';
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='form-wrapper' >
                <FormControl isInvalid={errors.name}>
                    <FormLabel className='form-name' id='signup-name' htmlFor='name'>Username</FormLabel>
                    <Input
                        id='username'
                        placeholder='username'
                        {...register('username', {
                            required: 'This is required',
                        })}
                    />
                    <FormErrorMessage>
                        {errors.username && errors.username.message}
                    </FormErrorMessage>
                    <br></br>
                    <br></br>
                    <FormLabel className='form-password' id='signup-password' htmlFor='password'>Password</FormLabel>
                    <Input
                        id='password'
                        placeholder='password'
                        {...register('password', {
                            required: 'This is required',
                        })}
                    />
                    <FormErrorMessage>
                        {errors.password && errors.password.message}
                    </FormErrorMessage>
                    <br></br>
                    <br></br>
                    <FormLabel id='permissions' htmlFor='permissions'>Permissions</FormLabel>
                    <Select placeholder='Select option'
                        {...register('permissions', {
                            required: 'This is required',
                        })}>
                        <option value='Admin'>Admin</option>
                        <option value='Assistant'>Assistant</option>
                        <option value='Employee'>Employee</option>
                    </Select>
                </FormControl>
            </div>
            <div className='btn-wrapper'>
                <Button id='add-btn' isLoading={isSubmitting} type='submit'>
                    Submit
                </Button>
            </div>
        </form>
    )
};