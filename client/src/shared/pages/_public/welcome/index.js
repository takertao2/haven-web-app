// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { xhvVsCurrenciesFetch } from "../../../../platforms/web/actions/xhvVsCurrencies.js";

// Relative Imports
import {
  Container,
  Microcopy,
  Buttons,
  Heading,
  Page,
  HeadingWrapper
} from "./styles";

import Footer from "../../../components/footer";
import Content from "../../../components/_public/welcome";
import Link from "../../../components/_buttons/link";
import Button from "../../../components/_buttons/button";

import api from "../../../../dummy/priceData.js";
import { AssetTableWeb } from "../../../../platforms/web/components/AssetTable/index.js";

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.contentRef = React.createRef();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  state = {
    oracle: api
  };

  handleClick = () => {
    window.scrollTo({
      top: this.contentRef.current.offsetTop,
      behavior: "smooth"
    });
  };

  render() {
    const windowWidth = window.innerWidth;

    return (
      <Page>
        <Container>
          <Microcopy>
            <HeadingWrapper>
              <Heading size={windowWidth < 340 && "44px"}>
                Private <br /> Decentralized Finance
              </Heading>
            </HeadingWrapper>
            <Buttons>
              <Link to="/create" label="Get Haven Vault" />
              <Button onClick={() => this.handleClick()} label="Learn More" />
            </Buttons>
          </Microcopy>
          <AssetTableWeb />
        </Container>
        <Content ref={this.contentRef} />
        <Footer />
      </Page>
    );
  }
}

export default Welcome;

const mapStateToProps = state => ({
  xhvVsCurrencies: state.xhvVsCurrencies
});

export const WelcomeAction = connect(
  mapStateToProps,
  {
    fetchCurrencies: xhvVsCurrenciesFetch
  }
)(Welcome);
