import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {Button} from '../const/Button';


const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  padding: 30px;
  width: 50%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: white;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;
`;
const Title = styled.h1`
  font-size: 20px;
  font-weight: 300;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 40px 10px 0px 0px;
  padding: 15px;
`;
const CheckBoxWrapper = styled.div`
  margin: 30px 0 20px 0 ;
  text-align: center;
  ${mobile({ fontSize: "10px" })}
`;

const CheckBoxInput = styled.input`
`

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit
  } = useForm();
  const [isChecked, setisChecked] = useState(false);

  const onSubmit = async (data) => {

    const axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    };
    await axios
      .post("http://localhost:3500/api/auth/register", data, axiosConfig)
      .then((response) => {
        console.log(response);
        if(response.status === 201){
          navigate('/')
        }
        console.log(response.status)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="name" {...register("name")} />
          <Input placeholder="last name" {...register("lastName")} />
          <Input
            placeholder="email"
            {...register("email", {
              required: true,
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          <Input placeholder="username" {...register("username")} />
          <Input placeholder="password" {...register("password")} />
          <Input
            placeholder="confirm password"
            {...register("confirmPassword")}
          />
          <CheckBoxWrapper>
            <label>
              <CheckBoxInput type="checkbox" checked={isChecked} onChange={() => setisChecked(!isChecked)}/>
                {" "}
                By creating an account, I consent to the processing of my
                personal data in accordance with the <b>PRIVACY POLICY*</b>
            </label>
          </CheckBoxWrapper>
          <Button type="submit">Create</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
