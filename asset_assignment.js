(function executeRule(current, previous) {

    // Retired assets cannot be assigned
    if (current.u_status == 'retired' &&
        !gs.nil(current.u_assigned_to)) {

        gs.addErrorMessage(
            'A retired asset cannot be assigned to a user.'
        );

        current.setAbortAction(true);
        return;
    }

    // Maintenance assets cannot be assigned
    if (current.u_status == 'maintenance' &&
        !gs.nil(current.u_assigned_to)) {

        gs.addErrorMessage(
            'Assets under maintenance cannot be assigned.'
        );

        current.setAbortAction(true);
        return;
    }

    // Automatically change status when an asset is assigned
    if (!gs.nil(current.u_assigned_to) &&
        current.u_status == 'available') {

        current.u_status = 'assigned';
    }

})(current, previous);
