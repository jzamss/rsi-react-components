import React, { useState } from "react";
import { Page, DataContext } from "rsi-react-components";

const PageFlow = ({ initialData, children, location, pages, ...rest }) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initialData);
  const [contact, setContact] = useState({});

  const moveNextStep = () => {
    setStep((cs) => cs + 1);
  };

  const movePrevStep = () => {
    setStep((cs) => (cs > 0 ? cs - 1 : 0));
  };

  const onVerifyContact = (contact) => {
    setContact(contact);
  };

  const getActivePage = () => {
    return pages[step];
  };

  const activePage = getActivePage();
  const PageComponent = activePage.Component;
  const compProps = {
    moveNextStep,
    movePrevStep,
    onVerifyContact,
    contact,
    ...rest
  };

  const updateData = (updatedData) => {
    setData({...data, ...updatedData});
  }

  return (
    <DataContext.Provider value={[data, updateData]}>
      <Page>
        <PageComponent page={activePage} {...compProps} />
      </Page>
    </DataContext.Provider>
  );
};

export default PageFlow;
