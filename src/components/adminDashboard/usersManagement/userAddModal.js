import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addUser } from "../../../redux/actions/adminAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class UserAddModal extends React.Component {

    constructor() {
        super();
        this.state = {
            firstname: "",
            middlename: "",
            lastname: "",
            username: "",
            email: "",
            idnumber: "",
            mobile: "",
            dateofbirth: "",
            password: "",
            password2: "",
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        if (nextProps.auth !== undefined
            && nextProps.auth.user !== undefined
            && nextProps.auth.user.data !== undefined
            && nextProps.auth.user.data.message !== undefined) {
            $('#add-user-modal').modal('hide');
            toast(nextProps.auth.user.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onUserAdd = e => {
        e.preventDefault();
        const newUser = {
            firstname: this.state.firstname,
            middlename: this.state.middlename,
            lastname: this.state.lastname,
            username: this.state.username,
            email: this.state.email,
            mobile: this.state.mobile,
            idnumber: this.state.idnumber,
            dateofbirth: this.state.dateofbirth, 
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.addUser(newUser, this.props.history);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="add-user-modal" data-bs-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-bs-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onUserAdd} id="add-user">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="firstname">First Name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.firstname}
                                                id="firstname"
                                                type="text"
                                                error={errors.firstname}
                                                className={classnames("form-control", {
                                                    invalid: errors.firstname
                                                })}/>
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
                                                id="middlename"
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
                                                id="lastname"
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
                                                id="username"
                                                type="text"
                                                error={errors.username}
                                                className={classnames("form-control", {
                                                    invalid: errors.username
                                                })}/>
                                            <span className="text-danger">{errors.username}</span>
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
                                                id="idnumber"
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
                                            <label htmlFor="email">Email</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.email}
                                                error={errors.email}
                                                id="email"
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
                                            <label htmlFor="mobile">Phone Number</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.mobile}
                                                id="mobile"
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
                                                id="dateofbirth"
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
                                                autoComplete={''}
                                                onChange={this.onChange}
                                                value={this.state.password}
                                                error={errors.password}
                                                id="password"
                                                type="password"
                                                className={classnames("form-control", {
                                                    invalid: errors.password
                                                })}
                                            />
                                            <span className="text-danger">{errors.password}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="password2">Confirm Password</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                autoComplete={''}
                                                onChange={this.onChange}
                                                value={this.state.password2}
                                                id="password2"
                                                type="password"
                                                className={classnames("form-control", {
                                                    invalid: errors.password2
                                                })}
                                            />
                                            <span className="text-danger">{errors.password2}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button
                                    form="add-user"
                                    type="submit"
                                    className="btn btn-primary">
                                    Add User
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

UserAddModal.propTypes = {
    addUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addUser }
)(withRouter(UserAddModal));
