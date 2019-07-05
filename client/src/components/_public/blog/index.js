// Library Imports
import React from "react";

// Relative Imports
import {
  Container,
  Cell,
  Description,
  Title,
  Avatar,
  Section,
  Wrapper,
  Image,
  Route,
  Aspect
} from "./styles";

import b1 from "../../../assets/blog/b_v1.svg";
import b2 from "../../../assets/blog/b_v2.svg";
import b3 from "../../../assets/blog/b_v3.svg";

const Content = () => {
  return (
    <Wrapper>
      <Container>
        <Cell>
          <Aspect>
            <Image src={b1} />
          </Aspect>
          <Title>Haven - Zelcore</Title>
          <Description>
            The Haven team is proud to announce we have been selected by
            Zelcore...
          </Description>
          <Route
            rel="noopener"
            target="_blank"
            href="https://medium.com/@havencurrency/haven-added-to-zelcore-ecosystem-ab3bb530153f"
          >
            Read More
          </Route>
        </Cell>

        <Cell>
          <Aspect>
            <Image src={b2} />
          </Aspect>
          <Title>Update - April 2019</Title>
          <Description>
            Since January, the Haven Protocol project has undergone many
            changes....
          </Description>
          <Route
            rel="noopener"
            target="_blank"
            href="https://medium.com/@havencurrency/haven-protocol-april-2019-update-ca2e911176c8"
          >
            Read More
          </Route>
        </Cell>
        <Cell>
          <Aspect>
            <Image src={b3} />
          </Aspect>
          <Title>Update - Jan 2019</Title>
          <Description>
            As many of you have noticed, the Haven Protocol team has expanded
            over recent days...
          </Description>
          <Route
            rel="noopener"
            target="_blank"
            href="https://medium.com/@havencurrency/update-from-the-haven-protocol-xhv-development-team-e1619b205834"
          >
            Read More
          </Route>
        </Cell>
      </Container>
    </Wrapper>
  );
};

export default Content;
