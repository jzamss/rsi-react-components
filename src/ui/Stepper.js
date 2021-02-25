import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiStepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepButton from '@material-ui/core/StepButton';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: "transparent",
  },
  selectedStep: {
    color: "#27ae60 !important",
  },
}));

const Stepper = ({
  orientation: userOrientation,
  completedStep,
  handleStep,
  steps,
  activeStep
}) => {

  const classes = useStyles();
  const orientation = userOrientation || "vertical";

  const actualStep = completedStep > 0 ? completedStep - 1 : activeStep;
  return (
    <MuiStepper className={classes.root} activeStep={actualStep} orientation={orientation}>
    {steps.map((step, index) => {
      if (step.caption) {
        const stepProps = {};
        const labelProps = {};
        const selectedStepStyle = {};
        if (index === activeStep) {
          selectedStepStyle.completed = classes.selectedStep
        }

        let stepItems = <StepLabel {...labelProps}>{step.caption}</StepLabel>;

        if (handleStep && index <= completedStep) {
          stepItems = (
            <StepButton onClick={() => handleStep(index)} completed={index <= actualStep}>
              <StepLabel classes={selectedStepStyle} StepIconProps={{classes: selectedStepStyle}}
              {...labelProps}>{step.caption}</StepLabel>
            </StepButton>
          );
        }

        return (
          <Step key={step.caption} {...stepProps}>
            {stepItems}
          </Step>
        );
      }
    })}
  </MuiStepper>
  )
}

export default Stepper;
