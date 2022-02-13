import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { updateProfileUser } from "../../redux/actions/profileAction";

import { checkImage } from "../../utils/imageUpload";

const EditProfile = ({ setOnEdit }) => {
  const initialState = {
    firstname: "",
    middlename: "",
    lastname: "",
    mobile: "",
    dateofbirth: "",
    idnumbet: "",
    gender: "",
  };
  const [userData, setUserData] = useState(initialState);
  const { firstname, middlename, lastname, mobile, dateofbirth, idnumber, gender } = userData;
  const [avatar, SetAvatar] = useState("");
  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData(auth.user);
  }, [auth.user]);

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    const err = checkImage(file);
    if (err) {
      return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    }
    SetAvatar(file);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = e => {
      e.preventDefault();
      dispatch(updateProfileUser( {userData, avatar, auth} ) );
  };

  return (
    <div className="edit_profile">
      <button
        className="btn btn-danger btn_close"
        onClick={() => setOnEdit(false)}
      >
        Close
      </button>

      <form onSubmit={handleSubmit}>
        <div className="info_avatar">
          <img
            alt="profile"
            src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
            style={{ filter: theme ? "invert(1)" : "invert(0)" }}
          />
          <span>
            <i className="fas fa-camera" />
            <p>Change</p>
            <input
              type="file"
              name="file"
              id="file_up"
              accept="image/*"
              onChange={changeAvatar}
            />
          </span>
        </div>

        <div className="form_group">
          <label htmlFor="firstname">First Name</label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              id="firstname"
              name="firstname"
              value={firstname}
              onChange={handleInput}
            />
            <small
              className="text-danger position-absolute"
              style={{
                top: "50%",
                right: "5px",
                transform: "translateY(-50%)",
              }}
            >
              {firstname.length}/25
            </small>
          </div>
        </div>

        <div className="form_group">
          <label htmlFor="middlename">Middle Name</label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              id="middlename"
              name="middlename"
              value={middlename}
              onChange={handleInput}
            />
            <small
              className="text-danger position-absolute"
              style={{
                top: "50%",
                right: "5px",
                transform: "translateY(-50%)",
              }}
            >
              {middlename.length}/25
            </small>
          </div>
        </div>

        <div className="form_group">
          <label htmlFor="lastname">Last Name</label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              id="lastname"
              name="lastname"
              value={lastname}
              onChange={handleInput}
            />
            <small
              className="text-danger position-absolute"
              style={{
                top: "50%",
                right: "5px",
                transform: "translateY(-50%)",
              }}
            >
              {lastname.length}/25
            </small>
          </div>
        </div>

        <div className="form_group">
          <label htmlFor="mobile">Mobile</label>

          <input
            type="text"
            className="form-control"
            id="mobile"
            name="mobile"
            value={mobile}
            onChange={handleInput}
          />
        </div>

        <div className="form_group">
          <label htmlFor="dateofbirth">Date Of Birth</label>

          <input
            type="text"
            className="form-control"
            id="dateofbirth"
            name="dateofbirth"
            value={dateofbirth}
            onChange={handleInput}
          />
        </div>

        <div className="form_group">
          <label htmlFor="idnumber">ID NUMBER</label>

          <input
            type="text"
            className="form-control"
            id="idnumber"
            name="idnumber"
            value={idnumber}
            onChange={handleInput}
          />
        </div>

        <label htmlFor="gender">Gender</label>
        <div className="input-group-prepend px-0 mb-4">
          <select
            className="custom-select text-capitalize"
            name="gender"
            id="gender"
            onChange={handleInput}
            value={gender}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <button className="btn btn-info w-100" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
