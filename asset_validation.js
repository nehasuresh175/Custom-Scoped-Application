(function executeRule(current, previous) {

    // Validate Asset ID
    if (gs.nil(current.u_asset_id)) {
        gs.addErrorMessage('Asset ID is required.');
        current.setAbortAction(true);
        return;
    }

    // Validate Asset Name
    if (gs.nil(current.u_name)) {
        gs.addErrorMessage('Asset name is required.');
        current.setAbortAction(true);
        return;
    }

    // Validate Purchase Date
    if (!gs.nil(current.u_purchase_date) &&
        current.u_purchase_date > gs.nowDate()) {

        gs.addErrorMessage('Purchase date cannot be in the future.');
        current.setAbortAction(true);
        return;
    }

    // Validate Cost
    if (!gs.nil(current.u_cost) && current.u_cost < 0) {
        gs.addErrorMessage('Asset cost cannot be negative.');
        current.setAbortAction(true);
    }

})(current, previous);
