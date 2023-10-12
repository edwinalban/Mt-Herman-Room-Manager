import { useForm } from 'react-hook-form';
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

export default function LoginForm() {
    const [login, { error }] = useMutation(LOGIN);

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
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='login-form' >
                <FormControl isInvalid={errors.name}>
                    <FormLabel id='login-name' htmlFor='name'>Username</FormLabel>
                    <Input
                        id='username'
                        placeholder='name'
                        {...register('username', {
                            required: 'This is required',
                        })}
                    />
                    <FormErrorMessage>
                        {errors.username && errors.username.message}
                    </FormErrorMessage>
                    <br></br>
                    <br></br>
                    <FormLabel id='login-password' htmlFor='password'>Password</FormLabel>
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
                </FormControl>
            </div>
            <div className='login-btn-wrapper'>
                <Button id='login-btn' isLoading={isSubmitting} type='submit'>
                    Submit
                </Button>
            </div>
        </form>
    )
};