import React from 'react';
import styled from 'styled-components';

// core components
import Button from 'components/Button';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Input from 'components/Input';
import { TitleStyles } from 'styles/Theme';

const StyledSection = styled.div`
  padding: 70px 0;
`;

const StyledTitle = styled.h2`
  ${TitleStyles};
  margin-bottom: 50px;
  margin-top: 30px;
  min-height: 32px;
  text-decoration: none;
  text-align: center;
`;

const StyledDescription = styled.h4`
  color: #999;
  text-align: center;
`;

const StyledGridItem = styled(GridItem)`
  text-align: center;
`;

export default class WorkSection extends React.Component {
  public render() {
    return (
      <StyledSection>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <StyledTitle>Work with us</StyledTitle>
            <StyledDescription>
              Divide details about your product work into parts. Write a few lines about each one
              and contact us about any further collaboration. We will responde get back to you in a
              couple of hours.
            </StyledDescription>
            <form>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <Input
                    labelText="Your Name"
                    id="name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <Input
                    labelText="Your Email"
                    id="email"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem>
                  <Input
                    labelText="Your Message"
                    id="message"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                    }}
                  />
                  <StyledGridItem>
                    <Button buttonColor="primary">Send Message</Button>
                  </StyledGridItem>
                </GridItem>
              </GridContainer>
            </form>
          </GridItem>
        </GridContainer>
      </StyledSection>
    );
  }
}
