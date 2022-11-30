import React ,{ useEffect }  from 'react'
import {  useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
//import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    Button,
    Divider,
    Checkbox,
    Anchor,PaperProps,Container , Stack
  } from '@mantine/core';
import { showNotification } from '@mantine/notifications'
import { AlertCircle } from 'tabler-icons-react'
//import { authState, login, register, reset } from '../redux/slices/authSlice';
//import { AppDispatch } from '../redux/store';
//import ErrorPage from '../components/ErrorPage';


const Login = (props: PaperProps ) => {
    const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm({
    initialValues: {
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      terms: true,
    },
    validate: {
      /*  email: (val) => /^\S+@\S+$/.test(val), */
     /*  password: (val) => val.length >= 1, */
    },
  });

  //const navigate = useNavigate()
  const router = useRouter()
  //const dispatch = useDispatch<AppDispatch>()

  //const userState = useSelector(authState)

  //const { isError, isSuccess ,message , id ,role} = userState

  /* const handleError = () => {
    showNotification({
      title: "Error ",
      message: `${message}`,
      color: 'red',
      icon: <AlertCircle />,
    })
  } */
  const clearInput = () => {  // not needed ?!
    form.setFieldValue('email', "")
    form.setFieldValue('first_name', "")
    form.setFieldValue('last_name', "")
    form.setFieldValue('password', "")
  }

  const handelSubmit = () => {

    // console.log("form", form.values)
    if (type === "login") {
      const { email, password } = form.values
      const userInfo = {
        email: email,
        password: password
      }
    // console.log("userInfo login", userInfo)
    //  dispatch(login(userInfo))
    }

    else if (type === "register") {
      const { email, password, first_name, last_name } = form.values
      const userInfo = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password
      }
    // dispatch(register(userInfo))
     
     // console.log("userInfo register ", userInfo)
    }
  }



  /* useEffect(() => {  
    
    if (isError) {
      handleError()
    }
    if (isSuccess && role==="user" ) {
      clearInput()
      router.push("/")
    }
    if (isSuccess && role==="admin" ) {
      clearInput()
      router.push("/adminPanel")
    }
    
   dispatch(reset())

  }, [isError, isSuccess]) */
  
   /* if (id!==null )  // apprears for a second on login , might need adjustment
   return (
      <ErrorPage/>
   )
   else  */
  return (
    <Container size="sm" px="xs" py={60}>
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500}>
        Welcome to E-Commerce, {type} with
      </Text>
      <Divider  my="lg" />
      <form onSubmit={form.onSubmit(handelSubmit)}>
        <Stack /* direction="column" */ >
          {type === 'register' && (
            <>
              <TextInput
                required
                label="First Name"
                placeholder="Your first name"
                value={form.values.first_name}
                onChange={(event) => form.setFieldValue('first_name', event.currentTarget.value)}
              />
              <TextInput
                required
                label="Last Name"
                placeholder="Your last name"
                value={form.values.last_name}
                onChange={(event) => form.setFieldValue('last_name', event.currentTarget.value)}
              />
            </>
          )}
          <TextInput
            required
            label="Email"
            placeholder="Your email"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
          />
          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
          />
          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )}
        </Stack>
        <Group position="apart" mt="xl">
          <Anchor component="button" type="button" color="blue" onClick={() => toggle()} size="sm">
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit">{upperFirst(type)}</Button>
        </Group>
      </form>
    </Paper>
    </Container>
  );
}

export default Login
