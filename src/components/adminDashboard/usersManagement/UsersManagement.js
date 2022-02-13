import React, { Component, Fragment } from "react";
// import Navbar from "../navbar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons/faList";
import ReactDatatable from '@ashvin27/react-datatable';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import axios from "axios";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import UserAddModal from "../usersManagement/userAddModal";
import UserUpdateModal from "../usersManagement/userUpdateModal";

import { toast, ToastContainer} from "react-toastify";

class UsersManagement extends Component {

    constructor(props) {
        super(props);

        this.columns = [
            {
                key: "_id",
                text: "Id",
                className: "id",
                align: "center",
                width: "0.5px",
                height: "0.1px",
                sortable: true,

            },
            {
                key: "firstname",
                text: "FirstName",
                className: "firstname",
                align: "center",
                sortable: true,
            },
            {
              key: "middlename",
              text: "MiddleName",
              className: "middlename",
              align: "center",
              sortable: true,
           },
           {
            key: "lastname",
            text: "LastName",
            className: "lastname",
            align: "center",
            sortable: true,
            },
            {
              key: "username",
              text: "UserName",
              className: "username",
              align: "center",
              sortable: true,
            },
            {
                key: "email",
                text: "Email",
                className: "email",
                align: "center",
                sortable: true
            },
            {
              key: "idnumber",
              text: "IdNumber",
              className: "idnumber",
              align: "center",
              sortable: true,
            },
            {
              key: "mobile",
              text: "Mobile",
              className: "mobile",
              align: "center",
              sortable: true,
            },
            {
                key: "dateofbirth",
                text: "DateOfBirth",
                className: "dateofbirth",
                align: "center",
                sortable: true
            },
            {
                key: "action",
                text: "Action",
                className: "action",
                width: 50,
                align: "center",
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            <button
                                data-bs-toggle="modal"
                                data-bs-target="#update-user-modal"
                                className="btn btn-primary btn-sm"
                                onClick={() => this.editRecord(record)}
                                style={{marginRight: '0.5px'}}>
                                <i className="fa fa-edit"></i>
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => this.deleteRecord(record)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </Fragment>
                    );
                }
            }
        ];

        this.config = {
            page_size: 10,
            length_menu: [ 10, 20, 50 ],
            filename: "Users",
            no_data_text: 'No user found!',
            language: {
                length_menu: "Show _MENU_ result per page",
                filter: "Filter in records...",
                info: "Showing _START_ to _END_ of _TOTAL_ records",
                pagination: {
                    first: "First",
                    previous: "Previous",
                    next: "Next",
                    last: "Last"
                }
            },
            // show_length_menu: true,
            show_filter: true,
            show_pagination: true,
            show_info: true,
        };

        this.state = {
            records: []
        };

        this.state = {
            currentRecord: {
                id: '',
                firstname: '',
                middlename: '',
                lastname: '',
                username: '',
                email: '',
                idnumber: '',
                mobile: '',
                dateofbirth: '',
                password: '',
                password2: '',

            }
        };

        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData()
    };

    componentWillReceiveProps(nextProps) {
        this.getData()
    }

    getData() {
        axios
            .post("/api/user-data")
            .then(res => {
                this.setState({ records: res.data})
            })
            .catch()
    }

    editRecord(record) {
        this.setState({ currentRecord: record})
        
        
    }
   

    deleteRecord(record) {
        axios
            .post("/api/user-delete", {_id: record._id})
            .then(res => {
                if (res.status === 200) {
                   toast(res.data.message, {
                       position: toast.POSITION.TOP_CENTER,
                   })
                }
            })
            .catch();
        this.getData();
    }

    pageChange(pageData) {
        console.log("OnPageChange", pageData);
    }

    render() {
        return (
            <div>

                <div className="d-flex" id="wrapper">
                    <UserAddModal/>
                    <UserUpdateModal record={this.state.currentRecord}/>
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                        <button className="btn btn-link mt-3" id="menu-toggle"><FontAwesomeIcon icon={faList}/></button>
                            <button className="btn btn-outline-primary float-right mt-3 mr-2" data-bs-toggle="modal" data-bs-target="#add-user-modal" onClick={this.addUser}><FontAwesomeIcon icon={faPlus}/> Add User</button>
                            <h1 className="mt-2 text-primary">Users List</h1>
                            <ReactDatatable
                                config={this.config}
                                records={this.state.records}
                                columns={this.columns}
                                onPageChange={this.pageChange.bind(this)}
                            />
                        </div>
                    </div>
                    <ToastContainer/>
                </div>
            </div>
        );
    }

}

UsersManagement.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(UsersManagement);
