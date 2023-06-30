import React, { FunctionComponent } from "react";

interface NotesComponentProps {
    state: { notes: string };
    setState: (state: any) => void;
}

const NotesComponent: FunctionComponent<NotesComponentProps> = ({ state, setState }) => {
    return (
        <div>
            <label htmlFor="notes">Notes:</label>
            <textarea
                id="notes"
                value={state.notes}
                onChange={(e) => setState({ ...state, notes: e.target.value })}
                rows={4}
                cols={50}
            />
        </div>
    );
};

export default NotesComponent;
