import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { debounce } from 'lodash';

import UserMenu from '../views/UserMenu';

import { connect } from 'react-redux';
import { StoreState } from '../modules';
import { adminSlice } from '../modules/admin';
import { signinSlice } from '../modules/signin';
import { userSlice } from '../modules/user';
import { bindActionCreators } from 'redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import axios from 'axios';
import server from '../server';

interface SigninContainerProps {
  isAdmin: boolean;
  isLogin: boolean;
  idInput: string;
  pwInput: string;
  SigninActions: any;
  UserActions: any;
  AdminActions: any;
}

const SigninContainer: React.FunctionComponent<SigninContainerProps> = ({
  isAdmin,
  isLogin,
  idInput,
  pwInput,
  SigninActions,
  UserActions,
  AdminActions,
}: SigninContainerProps) => {
  //
  let version: string;
  if (isAdmin) {
    version = '관리자';
  } else {
    version = '고객';
  }

  const handleIdInputChange = (value: string): any => {
    SigninActions.changeIdInput(value);
  };

  const debouncedHandleIdInputChange = debounce(handleIdInputChange, 500);

  const handlePwInputChange = (value: string): any => {
    SigninActions.changePwInput(value);
  };

  const debouncedHandlePwInputChange = debounce(handlePwInputChange, 500);

  const signupButton = (
    <Link to="/user/signup" style={{ color: 'inherit', textDecoration: 'inherit' }}>
      <Button style={{ width: 100, marginRight: 10 }} variant="outlined">
        Sign up
      </Button>
    </Link>
  );

  function onClickSignin(isAdmin: boolean) {
    if (isAdmin) {
      SigninActions.axiosAdminSigninRequest({
        email: idInput,
        password: pwInput,
      });
    } else {
      SigninActions.axiosUserSigninRequest({
        email: idInput,
        password: pwInput,
      });
    }
  }

  const signinButton = (isAdmin: boolean): JSX.Element => {
    return (
      <Button
        style={{ width: 100, marginRight: 10 }}
        variant="outlined"
        onClick={() => {
          onClickSignin(isAdmin);
        }}
      >
        Sign in
      </Button>
    );
  };

  if (!isLogin) {
    return (
      <div style={{ textAlign: 'center' }}>
        <UserMenu isLogin={isLogin} />
        <div style={{ marginTop: 300 }}>{version}로그인</div>
        <div style={{ marginTop: 10 }}></div>
        <div>
          <TextField
            style={{ width: 400 }}
            id="outlined-basic"
            label="Login"
            variant="outlined"
            onChange={(event): void => {
              const { value } = event.target;
              debouncedHandleIdInputChange(value);
            }}
          />
        </div>
        <div style={{ marginTop: 10 }}></div>
        <div>
          <TextField
            style={{ width: 400 }}
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            onChange={(event): void => {
              const { value } = event.target;
              debouncedHandlePwInputChange(value);
            }}
          />
        </div>
        <div style={{ marginTop: 10 }}></div>
        <div>
          {isAdmin ? null : signupButton}
          {signinButton(isAdmin)}
        </div>
      </div>
    );
  } else {
    if (isAdmin) {
      return <Redirect to="/admin/event-list" />;
    }
    return <Redirect to="/" />;
  }
};

export default connect(
  ({ signin, user, admin }: StoreState) => ({
    idInput: signin.idInput,
    pwInput: signin.pwInput,
    isLogin: user.isLogin,
  }),
  dispatch => ({
    SigninActions: bindActionCreators(signinSlice.actions, dispatch),
    UserActions: bindActionCreators(userSlice.actions, dispatch),
    AdminActions: bindActionCreators(adminSlice.actions, dispatch),
  }),
)(SigninContainer);
