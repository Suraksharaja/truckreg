import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Input from "../../components/uielements/input";
import Checkbox from "../../components/uielements/checkbox";
import Button from "../../components/uielements/button";
import SignInStyleWrapper from "./signin.style";
import actions from '../../redux/login/action';
import Form from '../../components/uielements/form';

const {
  login
} = actions;

class SignIn extends Component {
  state = {
    redirectToReferrer: false
  };
  constructor(props) {
    super(props);
    this.state = {username: '', password: '', formValid: { errMsg: '', user: true, pwd: true }};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }
  handleChange(event) {
    const elemName = event.target.name;
    this.setState({	[elemName]: event.target.value});
  }
  handleLogin = () => {
    const { login, clearMenu } = this.props;
    login();
    clearMenu();
    this.props.history.push("/admin");
  };
  handleSubmit(event) {
    event.preventDefault();
    let self = this;
    self.setState({ formValid: { username: '', user: true, pwd: true } });
    if (this.state.username.length !== 0 && this.state.password.length !== 0) {
			if (this.state.username.includes('@') || this.state.username.length === 10) {
				try {
          this.props.login({ username: this.state.username, password: this.state.password, Login: true });
          
				} catch (e) {
					this.setState({ formValid: { errMsg: 'Invalid userId or Password', pwd: false, user: true } });
				}

			} else {
				this.setState({ formValid: { errMsg: 'Enter valid username', user: false, pwd: true } });
			}
		} else {
			this.setState({ formValid: { errMsg: 'Enter user name and password', pwd: false, user: true } });

		}
  }
  render() {
    const {
      loginError,
      viewError
    } = this.props;
    const from = { pathname: "/admin" };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                <img src="/14418836.jpg" alt=""/>
              </Link>
            </div>
            <Form onSubmit={this.handleSubmit}>
                <div className="isoInputWrapper">
                  <Input size="large" placeholder="Username" name="username" onChange={this.handleChange} required/>
                </div>
                <br/>
                <div className="error" hidden={this.state.formValid.user}>{this.state.formValid.errMsg}</div>
                <div className="isoInputWrapper">
                  <Input size="large" type="password" placeholder="Password" name="password" onChange={this.handleChange} required/>
                </div>
               
                <div className="error" hidden={viewError}> {loginError}</div>
                <div className="error" hidden={this.state.formValid.pwd}>{this.state.formValid.errMsg}</div>
                <div className="isoInputWrapper isoLeftRightComponent">
                  <Checkbox>
                    RememberMe
                  </Checkbox>
                  <br/><br/> <br/>
                  <Button type="primary" htmlType="submit">
                      Sign  In             
                  </Button>
                </div>
              </Form>
           
           
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.Login.toJS()
    
  };
}
export default connect(mapStateToProps, {
  login
})(SignIn);

