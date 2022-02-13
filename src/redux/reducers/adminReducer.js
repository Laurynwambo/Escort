import { ADMIN_TYPES } from "../actions/adminAction";
import { DeleteData } from "../actions/globalTypes";
import { USER_ADD } from "../actions/globalTypes";
import { USER_UPDATE } from "../actions/globalTypes";
import { SET_CURRENT_USER } from "../actions/globalTypes";
import { USER_LOADING } from "../actions/globalTypes";

const isEmpty = require("is-empty");

const initialState = {
    total_users: 0,
    total_posts: 0,
    total_comments: 0,
    total_likes: 0,
    total_active_users: 0,
    total_spam_posts: 0,
    spam_posts : [],
    user_add :[] ,
    user_update : []
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_TYPES.GET_TOTAL_USERS:
      return {
        ...state,
        total_users: action.payload.total_users,
      };
      case USER_ADD:
        return {
                ...state,
                user_add: action.payload.user_add,
            };
      case USER_UPDATE:
        return {
                  ...state,
                  user_update: action.payload.user_update,
              };
      case SET_CURRENT_USER:
        return {
                    ...state,
                    isAuthenticated: !isEmpty(action.payload),
                    user: action.payload
                };
      case USER_LOADING:
            return {
                ...state,
                loading: true
            };
    case ADMIN_TYPES.GET_TOTAL_POSTS:
      return {
        ...state,
        total_posts: action.payload.total_posts,
      };

    case ADMIN_TYPES.GET_TOTAL_COMMENTS:
      return {
        ...state,
        total_comments: action.payload.total_comments,
      };

    case ADMIN_TYPES.GET_TOTAL_LIKES:
      return {
        ...state,
        total_likes: action.payload.total_likes,
      };

    case ADMIN_TYPES.GET_TOTAL_SPAM_POSTS:
      return {
        ...state,
        total_spam_posts: action.payload.total_spam_posts,
      };

    case ADMIN_TYPES.GET_TOTAL_ACTIVE_USERS:
      return {
        ...state,
        total_active_users: action.payload,
      };

    case ADMIN_TYPES.LOADING_ADMIN:
      return {
        ...state,
        loading: action.payload,
      };

    case ADMIN_TYPES.GET_SPAM_POSTS:
      return {
        ...state,
        spam_posts: [...action.payload],
      };
    case ADMIN_TYPES.DELETE_POST:
      return {
        ...state,
        spam_posts: DeleteData(state.spam_posts, action.payload._id),
      };

    default:
      return state;
  }
};

export default authReducer;
