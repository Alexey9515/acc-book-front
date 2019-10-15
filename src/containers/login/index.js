import React from "react";
import {Input, Button, Form, Header, Message} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ModalDialog from "../../components/modal/modal-dialog";

import './style.css'

class LoginModal extends React.Component {
    state = {
        user: {
            login: '',
            password: ''
        }
    };

    login = () => {
        this.setState({...this.state, send: true, error: null});
        this.props.login(this.state.user);
    };

    changeData = (type, data) => {
        let user = this.state.user;
        user[type] = data;
        this.setState({...this.state, user: user});
    };

    render() {
        return (
            <ModalDialog onEmptyClickPlace={this.props.onEmptyClickPlace}>
                <div className='content login' onClick={(e) => e.stopPropagation()}>
                    <Header as='h4' block>Введите данные пользователя и нажмите Сохранить</Header>
                    <Form>
                        <Form.Field>
                            <Input onChange={(e) => this.changeData('login', e.target.value)} icon='at'
                                   iconPosition='left'
                                   placeholder='Логин' value={this.state.user.login}/>
                        </Form.Field>
                        <Form.Field>
                            <Input type='password' onChange={(e) => this.changeData('password', e.target.value)}
                                   icon='key'
                                   iconPosition='left'
                                   placeholder='Пароль' value={this.state.user.password}/>
                        </Form.Field>
                        <Button primary onClick={() => this.props.login(this.state.user)}>Сохранить</Button>
                    </Form>
                    {
                        this.props.error &&
                        <Message error>{this.props.error}</Message>
                    }
                </div>
            </ModalDialog>
        );
    }
}

LoginModal.propTypes = {
    error: PropTypes.string,
    login: PropTypes.func.isRequired,
    onEmptyClickPlace: PropTypes.func.isRequired
};

export default LoginModal;