 import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateUser } from "../../../redux/actions/adminAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class UserUpdateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.record.id,
            firstname: this.props.record.firstname,
            middlename: this.props.record.middlename,
            lastname: this.props.record.lastname,
            username: this.props.record.username,
            email: this.props.record.email,
            idnumber: this.props.record.idnumber,
            mobile: this.props.record.mobile,
            dateofbirth: this.props.record.dateofbirth,
            password: '',
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id,
                firstname: nextProps.record.firstname,
                middlename: nextProps.record.middlename,
                lastname: nextProps.record.lastname,
                username: nextProps.record.username,
                email: nextProps.record.email,
                idnumber: nextProps.record.idnumber,
                mobile: nextProps.record.mobile,
                dateofbirth: nextProps.record.dateofbirth,
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        if (nextProps.auth !== undefined
            && nextProps.auth.user !== undefined
            && nextProps.auth.user.data !== undefined
            && nextProps.auth.user.data.message !== undefined
            && nextProps.auth.user.data.success) {
            $('#update-user-modal').modal('hide');
            toast(nextProps.auth.user.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    onChange = e => {
        if (e.target.id === 'user-update-firstname') {
            this.setState({ firstname: e.target.value });
        }
        if (e.target.id === 'user-update-middlename') {
            this.setState({ middlename: e.target.value });
        }
        if (e.target.id === 'user-update-lastname') {
            this.setState({ lastname: e.target.value });
        }
        if (e.target.id === 'user-update-username') {
            this.setState({ username: e.target.value });
        }
        if (e.target.id === 'user-update-email') {
            this.setState({ email: e.target.value });
        }
        if (e.target.id === 'user-update-idnumber') {
            this.setState({ idnumber: e.target.value });
        }
        if (e.target.id === 'user-update-mobile') {
            this.setState({ mobile: e.target.value });
        }
        if (e.target.id === 'user-update-dateofbirth') {
            this.setState({ dateofbirth: e.target.value });
        }
        if (e.target.id === 'user-update-password') {
            this.setState({ password: e.target.value });
        }
    };

    onUserUpdate = e => {
        e.preventDefault();
        const newUser = {
            _id: this.state.id,
            firstname: this.state.firstname,
            middlename: this.state.middlename,
            lastname: this.state.lastname,
            username: this.state.username,
            email: this.state.email,
            idnumber: this.state.idnumber,
            mobile: this.state.mobile,
            dateofbirth: this.state.dateofbirth,
            password: this.state.password
        };
        this.props.updateUser(newUser);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="update-user-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Update User</h4>
                                <button type="button" className="close" data-bs-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onUserUpdate} id="update-user">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.id}
                                        id="user-update-id"
                                        type="text"
                                        className="d-none"/>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="firstname">First Name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.firstname}
                                                id="user-update-firstname"
                                                type="text"
                                                error={errors.firstname}
                                                className={classnames("form-control", {
                                                    invalid: errors.firstname
                                                })}/>
                                                 <small
              className="text-danger position-absolute"
              style={{
                top: "50%",
                right: "5px",
                transform: "translateY(-50%)",
              }}
            >
            </small>
                                            <span className="text-danger">{errors.firstname}</span>
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="middlename">Middle Name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.middlename}
                                                id="user-update-middlename"
                                                type="text"
                                                error={errors.middlename}
                                                className={classnames("form-control", {
                                                    invalid: errors.middlename
                                                })}/>
                                            <span className="text-danger">{errors.middlename}</span>
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="lastname">Last Name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.lastname}
                                                id="user-update-lastname"
                                                type="text"
                                                error={errors.lastname}
                                                className={classnames("form-control", {
                                                    invalid: errors.lastname
                                                })}/>
                                            <span className="text-danger">{errors.lastname}</span>
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="username">User Name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.username}
                                                id="user-update-username"
                                                type="text"
                                                error={errors.username}
                                                className={classnames("form-control", {
                                                    invalid: errors.username
                                                })}/>
                                                 <small
              className="text-danger position-absolute"
              style={{
                top: "50%",
                right: "5px",
                transform: "translateY(-50%)",
              }}
            >
            </small>
                                            <span className="text-danger">{errors.username}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="email">Email</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.email}
                                                error={errors.email}
                                                id="user-update-email"
                                                type="email"
                                                className={classnames("form-control", {
                                                    invalid: errors.email
                                                })}
                                            />
                                            <span className="text-danger">{errors.email}</span>
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="idnumber">ID Number</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.idnumber}
                                                id="user-update-idnumber"
                                                type="text"
                                                error={errors.idnumber}
                                                className={classnames("form-control", {
                                                    invalid: errors.idnumber
                                                })}/>
                                            <span className="text-danger">{errors.idnumber}</span>
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="mobile">Phone Number</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.mobile}
                                                id="user-update-mobile"
                                                type="text"
                                                error={errors.mobile}
                                                className={classnames("form-control", {
                                                    invalid: errors.mobile
                                                })}/>
                                            <span className="text-danger">{errors.mobile}</span>
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="dateofbirth">Date Of Birth</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.dateofbirth}
                                                id="user-update-dateofbirth"
                                                type="text"
                                                error={errors.dateofbirth}
                                                className={classnames("form-control", {
                                                    invalid: errors.dateofbirth
                                                })}/>
                                            <span className="text-danger">{errors.dateofbirth}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="password">Password</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                data-reset-input={true}
                                                autoComplete={''}
                                                onChange={this.onChange}
                                                error={errors.password}
                                                id="user-update-password"
                                                type="password"
                                                className={classnames("form-control", {
                                                    invalid: errors.password
                                                })}
                                            />
                                            <span className="text-danger">{errors.password}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button
                                    form="update-user"
                                    type="submit"
                                    className="btn btn-primary">
                                    Update User
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

UserUpdateModal.propTypes = {
    updateUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateUser }
)(withRouter(UserUpdateModal));