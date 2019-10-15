import React from 'react';
import PropTypes from 'prop-types';
import {Button, Input, Table} from 'semantic-ui-react'

class UsersTable extends React.Component {

    renderUsers = () => {
        const {
            users, handleDblClickRow,
            handleChangeEditable, editableUser,
            handleSaveEditable
        } = this.props;

        return (
            <Table.Body>
                {users && users.map((user) => (
                    <Table.Row key={user.id}>
                        <Table.Cell>{user.name}</Table.Cell>
                        <Table.Cell onDoubleClick={() => handleDblClickRow(user.id)}>
                            {
                                editableUser !== user.id &&
                                `${user.salary} Р`
                            }
                            {
                                editableUser === user.id &&
                                <div>
                                    <Input size='small'
                                           type='number'
                                           value={user.salary}
                                           onChange={handleChangeEditable}/>Р
                                </div>
                            }
                        </Table.Cell>
                        <Table.Cell>
                            <Button
                                onClick={handleSaveEditable}
                                disabled={editableUser !== user.id}
                                primary
                                size='small'>
                                Сохранить
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        );
    };

    render() {
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Имя Сотрудника</Table.HeaderCell>
                        <Table.HeaderCell>Оклад</Table.HeaderCell>
                        <Table.HeaderCell/>
                    </Table.Row>
                </Table.Header>

                {this.renderUsers()}

                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell colSpan='4'>
                            <Button
                                onClick={this.props.handleAddUser}
                                primary
                                size='small'>
                                Добавить сотрудника
                            </Button>
                            <Button size='small' floated='right' onClick={this.props.deleteAll}>
                                Удалить все
                            </Button>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }

};

UsersTable.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        salary: PropTypes.number.isRequired
    })),
    editableUser: PropTypes.number,
    handleDblClickRow: PropTypes.func.isRequired,
    handleChangeEditable: PropTypes.func.isRequired,
    handleSaveEditable: PropTypes.func.isRequired,
    deleteAll: PropTypes.func.isRequired,
    handleAddUser: PropTypes.func.isRequired
};
export default UsersTable;