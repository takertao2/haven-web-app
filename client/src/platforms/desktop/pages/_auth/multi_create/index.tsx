// Library Imports
import React, { Component } from "react";

// Relative Imports
import {
  Title,
  Description as Subtitle
} from "../../../../../assets/styles/type.js";
import {
  Container,
  Main,
  Header,
  Footer,
  Route,
  Label,
  Tabs,
  Tab
} from "./styles";
import { RestoreDesktop } from "../restore";
import { DesktopAppState } from "../../../reducers";
import { connect } from "react-redux";
import { getSavedWallets } from "../../../actions/walletSession";
import { SavedWallet, selectIsLoggedIn } from "../../../reducers/walletSession";
import { Redirect } from "react-router";
import { OpenWalletDesktop } from "../open";
import { CreateDesktop } from "platforms/desktop/pages/_auth/create";

interface MultiloginState {
  loginType: LOGIN_TYPE;
}

interface MultiLoginProps {
  getSavedWallets: () => void;
  wallets: SavedWallet[] | null;
  isLoggedIn: boolean;
}

enum LOGIN_TYPE {
  Open,
  Create,
  Restore
}

class MultiLoginPage extends Component<MultiLoginProps, MultiloginState> {
  state: MultiloginState = {
    loginType: LOGIN_TYPE.Create
  };

  componentDidMount(): void {
    if (this.props.wallets === null) {
      this.props.getSavedWallets();
    }
  }

  selectRestore = () => {
    this.setState({
      loginType: LOGIN_TYPE.Restore
    });
  };

  selectCreate = () => {
    this.setState({
      loginType: LOGIN_TYPE.Create
    });
  };

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/wallet/assets" />;
    }
    const loginType = this.state.loginType;
    return (
      <Container>
        <Header>
          <Title>Create a Vault</Title>
          <Subtitle>
            To create a vault please generate a new vault or restore and
            existing one.
          </Subtitle>
        </Header>
        <Tabs>
          <Tab
            active={loginType === LOGIN_TYPE.Create}
            onClick={this.selectCreate}
          >
            Create Wallet
          </Tab>
          <Tab
            active={loginType === LOGIN_TYPE.Restore}
            onClick={this.selectRestore}
          >
            Restore Wallet
          </Tab>
        </Tabs>
        <Main>
          {loginType === LOGIN_TYPE.Restore && <RestoreDesktop />}
          {loginType === LOGIN_TYPE.Create && (
            <>
              <CreateDesktop />
            </>
          )}
          {loginType === LOGIN_TYPE.Open && (
            <OpenWalletDesktop wallets={this.props.wallets} />
          )}
        </Main>
        <Footer>
          <Label>Have a Vault already?</Label>
          <Route to={"/"}>Sign In</Route>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = (state: DesktopAppState) => ({
  wallets: state.walletSession.savedWallets,
  isLoggedIn: selectIsLoggedIn(state)
});

export const MultiCreateDesktop = connect(
  mapStateToProps,
  { getSavedWallets }
)(MultiLoginPage);
