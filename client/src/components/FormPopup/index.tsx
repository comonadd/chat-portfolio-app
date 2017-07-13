/**
 * @file index.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';


interface FormPopupProps {
  children: React.ReactNode;
  onSubmit: (any) => ;
}

interface FormPopupState {

}

class FormPopup extends React.Component<FormPopupProps, FormPopupState> {
  constructor(...args: any[]) {
    // Call the parent class constructor
    super(...args)

    // Initialize the state
    this.state = {

    };
  }

  render() {
    return (
      <div className="">

      </div>
    );
  }
}
