import React from "react";
import { Grid, Form, Header, Message } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import store from "store";
import 'semantic-ui-css/semantic.min.css';
import styles from "./styles.css";


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

  componentDidMount() {
    document.body.style.backgroundImage = 'url("https://usersnap.com/blog/wp-content/uploads/2017/04/web-design-background.png")';
  }

  onSubmit(e) {
    e.preventDefault();

    const { username, password } = this.state;

    this.setState({ error: false });

    if (!(username === "admin" && password === "pythonsucks")) {
      return this.setState({ error: true });
    }

    console.log("you're logged in. yay!");
    store.set("loggedIn", true);
    this.props.history.push("/home");
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  render() {
    const { error } = this.state;

    return (
      <div className="bgImg">
        <div>
      <Grid>
        <Helmet>
          <title>SES | Login</title>
        </Helmet>

        <Grid.Column width={6} />
        <Grid.Column width={4}>
          <Form
            className={styles.loginForm}
            error={error}
            onSubmit={this.onSubmit}
          >
            <Header as="h1">Login</Header>
            {error && (
              <Message
                error={error}
                content="Incorrect Credentials !!"
              />
            )}
            <Form.Input
              inline
              label="Username"
              name="username"
              onChange={this.handleChange}
            />
            <Form.Input
              inline
              label="Password"
              type="password"
              name="password"
              onChange={this.handleChange}
            />
            <Form.Button type="submit">Go!</Form.Button>
          </Form>
        </Grid.Column>
      </Grid>
      </div>
      </div>
    );
  }
}

export default Login;
