import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import UserAvatar from "+/components/UserAvatar";
import Modal from "+/components/Modal";
import RootState from "+/store/root_state";
import { addNotification } from "+/store/action";
import { getCurrentUser, isAuthInProgress } from "+/store/selectors";
import { User } from "+/store/types";
import style from "./style.module.scss";

export interface ProfileModalOwnProps {
  onRemoval: () => void;
}

interface ProfileModalConnectedProps {
  currentUser: User;
  addNotification: typeof addNotification;
  authInProgress: boolean;
}

class UnconnectedProfileModal extends React.Component<
  ProfileModalOwnProps & ProfileModalConnectedProps,
  {}
> {
  public render() {
    const { currentUser, authInProgress } = this.props;

    interface ProfileListItemProps {
      name: string;
      val: string;
    }

    const ProfileListItem = (props: ProfileListItemProps) => (
      <div className={style["profile-list__item"]}>
        <div className={style["profile-list__item__body"]}>
          <div className={style["profile-list__item__body__name"]}>
            {props.name}
          </div>
          <div className={style["profile-list__item__body__val"]}>
            {props.val}
          </div>
        </div>
      </div>
    );

    const { onRemoval } = this.props;
    return (
      <Modal title={`${currentUser.username}'s Profile`} onRemoval={onRemoval}>
        <div className={style["profile-avatar"]}>
          <UserAvatar
            displayFullName={true}
            user={currentUser}
            loading={authInProgress}
          />
        </div>
        <div className={"profile-list"}>
          <ProfileListItem name="Username" val={currentUser.username} />
          <ProfileListItem name="Email" val={currentUser.email} />
          <ProfileListItem name="Firstname" val={currentUser.firstName} />
          <ProfileListItem name="Lastname" val={currentUser.lastName} />
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  currentUser: getCurrentUser(state),
  authInProgress: isAuthInProgress(state)
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      addNotification
    },
    dispatch
  );

export const ProfileModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedProfileModal);

export default ProfileModal;
