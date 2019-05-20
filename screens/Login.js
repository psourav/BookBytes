import React from "react";
import { Alert, StyleSheet } from "react-native";
import { Container, Content } from "native-base";
import LoginDialog from "../components/LoginDialog";
import { PropTypes } from "prop-types";
import Parse from "parse/react-native";
class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  usernameChange = function(text) {
    this.setState({ ...this.state, username: text });
  };
  passwordChange = function(text) {
    this.setState({ ...this.state, password: text });
  };
  handleLogin = function() {
    let user = new Parse.User();

    user.setUsername(this.state.username);
    user.setPassword(this.state.password);
    // console.log(this.state.username);
    // console.log(this.state.password);
    user
      .logIn()
      .then(currentUser => {
        // console.log("Current users ID = " + currentUser.id);
        if (currentUser) {
          this.props.navigation.navigate("Home");
        }
      })
      .catch(err => {
        Alert.alert(err.message);
      });
  };
  handleSignup = function() {
    let user = new Parse.User();

    user.setUsername(this.state.username);
    user.setPassword(this.state.password);
    user.set("Reading", []);
    user.set("Completed", []);
    user.set("Dropped", []);
    user.set("On_hold", []);

    // console.log(this.state.username);
    // console.log(this.state.password);
    user
      .signUp()
      .then(currentUser => {
        // console.log("Current users ID = " + currentUser.id);
        if (currentUser) {
          this.props.navigation.navigate("Home");
        }
      })
      .catch(err => {
        Alert.alert(err.message);
      });
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content
          style={styles.loginForm}
          contentContainerStyle={{ justifyContent: "center", flex: 1 }}
        >
          <LoginDialog
            handleLogin={this.handleLogin.bind(this)}
            handleSignup={this.handleSignup.bind(this)}
            usernameChange={this.usernameChange.bind(this)}
            passwordChange={this.passwordChange.bind(this)}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  loginForm: {
    width: "75%"
  }
});

Login.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default Login;
