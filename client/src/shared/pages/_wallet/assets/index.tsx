// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { getForex, getSimplePrice } from "../../../actions";

// Relative Imports
import Body from "../../../components/_layout/body";
import Header from "../../../components/_layout/header";
import Overview from "../../../components/_layout/overview";
import Cell from "../../../components/cell";
import CellDisabled from "../../../components/cell_disabled";

import token from "../../../../constants/assets.js";
import { NO_PRICE } from "shared/reducers/priceHistory";
import { calcValue, convertToMoney } from "utility/utility";
import { Ticker } from "shared/reducers/types";
import { OFFSHORE_ENABLED } from "constants/env";
import { DesktopAppState } from "platforms/desktop/reducers";
import { XBalances } from "shared/reducers/xBalance";

interface AssetsProps {
  balances: XBalances;
  price: number;
  rates: { [key: string]: any };
  getSimplePrice: () => void;
  getForex: () => void;
}

interface AssetsState {}

const Enabled_TICKER = [Ticker.xUSD, Ticker.XHV];

class AssetsPage extends Component<AssetsProps, any> {
  state = {
    forexPriceFetched: false
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    if (this.props.price === NO_PRICE) {
      this.props.getSimplePrice();
      this.props.getForex();
    }
  }

  renderEnabledTokens = () => {
    if (!OFFSHORE_ENABLED) {
      return null;
    }

    const xUSDBalance = convertToMoney(
      this.props.balances.xUSD.unlockedBalance
    );
    const value = calcValue(xUSDBalance, 1);

    const enabledTokens = token.filter((asset: any) =>
      Enabled_TICKER.includes(("x" + asset.ticker) as Ticker)
    );
    return enabledTokens.map(data => {
      const { token, ticker, symbol } = data;

      const rates = this.props.rates;
      let price = rates[ticker] ? rates[ticker] : 0;
      price = symbol + price.toFixed(2);

      return (
        <Cell
          fullwidth="fullwidth"
          key={token}
          tokenName={token}
          ticker={"x" + ticker}
          price={price}
          change={value}
        />
      );
    });
  };

  renderDisabledTokens = () => {
    const disabledTokens = OFFSHORE_ENABLED
      ? token.filter(
          (asset: any) =>
            !Enabled_TICKER.includes(("x" + asset.ticker) as Ticker)
        )
      : token;

    return disabledTokens.map(data => {
      const { token, ticker, change, symbol } = data;

      const rates = this.props.rates;
      let price = rates[ticker] ? rates[ticker] : 0;
      price = symbol + price.toFixed(2);

      return (
        <CellDisabled
          fullwidth="fullwidth"
          key={token}
          tokenName={token}
          ticker={"x" + ticker}
          price={price}
          change={change}
        />
      );
    });
  };

  render() {
    const price =
      this.props.price === NO_PRICE || isNaN(this.props.price)
        ? "--"
        : this.props.price.toFixed(4);

    const xhvBalance = convertToMoney(this.props.balances.XHV.unlockedBalance);
    const value = calcValue(xhvBalance, this.props.price);

    return (
      <Body>
        <Overview />

        <Header
          title="Available Assets"
          description="Overview of all available Haven Assets"
        />

        <Cell
          fullwidth="fullwidth"
          key={1}
          tokenName={"Haven"}
          ticker={"XHV"}
          price={"$" + price}
          change={value}
        />
        {this.renderEnabledTokens()}
        <Header
          title="Coming Soon"
          description="Overview of Haven Assets coming soon"
        />
        {this.renderDisabledTokens()}
      </Body>
    );
  }
}

export const mapStateToProps = (state: DesktopAppState) => ({
  ...state.simplePrice,
  ...state.forex,
  balances: state.xBalance
});

export const Assets = connect(
  mapStateToProps,
  { getForex, getSimplePrice }
)(AssetsPage);
