import {
  addNotification,
  createFirebaseUser,
  hideModal,
  logout,
  showModal,
  signIn
} from "+/store/action";
import { RootState } from "+/store/root_state";
import { getCurrentUser, isAuthenticated } from "+/store/selectors";
import { User } from "+/store/types";
import { PROJ_GITHUB_LINK } from "+/util/constants";
import classnames from "classnames";
import React from "react";
import { connect } from "react-redux";
import { push as reactRouterReduxPush } from "react-router-redux";
import { bindActionCreators } from "redux";
import NavigationItem from "./components/Item";
import style from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface OwnProps {
  active: boolean;
}

interface ConnectedProps {
  currentUser?: User;
  authenticated: boolean;
  addNotification: typeof addNotification;
  reactRouterReduxPush: typeof reactRouterReduxPush;
  showModal: typeof showModal;
  hideModal: typeof hideModal;
  signIn: any;
  createFirebaseUser: any;
  logout: any;
}

interface State {
  mobileMenuShown: boolean;
}

class Navigation extends React.Component<OwnProps & ConnectedProps, State> {
  public state: State = {
    mobileMenuShown: false
  };

  private onLoginModalFormSubmit = (email: string, password: string) => {
    this.props.hideModal("login");
    this.props
      .signIn(email, password)
      .then(() => {
        this.props.addNotification("success", "Successfull log-in");
      })
      .catch((err: Error) => {
        this.props.addNotification("error", err.message);
      });
  };

  private toggleMobileMenu = () => {
    this.setState({
      ...this.state,
      mobileMenuShown: !this.state.mobileMenuShown
    });
  };

  private hideMobileMenu = () => {
    this.setState({
      ...this.state,
      mobileMenuShown: false
    });
  };

  public render() {
    const { authenticated, currentUser, showModal, hideModal } = this.props;

    interface NavigationMobileMenuButtonProps {
      onClick: any;
    }

    const NavigationMobileMenuButton = ({
      onClick
    }: NavigationMobileMenuButtonProps) => (
      <div className={style["navigation__mobile-menu-btn"]} onClick={onClick}>
        <FontAwesomeIcon icon={["fas", "bars"]} />
      </div>
    );

    const items: any = [
      {
        name: "Source Code",
        faIconParams: ["fab", "github"],
        onClick: () => {
          this.hideMobileMenu();
          window.location.href = PROJ_GITHUB_LINK;
        }
      },
      {
        name: "Issues",
        faIconParams: ["fas", "exclamation-circle"],
        onClick: () => {
          this.hideMobileMenu();
          window.location.href = `${PROJ_GITHUB_LINK}/issues`;
        }
      },
      {
        name: "Pull Requests",
        rel: false,
        url: `${PROJ_GITHUB_LINK}/pulls`,
        faIconParams: ["fas", "space-shuttle"],
        onClick: () => {
          this.hideMobileMenu();
          window.location.href = `${PROJ_GITHUB_LINK}/pulls`;
        }
      },
      ...(authenticated
        ? [
            {
              name: "Profile",
              faIconParams: ["fas", "user"],
              onClick: () => showModal("profile")
            },
            {
              name: "Logout",
              faIconParams: ["fas", "sign-out-alt"],
              onClick: () => {
                this.hideMobileMenu();
                this.props.logout();
                this.props.reactRouterReduxPush("/");
              }
            }
          ]
        : [
            {
              name: "Sign In",
              faIconParams: ["fas", "sign-in-alt"],
              onClick: () => showModal("login")
            },
            {
              name: "Sign Up",
              faIconParams: ["fas", "user-plus"],
              onClick: () => showModal("register")
            }
          ])
    ];

    const renderedItems = items.map((item: any) => (
      <NavigationItem
        key={item.name}
        name={item.name}
        faIconParams={item.faIconParams}
        onClick={item.onClick}
      />
    ));

    return (
      <div className={style["navigation"]}>
        <div
          className={classnames({
            [style["navigation__items"]]: true,
            [style["navigation__items_active"]]: this.state.mobileMenuShown
          })}
        >
          {renderedItems}
        </div>
        <NavigationMobileMenuButton onClick={this.toggleMobileMenu} />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => ({
  currentUser: getCurrentUser(state),
  authenticated: isAuthenticated(state)
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      addNotification,
      reactRouterReduxPush,
      createFirebaseUser,
      signIn,
      showModal,
      hideModal,
      logout
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
