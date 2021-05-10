import React, { useState } from "react";
import { Content, DataContext } from "rsi-react-components";

const PageFlow = ({ initialData, children, location, history, pages, ...rest }) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initialData);
  
  const onComplete = () => {
    history.goBack();
  };

  const onCancel = () => {
    history.goBack();
  };


  const moveNextStep = () => {
    setStep((cs) => cs + 1);
  };

  const movePrevStep = () => {
    setStep((cs) => (cs > 0 ? cs - 1 : 0));
  };

  const getActivePage = () => {
    return pages[step];
  };

  const activePage = getActivePage();
  const PageComponent = activePage.Component;
  const compProps = {
    moveNextStep,
    movePrevStep,
    onComplete,
    onCancel,
    ...rest
  };

  const updateData = (updatedData) => {
    setData({...data, ...updatedData});
  }

  return (
    <DataContext.Provider value={[data, updateData]}>
      <Content>
        <PageComponent page={activePage} {...compProps} />
      </Content>
    </DataContext.Provider>
  );
};

export default PageFlow;
