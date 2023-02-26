import React, { useEffect, useState } from 'react'
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { useDispatch, useSelector } from 'react-redux';
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
  Anchor,
  PaperProps,
  Container,
  Stack,
  createStyles,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications'
import { AlertCircle } from 'tabler-icons-react'
import { authState, login, register, reset } from '../redux/slices/authSlice';
import { AppDispatch } from '../redux/store';
import HeadPage from '../components/HeadPage';
import NotFound from '../components/NotFound';

const useStyles = createStyles((theme) => ({
  root: {
    marginLeft: '2vw',
    marginRight: '2vw',
  },

  label: {
    marginBottom: "10px",
    color: "white",
  },

  required: {
    transition: 'opacity 150ms ease',
    opacity: 1,
  },

  input: {
    color: "white",
    backgroundColor: theme.colors.dark[3],
    '&::placeholder': {
      transition: 'color 150ms ease',
      color: 'transparent',
    },
  },
  description: {
    color: "red",
    backgroundColor: theme.colors.dark[3],
  },
}));


const Login = (props: PaperProps) => {
  const { classes } = useStyles();

  const [type, toggle] = useToggle(['Login', 'Create account']);
  const form = useForm({
    initialValues: {
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      confirm_password: '',
      terms: true,
    },
    validate: {
      //   first_name: (val) => val.length < 3,
      //  last_name: (val) => val.length < 3,
      //  email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      email: (val) => (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val) ? null : 'Invalid email'),
      password: (val) => val.length <= 1,
      //   confirm_password: (value, values) =>
      //    value !== values.password ? 'Password did not match' : null,
    },
  });

  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const userState = useSelector(authState)

  const { isError, isSuccess, message, id, isLoading } = userState

  const handleError = () => {
    showNotification({
      title: "Error ",
      message: `${message}`,
      color: 'red',
      icon: <AlertCircle />,
    })
  }
  const clearInput = () => {  
    form.setFieldValue('email', "")
    form.setFieldValue('first_name', "")
    form.setFieldValue('last_name', "")
    form.setFieldValue('password', "")
    form.setFieldValue('confirm_password', "")
  }

  const handelSubmit = () => {
    if (type === "Login") {
      const { email, password } = form.values
      const userInfo = {
        email: email,
        password: password
      }
      dispatch(login(userInfo))
    }

    else if (type === "Create account") {
      const { email, password, first_name, last_name } = form.values
      const userInfo = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password
      }
      dispatch(register(userInfo))
    }
  }



  useEffect(() => {

    if (isError) {
      handleError()
    }
    if (isSuccess) {
      clearInput()
      router.push("/")
    }
    dispatch(reset())

  }, [isError, isSuccess])

  /* if (id!==null )  // apprears for a second on login , might need adjustment
  return (
     <ErrorPage/>
  )
  else  */

  /* if (isLoading)
  return (
      <Loading />
  )
else */ if (id === null)
    return (
      <Container
        size="xs"
        px="xs"
        py={60}
        w="80vw"
      >
        <HeadPage
          title="Login"
          description="Welcome to Rate"
        />
        <Paper radius="md" p="xl" withBorder {...props} style={{ backgroundColor: "#25262B" }}>
          <Text
            size="lg"
            weight={500}
            color="white"
          >
            {type}
          </Text>
          <Divider my="lg" />
          <form onSubmit={form.onSubmit(handelSubmit)}>
            <Stack >
              {type === 'Create account' && (
                <>
                  <TextInput
                    size="md"
                    classNames={classes}
                    required
                    label="First Name"
                    placeholder="Your first name"
                    value={form.values.first_name}
                    onChange={(event) => form.setFieldValue('first_name', event.currentTarget.value)}
                    error={form.values.first_name.length < 3 && 'Short name'}
                  />
                  <TextInput
                    classNames={classes}
                    size="md"
                    required
                    label="Last Name"
                    placeholder="Your last name"
                    value={form.values.last_name}
                    onChange={(event) => form.setFieldValue('last_name', event.currentTarget.value)}
                    error={form.values.last_name.length < 3 && 'Short name'}
                  />
                </>
              )}
              <TextInput
                classNames={classes}
                size="md"
                required
                label="Email"
                placeholder="Your email"
                value={form.values.email}
                onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                error={form.errors.email && 'Invalid email'}
              />
              <PasswordInput
                classNames={classes}
                size="md"
                required
                label="Password"
                placeholder="Your password"
                value={form.values.password}
                onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                error={form.errors.password && 'Password should include at least 6 characters'}
              />
              {type === "Create account" &&
                <PasswordInput
                  classNames={classes}
                  size="md"
                  required
                  label="Confirm Password"
                  placeholder="Confirm password"
                  value={form.values.confirm_password}
                  onChange={(event) => form.setFieldValue('confirm_password', event.currentTarget.value)}
                  error={form.errors.confirm_password && 'Password did not match'}
                />
              }
            </Stack>
            <Group position="apart" mt="xl">
              <Anchor
                component="button"
                type="button"
                color="blue"
                onClick={() => {
                  clearInput()
                  toggle()
                }}
                size="md"
              >
                {type === 'Create account'
                  ? 'Already have an account? Login'
                  : "Don't have an account? Create account"}
              </Anchor>
              <Button type="submit">{upperFirst(type)}</Button>
            </Group>
          </form>
        </Paper>
      </Container>
    );
  else 
    return (
      <NotFound />
    )
}

export default Login
