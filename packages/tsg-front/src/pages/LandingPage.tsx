import React from 'react';
import styled from 'styled-components';

// import Button from 'components/Button';
import Footer from 'components/Footer';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Header from 'components/Header';
import HeaderLinks from 'components/HeaderLinks';
import Parallax from 'components/Parallax';

import ProductSection from 'components/ProductSection';
import TeamSection from 'components/TeamSection';
import WorkSection from 'components/WorkSection';

import TennisCourtImage from 'static/tenniscourt2.jpg';
import { Container, TitleStyles } from 'styles/Theme';

const StyledContainer = styled(Container)`
  z-index: 12;
  color: #ffffff;
`;

const StyledTitle = styled.h1`
  ${TitleStyles};
  display: inline-block;
  position: relative;
  margin-top: 30px;
  min-height: 32px;
  color: #ffffff;
  text-decoration: none;
`;

const MainContainer = styled.div`
  background: #ffffff;
  position: relative;
  z-index: 3;
  margin: -60px 30px 0;
  border-radius: 6px;
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12),
    0 8px 10px -5px rgba(0, 0, 0, 0.2);
`;

export default class LandingPage extends React.Component {
  public render() {
    return (
      <div>
        <Header
          color="transparent"
          brand="Tennis Shop Guru"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 400,
            color: 'white',
          }}
        />
        <Parallax filter image={TennisCourtImage}>
          <StyledContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <StyledTitle>Your tennis shop simplified.</StyledTitle>
                <h4>
                  Tennis Shop Guru is a cloud based shop management system that organizes customer
                  string jobs and employee hours.
                </h4>
                <br />
                {/* <Button
                  buttonColor="danger"
                  size="large"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-play" />
                  Watch video
                </Button> */}
              </GridItem>
            </GridContainer>
          </StyledContainer>
        </Parallax>
        <MainContainer>
          <StyledContainer>
            <ProductSection />
            <TeamSection />
            <WorkSection />
          </StyledContainer>
        </MainContainer>
        <Footer />
      </div>
    );
  }
}
