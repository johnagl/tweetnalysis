import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from '@material-ui/core/Container';
import axios from "axios";
import { Redirect } from "react-router-dom";
import React, { Component } from 'react';

interface Props {
    classes: any;
}
  
interface State {
    email: string;
    password: string;
    redirect: boolean;
}

class Login extends Component<Props, State > {
  constructor(props) {
    super(props);
    this.state = {
        email: "",
        password: "",
        redirect: false
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  //TODO: Fix type any
  handleEmailChange(e: any) {
    this.setState({ email: e.target.value });
  }

    //TODO: Fix type any
  handlePasswordChange(e: any) {
    this.setState({ password: e.target.value });
  }

  // TODO: Finish login
  async handleLogin() {
    let email = this.state.email;
    let password = this.state.password;
    console.log(email);
    console.log(password);
    const userData = {
      email,
      password
    };
    const res = await axios.post("http://localhost:4000/api/login", userData);
  }

  // TODO: Finish redirect
  redirectOnLogin() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      );
    }
  }

  render() {
    // TODO: Remove in line css, fix style
    return (
    <Container component="main" maxWidth="xs">
        {this.redirectOnLogin()}
        <form noValidate>
          <h1 style={{ color: "#ed6a5a", fontFamily: "Gochi Hand, cursive", textAlign: "center" }}>Tweetnalysis</h1>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={this.handleEmailChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={this.handlePasswordChange}
          />
          <Button
            style={{ backgroundColor: "#ed6a5a", marginTop: "1em" }}
            variant="contained"
            onClick={this.handleLogin}
            fullWidth
          >
            <span style={{ color: "white", fontFamily: "Gochi Hand, cursive", textAlign: "center", fontSize: "1.5em" }}>Sign In</span>
          </Button>
        </form>
      </Container>
    );
  }
}

export default Login;