import React, { FunctionComponent } from "react";


interface CustomerInfoComponentProps {
    state: {
        customerName: string;
        phoneNumber: string;
    };
    setState: (state: any) => void;
}

const CustomerInfoComponent: FunctionComponent<CustomerInfoComponentProps> = ({ state, setState }) => {
    return (
        <>
            <div>
                <label htmlFor="customer-name">Customer Name:</label>
                <input
                    type="text"
                    id="customer-name"
                    value={state.customerName}
                    onChange={(e) => setState({ ...state, customerName: e.target.value })}
                />
            </div>
            <div>
                <label htmlFor="phone-number">Phone Number:</label>
                <input
                    type="text"
                    id="phone-number"
                    value={state.phoneNumber}
                    onChange={(e) => setState({ ...state, phoneNumber: e.target.value })}
                />
            </div>
        </>
    );
};

export default CustomerInfoComponent;
