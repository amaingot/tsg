import React from 'react';
import styled from 'styled-components';

import Button from 'components/Button';
import Card from 'components/Card';
import CardBody from 'components/CardBody';
import CardFooter from 'components/CardFooter';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';

import Image from 'components/elements/Image';
import AlexImage from 'static/alexHD.jpg';
import ParentsImage from 'static/parentsHD.jpg';
import { CardTitleStyles, TitleStyles } from 'styles/Theme';

const Section = styled.div`
  padding: 70px 0;
  text-align: center;
`;

const StyledTitle = styled.h2`
  ${TitleStyles};
  margin-bottom: 1rem;
  margin-top: 30px;
  min-height: 32px;
  text-decoration: none;
`;

const SmallTitle = styled.small`
  color: #6c757d;
`;

const Description = styled.p`
  color: #999;
`;

const StyledCardTitle = styled.h4`
  ${CardTitleStyles};
`;

const StyledGridItem = styled(GridItem)`
  && {
    margin-left: auto;
    margin-right: auto;
  }
`;

const StyledCardFooter = styled(CardFooter)`
  /* this next line is supposed to be important */
  && {
    justify-content: center;
  }
`;

const StyledButton = styled(Button)`
  && {
    margin: 5px;
    color: transparent;
  }
`;

const SocialIcon = styled.i`
  margin-top: 0;
  width: 100%;
  transform: none;
  left: 0;
  top: 0;
  height: 100%;
  line-height: 41px;
  font-size: 20px;
  color: #999;
`;

class TeamSection extends React.Component {
  public render() {
    return (
      <Section>
        <StyledTitle>Here is our team</StyledTitle>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <Card plain>
                <StyledGridItem xs={12} sm={12} md={6}>
                  <Image raised roundedCircle fluid src={AlexImage} alt="..." />
                </StyledGridItem>
                <StyledCardTitle>
                  Alex Maingot
                  <br />
                  <SmallTitle>CEO / Founder</SmallTitle>
                </StyledCardTitle>
                <CardBody>
                  <Description>
                    Alex is a software engineer by day and entreprenuer by night. This is some sort
                    of bio that should impress everyone who reads it. Alex is a rather important
                    individual, and if you haven't realized it yet, you just did.
                  </Description>
                </CardBody>
                <StyledCardFooter>
                  <StyledButton
                    justIcon
                    target="_blank"
                    buttonColor="transparent"
                    href="https://twitter.com/alexmaingot"
                  >
                    <SocialIcon className="fab fa-twitter" />
                  </StyledButton>
                  <StyledButton
                    justIcon
                    buttonColor="transparent"
                    target="_blank"
                    href="https://instagram.com/alexmaingot"
                  >
                    <SocialIcon className="fab fa-instagram" />
                  </StyledButton>
                  <StyledButton
                    justIcon
                    buttonColor="transparent"
                    target="_blank"
                    href="https://www.linkedin.com/in/alexmaingot/"
                  >
                    <SocialIcon className="fab fa-linkedin" />
                  </StyledButton>
                </StyledCardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Card plain>
                <StyledGridItem xs={12} sm={12} md={6}>
                  <Image raised roundedCircle fluid src={ParentsImage} alt="..." />
                </StyledGridItem>
                <StyledCardTitle>
                  Gerry and Penny Maingot
                  <br />
                  <SmallTitle>Co-COOs / Co-Founders</SmallTitle>
                </StyledCardTitle>
                <CardBody>
                  <Description>
                    As individuals they are world reknown in their respective crafts, but together
                    they make the best parental duo in the known universe. They also have over 80
                    years of combined experience running tennis shops.
                  </Description>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </Section>
    );
  }
}

export default TeamSection;
