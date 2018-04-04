import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authenticate, clearError } from '../actions/action_user';
import { Link, Redirect } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { message, Card, Alert } from 'antd';
import '../style/Login.css';
import logo from '../images/logo/small_01.png';
import BackgroundImage from '../components/BackgroundImage.jsx';
const FormItem = Form.Item;

// Setup Alert Message Configuration
message.config({
    top: window.innerHeight * 10 / 100,
    duration: 5,
});

class NormalLoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        }
    }

    componentDidUpdate() {
        if (this.props.loggedIn.error) {
            message.error(this.props.loggedIn.error);
            this.setState({ error: this.props.loggedIn.error });
            this.props.clearError();
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                this.props.authenticate(values.username, values.password);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { error } = this.state;
        const alert = error ? (
            <div className="login-alert">
                <Alert
                    message={error}
                    // description={error}
                    type="error"
                    showIcon
                />
            </div>
        ) : null;

        // If user is loged in (JWT stored in localStorage), redirect to homepage
        if (localStorage.getItem('jwt')) {
            return <Redirect to='/' />;
        }

        return (
            <div>
                <BackgroundImage />
                <div className='login-container'>
                    {/* {alert} */}
                    <Card className="card-container">
                        <div className='card-header'>
                            <img src={logo} alt="" height="64" width="64" />
                            <br></br><br></br>
                        </div>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <FormItem>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.5)' }} />} placeholder="Username" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.5)' }} />} type="password" placeholder="Password" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(
                                    <Checkbox>Remember me</Checkbox>
                                )}
                                <a className="login-form-forgot" href="">Forgot password?</a>
                                <Button size="large" type="primary" htmlType="submit" className="login-form-button">
                                    Log in
          					    </Button>
                                Or <Link to="/register">register now!</Link>
                            </FormItem>
                        </Form>
                    </Card>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { loggedIn: state.loggedIn };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ authenticate, clearError }, dispatch);
}

const WrappedLoginForm = Form.create()(NormalLoginForm);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedLoginForm);