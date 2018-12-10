import axios from '../../axios';
import notification from '../../components/notification';

const actions = {
    LOGIN_SUCCESS : 'LOGIN_SUCCESS',
	LOGIN_PENDING : 'LOGIN_PENDING',
	LOGIN_ERROR : 'LOGIN_ERROR',
	VIEW_ERROR : 'VIEW_ERROR',
	USER_LOGGEDIN : 'USER_LOGGEDIN',
  
    login: userInfo => {
        return (dispatch, getState) => {
            dispatch({
              type: actions.VIEW_ERROR,
              viewError: false,
            
            });
            dispatch({ type: actions.VIEW_ERROR, viewError: false});
		if (userInfo.Login === true) {
			
            axios.post('/api/login', {loginId: userInfo.username, password: userInfo.password})
			.then((data) => {
				if (data.status === 200 && data.data !== undefined) {
					localStorage.setItem(
						'userDetails',
						JSON.stringify({ userData: data.data })
          );
          notification('success', 'LoggedIn successfully!', ''); 
          window.location.replace("/admin");      
					dispatch({ type: actions.LOGIN_SUCCESS, payload: data.data});
					dispatch({ type: actions.LOGIN_PENDING, isLoginPending: false });
				} else {
					dispatch({ type: actions.LOGIN_ERROR, loginError: 'Invalid userId or Password'});
					dispatch({ type: actions.VIEW_ERROR, viewError: true});
				}

			})
			.catch (error => {
				dispatch({ type: actions.LOGIN_ERROR, loginError: error.response.data.message});
				dispatch({ type: actions.VIEW_ERROR, viewError: true});
			});
        } else {
            dispatch({ type: actions.LOGIN_SUCCESS, payload: userInfo});
        }
          };
    },
    logout: userInfo => {
      return (dispatch, getState) => {
        localStorage.clear();
        dispatch({ type: actions.VIEW_ERROR, viewError: userInfo });
        window.location.replace("/");  
      };
    },
    userLoggedIn: userInfo => {
      return (dispatch, getState) => {
       
        dispatch({
            type: actions.USER_LOGGEDIN, 
            payload: userInfo
        });
      };
      
    },
    loginPending: userInfo => {
        return (dispatch, getState) => {
          dispatch({ type: actions.LOGIN_PENDING, isLoginPending: userInfo });
        };
      },
      loginError: userInfo => {
        return (dispatch, getState) => {
         
          dispatch({
              type: actions.LOGIN_ERROR, 
              loginError: userInfo
          });
        };
    }
  };
  export default actions;
  