(function executeRule(current, previous) {

    // Asset entered maintenance
    if (current.u_status == 'maintenance' &&
        previous.u_status != 'maintenance') {

        current.u_maintenance_start = gs.nowDate();

        gs.info(
            'Maintenance started for asset: ' +
            current.u_asset_id
        );
    }

    // Asset leaves maintenance
    if (previous.u_status == 'maintenance' &&
        current.u_status != 'maintenance') {

        current.u_maintenance_end = gs.nowDate();

        // Return asset to available state if no user is assigned
        if (gs.nil(current.u_assigned_to)) {
            current.u_status = 'available';
        }
    }

})(current, previous);
