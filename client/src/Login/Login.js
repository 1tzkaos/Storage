import React, { Component } from "react";
import swal from "sweetalert";
import { Button, TextField, Link } from "@material-ui/core";
// import fs from "fs";
import { withRouter } from "./utils";
import "./Login.css";
const axios = require("axios");
const bcrypt = require("bcryptjs");
let salt = bcrypt.genSaltSync(10);

// let config = JSON.parse(fs.readFileSync("config.json", "utf8"));

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  login = () => {
    const pwd = bcrypt.hashSync(this.state.password, salt);

    axios
      .post(`http://localhost:${5001}/login`, {
        username: this.state.username,
        password: pwd,
      })
      .then((res) => {
        localStorage.setItem("user_token", res.data.token);

        let token = /^(.*?)\./.exec(
          window.localStorage.getItem("user_token")
        )[1];

        this.sha256(token)
          .then((proofToken) => {
            console.log(proofToken);
            this.setState(
              {
                owner: proofToken,
                token: token,
              },
              () => {
                window.localStorage.setItem("owner", this.state.owner);
                window.localStorage.setItem("token", this.state.token);
                console.log(this.state.owner, this.state.token);
                this.props.navigate("/");
              }
            );
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.data &&
          err.response.data.errorMessage
        ) {
          swal({
            text: err.response.data.errorMessage,
            icon: "error",
            type: "error",
          });
        }
      });
  };
  sha256 = async (message) => {
    const msgBuffer = new TextEncoder("utf-8").encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => ("00" + b.toString(16)).slice(-2))
      .join("");
    return hashHex;
  };
  render() {
    return (
      <div style={{ marginTop: "200px" }}>
        <div>
          <h2>Login</h2>
        </div>

        <div>
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
            placeholder="User Name"
            required
          />
          <br />
          <br />
          <TextField
            id="standard-basic"
            type="password"
            autoComplete="off"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            placeholder="Password"
            required
          />
          <br />
          <br />
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            disabled={this.state.username === "" && this.state.password === ""}
            onClick={this.login}
          >
            Login
          </Button>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link
            // href="/register"
            component="button"
            style={{ fontFamily: "inherit", fontSize: "inherit" }}
            onClick={() => {
              this.props.navigate("/register");
            }}
          >
            Register
          </Link>
        </div>
      </div>
    );
  }
}

// export default withRouter(Login);
export default withRouter(Login);
