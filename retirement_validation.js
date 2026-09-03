(function executeRule(current, previous) {

    if (current.u_status == 'retired' &&
        previous.u_status != 'retired') {

        // Retirement date required
        if (gs.nil(current.u_retirement_date)) {

            gs.addErrorMessage(
                'Retirement date is required before retiring an asset.'
            );

            current.setAbortAction(true);
            return;
        }

        // Retired assets cannot remain assigned
        if (!gs.nil(current.u_assigned_to)) {

            gs.addErrorMessage(
                'Remove the assigned user before retiring the asset.'
            );

            current.setAbortAction(true);
            return;
        }

        // Retirement reason required
        if (gs.nil(current.u_retirement_reason)) {

            gs.addErrorMessage(
                'A retirement reason is required.'
            );

            current.setAbortAction(true);
        }
    }

})(current, previous);
