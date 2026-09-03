(function executeRule(current, previous) {

    if (gs.nil(current.u_cmdb_ci)) {
        gs.info(
            'No CMDB CI linked to asset ' +
            current.u_asset_id
        );

        return;
    }

    var ci = new GlideRecord('cmdb_ci');

    if (ci.get(current.u_cmdb_ci)) {

        // Synchronize basic information
        if (!gs.nil(current.u_name)) {
            ci.name = current.u_name;
        }

        if (!gs.nil(current.u_assigned_to)) {
            ci.assigned_to = current.u_assigned_to;
        }

        // Synchronize operational status
        if (current.u_status == 'retired') {
            ci.install_status = 7;
        }

        ci.update();

        gs.info(
            'CMDB synchronized for asset: ' +
            current.u_asset_id
        );
    }

})(current, previous);
