import React from "react";
import store from "store";
import { Helmet } from "react-helmet";
import "./vendor/bootstrap/css/bootstrap.min.css";
import "./fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "./vendor/animate/animate.css";
import "./vendor/css-hamburgers/hamburgers.min.css";
import "./vendor/select2/select2.min.css";
import "./css/util.css";
import "./css/main.css";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      error: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    //e.preventDefault();
    //console.log("in onsubmit()");

    const { username, password } = this.state;
    //console.log(username);
    //console.log(password);

    this.setState({ error: false });

    if (!(username === "admin" && password === "pythonsucks")) {
      this.setState({ error: true });
    } else {
      console.log("you're logged in. yay!");
      store.set("loggedIn", true);
      this.props.history.push("/home");
    }
  }

  handleChange(e) {
    //console.log(e.target.value)
    //console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { error } = this.state;
    //console.log(this.state.error);
    return (
      <div class="limiter">
        <Helmet>
          <script src="./vendor/jquery/jquery-3.2.1.min.js"></script>
          <script src="./vendor/bootstrap/js/popper.js"></script>
          <script src="./vendor/bootstrap/js/bootstrap.min.js"></script>
          <script src="./vendor/select2/select2.min.js"></script>
          <script src="./vendor/tilt/tilt.jquery.min.js"></script>

          <script src="js/main.js"></script>
        </Helmet>

        <div class="container-login100">
          <div class="wrap-login100">
            <div class="login100-pic js-tilt" data-tilt>
              <img src={require("./images/img-01.png")} alt="IMG" />
            </div>

            <form class="login100-form " onSubmit={this.onSubmit}>
              <span class="login100-form-title">Administrator Login</span>
              
                          
              <div class="wrap-input100 ">
                <input
                  class="input100"
                  type="text"
                  name="username"
                  placeholder="User ID"
                  onChange={this.handleChange}
                />
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                </span>
              </div>
              <div class="wrap-input100 ">
                <input
                  class="input100"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="fa fa-lock" aria-hidden="true"></i>
                </span>
              </div>
              <div class="container-login100-form-btn">
                <input
                  class="login100-form-btn"
                  type="submit"
                  value="Login"
                ></input>
                {error?(<h6>Invalid Credentials !!</h6>):null}
              </div>
            </form>
          </div>
        </div>
      </div>

      /*
      //       className={styles.loginForm}
      //       error={error}
      //       onSubmit={this.onSubmit}
      //     >
      //       <Header as="h1">Login</Header>
      //       {error && (
      //         <Message
      //           error={error}
      //           content="Incorrect Credentials !!"
      //         />
      //       )}
      //       <Form.Input
      //         inline
      //         label="Username"
      //         name="username"
      //         onChange={this.handleChange}
      //       />
      //       <Form.Input
      //         inline
      //         label="Password"
      //         type="password"
      //         name="password"
      //         onChange={this.handleChange}
      //       />
      //       <Form.Button type="submit">Go!</Form.Button>
      //     </Form>
      //   </Grid.Column>
      // </Grid>
      // </div>
      // </div>*/
    );
  }
}

export default Login;
