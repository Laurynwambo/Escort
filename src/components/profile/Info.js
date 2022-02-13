import React, { useState, useEffect} from 'react';
import Avatar from '../Avatar';
import EditProfile from './EditProfile';
import FollowBtn from '../FollowBtn';
// import Following from './Following';
// import Followers from './Followers';
import ChangePassword from './ChangePassword';
// import { GLOBALTYPES } from '../../redux/actions/globalTypes';

const Info = ({id, auth, profile, dispatch}) => {
    const [userData, setUserData] = useState([]);
    const [onEdit, setOnEdit] = useState(false);
    const [changePassword, setChangePassword] = useState(false);

    // const [showFollowers, setShowFollowers] = useState(false);
    // const [showFollowing, setShowFollowing] = useState(false);

    useEffect(() => {
      if (id === auth.user._id) {
          setUserData([auth.user]);
      }else{
        const newData = profile.users.filter(user => user._id === id);
        setUserData(newData);
      }
    }, [id, auth, dispatch, profile.users]);


    return (
      <div className="info">
        {userData.map((user) => (
          <div key={user._id} className="info_container">
            <div
              className="outer-shadow d-flex justify-content-center align-items-center"
              style={{ borderRadius: "50%", height: "170px", width: "170px" }}
            >
              <Avatar src={user.avatar} size="supper-avatar" />
            </div>

            <div className="info_content">
              <div className="info_content_title">
                <h2>{user.username}</h2>
                {user._id === auth.user._id ? (
                  <button
                    className="btn-1 outer-shadow hover-in-shadow"
                    onClick={() => setOnEdit(true)}
                  >
                    Edit Profile
                  </button>
                ) : (
                  <FollowBtn user={user} />
                )}
                {user._id === auth.user._id ? (
                  <button
                    className="btn-1 outer-shadow hover-in-shadow"
                    onClick={() => setChangePassword(true)}
                  >
                    change password
                  </button>
                ) : (
                  <FollowBtn user={user} />
                )}
              </div>

              <h6>
                {user.firstname}{" "}
              </h6>
              <h6>
                {user.middlename}{" "}
              </h6>
              <h6>
                {user.lastname}{" "}
              </h6>
              <h6>
                <span className="color-violet">{user.mobile}</span>
              </h6>
              <p className="m-0">{user.dateofbirth}</p>
              <h6>{user.email}</h6>
              <a
                style={{ textDecoration: "none" }}
                href={user.idnumber}
                target="_blank"
                rel="noreferrer"
              >
                {user.idnumber}
              </a>
            </div>

            {onEdit && <EditProfile setOnEdit={setOnEdit} />}
            {changePassword && <ChangePassword setChangePassword={setChangePassword} />}
          </div>
        ))}
      </div>
    );
}

export default Info
