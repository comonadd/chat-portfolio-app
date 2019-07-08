import React from "react";
import RootState from "+/store/root_state";
import { LoginModal, ProfileModal, RegisterModal } from "+/components";
import { ModalsState } from "+/store/reducers/modals";
import style from "./style.module.scss";
import { getModalSystemInfo } from "+/store/selectors";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { hideModal, hideAllModals } from "+/store/action";

export interface ModalSystemConnectedProps {
  modals: ModalsState["modals"];
  hideModal: typeof hideModal;
  hideAllModals: typeof hideAllModals;
}

export class ModalSystem extends React.Component<
  ModalSystemConnectedProps,
  {}
> {
  public render() {
    const { modals, hideModal, hideAllModals } = this.props;
    const loginModalShown = modals.login.shown;
    const registerModalShown = modals.register.shown;
    const profileModalShown = modals.profile.shown;
    const anyModalsShown = Object.keys(modals)
      .map((modalName: string) => modals[modalName].shown)
      .some((a: boolean) => a);

    const loginModal = (() =>
      loginModalShown && <LoginModal onRemoval={() => hideModal("login")} />)();

    const registerModal = (() =>
      registerModalShown && (
        <RegisterModal onRemoval={() => hideModal("register")} />
      ))();

    const profileModal = (() =>
      profileModalShown && (
        <ProfileModal onRemoval={() => hideModal("profile")} />
      ))();

    const ModalOverlay = () => (
      <div
        onClick={hideAllModals}
        className={style["modal-overlay"]}
      />
    );

    return (
      <div className={style["modals"]}>
        {anyModalsShown && <ModalOverlay />}
        <React.Fragment>
          {loginModal}
          {registerModal}
          {profileModal}
        </React.Fragment>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  modals: getModalSystemInfo(state)
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      hideModal,
      hideAllModals
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalSystem);
