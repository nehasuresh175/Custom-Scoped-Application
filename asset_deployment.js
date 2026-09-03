(function executeRule(current, previous) {

    // Detect first assignment
    if (current.u_assigned_to.changes() &&
        !gs.nil(current.u_assigned_to)) {

        current.u_status = 'assigned';

        // Record deployment date
        if (gs.nil(current.u_deployment_date)) {
            current.u_deployment_date = gs.nowDate();
        }

        gs.info(
            'Asset ' +
            current.u_asset_id +
            ' deployed to user ' +
            current.u_assigned_to.getDisplayValue()
        );
    }

})(current, previous);
