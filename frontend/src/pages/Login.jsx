import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext';
import {Button} from '../const/Button';




const Container = styled.div`
width: 100vw;
height: 100vh;
background-color: rgba(188, 188, 195, 1);
background-image: linear-gradient(90deg, rgba(188, 188, 195, 1) 0%, rgba(234, 234, 234, 1) 100%);
display: flex;
align-items: center;
justify-content: center;

`
const Wrapper = styled.div`
padding: 20px;
width: 50%;
height: 55vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border-radius: 20px;
background-color: white;

`
const Form = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const Title = styled.h1`
font-size: 20px;
font-weight: 300;
`
const Input = styled.input`
flex: 1;
min-width: 80%;
margin: 20px 10px 0px 0px;
padding: 10px;
`

const Login = () => {
  const {user, setUser} = useContext(UserContext);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    console.log(data);
    await axios
    .post('http://localhost:3500/api/auth/login', data, {
      headers: {
        'Content-Type': 'application/json',
    },   
    })
    .then((response) => {
      setUser(response.data)
    })
    .catch((err) => {
      console.log(err.response.data);
    })
    if (user){
      navigate('/', {state: {user}})
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title>LOG IN</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="username" {...register('username')} />
          <Input placeholder="password" {...register('password')}/>
          <Button style={{marginTop: '15px', marginBottom: '15px'}}>LOGIN</Button>
          {/* <Link to="" style={{color: "black", textDecoration:"none", marginBottom: "5px"}}>DO NOT REMEMBER PASSWORD?</Link> */}
          <Link to="/register" style={{color: "black", textDecoration:"none"}}>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Login