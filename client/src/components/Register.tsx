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
    confirmPassword: string;
    redirect: boolean;
}

class Register extends Component<Props, State > {
  constructor(props) {
    super(props);
    this.state = {
        email: "",
        password: "",
        confirmPassword: "",
        redirect: false
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handlePasswordChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  //TODO: Fix type any
  handleEmailChange(e: any) {
    this.setState({ email: e.target.value });
  }

    //TODO: Fix type any
  handlePasswordChange(e: any) {
    this.setState({ password: e.target.value });
  }

  //TODO: Fix type any
  handleConfirmPasswordChange(e: any) {
    this.setState({ confirmPassword: e.target.value });
  }

  // TODO: Finish login, better error handling
  async handleRegister() {
    let email = this.state.email;
    let password = this.state.password;
    const res = await axios.post("http://localhost:4000/api/register?" + 'email=' + email + '&password=' + password);
    if (res.status === 200) this.redirectOnLogin();
  }

  // TODO: Finish redirect
  redirectOnLogin() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/login",
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
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmpassword"
            label="ConfirmPassword"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={this.handlePasswordChange}
          />
          <Button
            style={{ backgroundColor: "#ed6a5a", marginTop: "1em" }}
            variant="contained"
            onClick={this.handleRegister}
            fullWidth
          >
            <span style={{ color: "white", fontFamily: "Gochi Hand, cursive", textAlign: "center", fontSize: "1.5em" }}>Register</span>
          </Button>
        </form>
      </Container>
    );
  }
}

export default Register;