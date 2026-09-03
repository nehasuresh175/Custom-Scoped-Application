(function executeRule(current, previous) {

    if (current.u_status == 'new') {

        if (gs.nil(current.u_vendor)) {
            gs.addErrorMessage(
                'Vendor information is required for newly procured assets.'
            );

            current.setAbortAction(true);
            return;
        }

        if (gs.nil(current.u_cost) || current.u_cost <= 0) {
            gs.addErrorMessage(
                'A valid procurement cost is required.'
            );

            current.setAbortAction(true);
            return;
        }

        if (gs.nil(current.u_purchase_date)) {
            gs.addErrorMessage(
                'Purchase date is required for procurement records.'
            );

            current.setAbortAction(true);
        }
    }

})(current, previous);
