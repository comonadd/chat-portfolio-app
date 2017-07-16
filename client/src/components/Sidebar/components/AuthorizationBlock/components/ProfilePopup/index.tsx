/**
 * @file index.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';
import { connect as reactReduxConnect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { firebaseConnect, pathToJS } from 'react-redux-firebase';

import Popup from 'components/Popup';
import RootState from 'store/root_state';
import { addNotification } from 'store/ducks/notifications';
const style = require('./style');

const ProfileListItem = (props: ProfileListItemProps) =>
  <div className={style.profileList__item}>
    <div className={style.profileList__item__body}>
      <div className={style.profileList__item__body__name}>
        {props.name}
      </div>
      <div className={style.profileList__item__body__val}>
        {props.val}
      </div>
    </div>
  </div>;

const ProfileList = (props: any) =>
  <div className={style.profileList}>
    <ProfileListItem img={""} name="Username" val={props.profile.username} />
    <ProfileListItem img={""} name="Email" val={props.profile.email} />
    <ProfileListItem img={""} name="Firstname" val={props.profile.firstname} />
    <ProfileListItem img={""} name="Lastname" val={props.profile.lastname} />
  </div>;

export interface OwnProps {
  onSubmit: (username: string, password: string) => boolean;
  onRemoval: () => void;
}

interface ConnectedProps {
  profile: any,
  addNotification: typeof addNotification;
}

interface State {
}

class LoginPopup extends React.Component<OwnProps & ConnectedProps, State> {
  state: State = {};

  render() {
    const profile: any = this.props.profile || {};

    return (
      <Popup
        title={`${profile.username}'s Profile`}
        modal={true}
        onRemoval={this.props.onRemoval}
      >
        <ProfileList profile={profile} />
      </Popup>
    );
  }
}

export default firebaseConnect()(reactReduxConnect(
  (state: RootState, ownProps: OwnProps) => ({
    profile: pathToJS(state.firebase, 'profile'),
  }),
  (dispatch: any) => bindActionCreators({
    addNotification,
  }, dispatch),
)(LoginPopup));
