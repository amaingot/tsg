import cx from 'classnames';
import React from 'react';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import Button from 'components/Button';
import Card from 'components/Card';

import wizardStyle from 'styles/jss/components/wizardStyle';
import { CommonProps } from 'utils/commonProps';

interface Props extends CommonProps {
  steps: Array<{
    stepName: string;
    stepComponent: React.ComponentType<any>;
    stepId: string;
  }>;
  color: string; // 'primary' | 'warning' | 'danger' | 'success' | 'info' | 'rose';
  title?: string;
  subtitle?: string;
  previousButtonClasses?: string;
  previousButtonText?: string;
  nextButtonClasses?: string;
  nextButtonText?: string;
  finishButtonClasses?: string;
  finishButtonText?: string;
  finishButtonClick?: React.MouseEventHandler;
  validate?: boolean;
}

interface State {
  currentStep: number;
  color: string;
  nextButton: boolean;
  previousButton: boolean;
  finishButton: boolean;
  width: string;
  movingTabStyle: {
    transition: string;
  };
  allStates: any;
}

class Wizard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    let width: string;

    if (this.props.steps.length === 1) {
      width = '100%';
    } else {
      if (window.innerWidth < 600) {
        /* tslint:disable-next-line */
        if (this.props.steps.length !== 3) {
          width = '50%';
        } else {
          width = 100 / 3 + '%';
        }
      } else {
        if (this.props.steps.length === 2) {
          width = '50%';
        } else {
          width = 100 / 3 + '%';
        }
      }
    }

    this.state = {
      currentStep: 0,
      color: this.props.color,
      nextButton: this.props.steps.length > 1 ? true : false,
      previousButton: false,
      finishButton: this.props.steps.length === 1 ? true : false,
      width,
      movingTabStyle: {
        transition: 'transform 0s',
      },
      allStates: {},
    };

    this.wizard = React.createRef<HTMLDivElement>();
  }

  public wizard: React.RefObject<HTMLDivElement>;

  public static defaultProps = {
    color: 'rose',
    title: 'Here should go your title',
    subtitle: 'And this would be your subtitle',
    previousButtonText: 'Previous',
    previousButtonClasses: '',
    nextButtonClasses: '',
    nextButtonText: 'Next',
    finishButtonClasses: '',
    finishButtonText: 'Finish',
  };

  public componentDidMount() {
    this.refreshAnimation(0);
    window.addEventListener('resize', this.updateWidth);
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.updateWidth);
  }

  public updateWidth = () => {
    this.refreshAnimation(this.state.currentStep);
  };

  public navigationStepChange = (key: number) => () => {
    if (this.props.steps) {
      let validationState = true;
      if (key > this.state.currentStep) {
        for (let i = this.state.currentStep; i < key; i++) {
          if (this[this.props.steps[i].stepId].sendState !== undefined) {
            this.setState({
              allStates: [
                ...this.state.allStates,
                {
                  [this.props.steps[i].stepId]: this[this.props.steps[i].stepId].sendState(),
                },
              ],
            });
          }
          if (
            this[this.props.steps[i].stepId].isValidated !== undefined &&
            this[this.props.steps[i].stepId].isValidated() === false
          ) {
            validationState = false;
            break;
          }
        }
      }
      if (validationState) {
        this.setState({
          currentStep: key,
          nextButton: this.props.steps.length > key + 1 ? true : false,
          previousButton: key > 0 ? true : false,
          finishButton: this.props.steps.length === key + 1 ? true : false,
        });
        this.refreshAnimation(key);
      }
    }
  };

  public nextButtonClick = () => {
    if (
      (this.props.validate &&
        ((this[this.props.steps[this.state.currentStep].stepId].isValidated !== undefined &&
          this[this.props.steps[this.state.currentStep].stepId].isValidated()) ||
          this[this.props.steps[this.state.currentStep].stepId].isValidated === undefined)) ||
      this.props.validate === undefined
    ) {
      if (this[this.props.steps[this.state.currentStep].stepId].sendState !== undefined) {
        this.setState({
          allStates: [
            ...this.state.allStates,
            {
              [this.props.steps[this.state.currentStep].stepId]: this[
                this.props.steps[this.state.currentStep].stepId
              ].sendState(),
            },
          ],
        });
      }
      const key = this.state.currentStep + 1;
      this.setState({
        currentStep: key,
        nextButton: this.props.steps.length > key + 1 ? true : false,
        previousButton: key > 0 ? true : false,
        finishButton: this.props.steps.length === key + 1 ? true : false,
      });
      this.refreshAnimation(key);
    }
  };
  public previousButtonClick = () => {
    if (this[this.props.steps[this.state.currentStep].stepId].sendState !== undefined) {
      this.setState({
        allStates: [
          ...this.state.allStates,
          {
            [this.props.steps[this.state.currentStep].stepId]: this[
              this.props.steps[this.state.currentStep].stepId
            ].sendState(),
          },
        ],
      });
    }
    const key = this.state.currentStep - 1;
    if (key >= 0) {
      this.setState({
        currentStep: key,
        nextButton: this.props.steps.length > key + 1 ? true : false,
        previousButton: key > 0 ? true : false,
        finishButton: this.props.steps.length === key + 1 ? true : false,
      });
      this.refreshAnimation(key);
    }
  };
  public finishButtonClick = (e: React.MouseEvent) => {
    if (
      this.props.validate &&
      ((this[this.props.steps[this.state.currentStep].stepId].isValidated !== undefined &&
        this[this.props.steps[this.state.currentStep].stepId].isValidated()) ||
        this[this.props.steps[this.state.currentStep].stepId].isValidated === undefined) &&
      this.props.finishButtonClick !== undefined
    ) {
      this.props.finishButtonClick(e);
    }
  };
  public refreshAnimation = (index: number) => {
    const total = this.props.steps.length;
    let liWidth = 100 / total;
    const totalSteps = this.props.steps.length;
    let moveDistance =
      (this.wizard.current &&
        this.wizard.current.firstChild &&
        this.wizard.current.firstChild['offsetWidth'] / totalSteps) ||
      1;
    let indexTemp = index;
    let verticalLevel = 0;

    const mobileDevice = window.innerWidth < 600 && total > 3;

    if (mobileDevice) {
      moveDistance =
        (this.wizard.current &&
          this.wizard.current.firstChild &&
          this.wizard.current.firstChild['offsetWidth'] / 2) ||
        1;
      indexTemp = index % 2;
      liWidth = 50;
    }

    this.setState({ width: liWidth + '%' });

    const stepWidth = moveDistance;
    moveDistance = moveDistance * indexTemp;

    const current = index + 1;

    if (current === 1 || (mobileDevice === true && index % 2 === 0)) {
      moveDistance -= 8;
    } else if (current === totalSteps || (mobileDevice === true && index % 2 === 1)) {
      moveDistance += 8;
    }

    if (mobileDevice) {
      // It was this: verticalLevel = parseInt(index / 2, 10);
      verticalLevel = index / 2;
      verticalLevel = verticalLevel * 38;
    }
    const movingTabStyle = {
      width: stepWidth,
      transform: 'translate3d(' + moveDistance + 'px, ' + verticalLevel + 'px, 0)',
      transition: 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)',
    };
    this.setState({ movingTabStyle });
  };

  public render() {
    const { classes, title, subtitle, color, steps } = this.props;

    return (
      <div className={classes.wizardContainer} ref={this.wizard}>
        <Card className={classes.card}>
          <div className={classes.wizardHeader}>
            <h3 className={classes.title}>{title}</h3>
            <h5 className={classes.subtitle}>{subtitle}</h5>
          </div>
          <div className={classes.wizardNavigation}>
            <ul className={classes.nav}>
              {steps.map((prop, key) => {
                return (
                  <li className={classes.steps} key={key} style={{ width: this.state.width }}>
                    <a className={classes.stepsAnchor} onClick={this.navigationStepChange(key)}>
                      {prop.stepName}
                    </a>
                  </li>
                );
              })}
            </ul>
            <div
              className={classes.movingTab + ' ' + classes[color]}
              style={this.state.movingTabStyle}
            >
              {steps[this.state.currentStep].stepName}
            </div>
          </div>
          <div className={classes.content}>
            {steps.map((prop, key) => {
              const stepContentClasses = cx({
                [classes.stepContentActive]: this.state.currentStep === key,
                [classes.stepContent]: this.state.currentStep !== key,
              });
              return (
                <div className={stepContentClasses} key={key}>
                  <prop.stepComponent
                    innerRef={(node: any) => (this[prop.stepId] = node)}
                    allStates={this.state.allStates}
                  />
                </div>
              );
            })}
          </div>
          <div className={classes.footer}>
            <div className={classes.left}>
              {this.state.previousButton ? (
                <Button
                  className={this.props.previousButtonClasses}
                  onClick={() => this.previousButtonClick()}
                >
                  {this.props.previousButtonText}
                </Button>
              ) : null}
            </div>
            <div className={classes.right}>
              {this.state.nextButton ? (
                <Button
                  myColor="rose"
                  className={this.props.nextButtonClasses}
                  onClick={this.nextButtonClick}
                >
                  {this.props.nextButtonText}
                </Button>
              ) : null}
              {this.state.finishButton ? (
                <Button
                  myColor="rose"
                  className={this.props.finishButtonClasses}
                  onClick={this.finishButtonClick}
                >
                  {this.props.finishButtonText}
                </Button>
              ) : null}
            </div>
            <div className={classes.clearfix} />
          </div>
        </Card>
      </div>
    );
  }
}

export default withStyles(wizardStyle)(Wizard);
