import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Card } from 'antd';
import '../style/Login.css';
import logo from '../images/logo/small_01.png';
import BackgroundImage from './BackgroundImage.jsx';
const FormItem = Form.Item;

class NormalLoginForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <BackgroundImage />
                <div className='login-container'>
                    <Card className="card-container">
                        <div className='card-header'>
                            {/* <h1>Welcome</h1> */}
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

const WrappedLoginForm = Form.create()(NormalLoginForm);

export default WrappedLoginForm;