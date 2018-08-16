import React from 'react';
import styled from 'styled-components';

import AvTimerRounded from '@material-ui/icons/AvTimerRounded';
import ContactPhoneRounded from '@material-ui/icons/ContactPhoneRounded';
import TrendingUpRounded from '@material-ui/icons/TrendingUpRounded';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import InfoArea from 'components/InfoArea';
import { TitleStyles } from 'styles/Theme';

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

const Description = styled.h5`
  color: #999;
`;

class ProductSection extends React.Component {
  public render() {
    return (
      <Section>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <StyledTitle>Let's talk shop</StyledTitle>
            <Description>
              Running a tennis shop these days isn't as easy as it used to be! Keeping up with the
              ever-presense of technology and online retailers is no small task. The Guru helps you
              gain a competitive edge by increasing the quality of your services experience.
            </Description>
          </GridItem>
        </GridContainer>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Customer Notifications"
                description="Every time you complete a string job, The Guru automatically notifies the customer that its time to pick up their racket!"
                icon={ContactPhoneRounded}
                iconColor="info"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Simple Reports"
                description="With The Guru, quickly find which strings are selling the most, which employee is stringing the most rackets, and much more!"
                icon={TrendingUpRounded}
                iconColor="success"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Hours Tracking"
                description="Say good bye to employee time cards! Your shop workers can eaisly login and to clock in and out for their shifts."
                icon={AvTimerRounded}
                iconColor="danger"
                vertical
              />
            </GridItem>
          </GridContainer>
        </div>
      </Section>
    );
  }
}

export default ProductSection;
