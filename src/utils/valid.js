const valid = ({ firstname, middlename, lastname, username, email, password, cf_password }) => {
    const err = {};

    if(!firstname){
        err.firstname = "Please add first name.";
    }else if(firstname.length > 25){
        err.firstname = "First name must be smaller than 25 characters.";
    }

    if(!middlename){
      err.middlename = "Please add middle name.";
  }else if(middlename.length > 25){
      err.middlename = "Middle name must be smaller than 25 characters.";
  }

  if(!lastname){
    err.lastname = "Please add last name.";
}else if(lastname.length > 25){
    err.lastname = "Last name must be smaller than 25 characters.";
}

    if (!username) {
      err.username = "Please add User name.";
    } else if (username.replace(/ /g, '').length > 25) {
      err.username = "User name must be smaller than 25 characters.";
    }

    if (!email) {
      err.email = "Please add Email.";
    }

    if (!password) {
      err.password = "Please add Password.";
    } else if (password.length < 6) {
      err.password = "Password must be al least 6 characters long.";
    }

    if (password !== cf_password) {
      err.cf_password = "Password does not match.";
    }

    return {
        errMsg: err,
        errLength: Object.keys(err).length  
    }
};

export default valid;