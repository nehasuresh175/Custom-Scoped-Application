(function executeRule(current, previous) {

    if (!current.isNewRecord() &&
        current.u_status.changes()) {

        var oldStatus = previous.u_status.toString();
        var newStatus = current.u_status.toString();

        var validTransition = true;

        // Define allowed lifecycle transitions
        if (oldStatus == 'new' && newStatus != 'available') {
            validTransition = false;
        }

        if (oldStatus == 'available' &&
            newStatus != 'assigned' &&
            newStatus != 'maintenance' &&
            newStatus != 'retired') {

            validTransition = false;
        }

        if (oldStatus == 'assigned' &&
            newStatus != 'available' &&
            newStatus != 'maintenance' &&
            newStatus != 'retired') {

            validTransition = false;
        }

        if (oldStatus == 'maintenance' &&
            newStatus != 'available' &&
            newStatus != 'retired') {

            validTransition = false;
        }

        if (!validTransition) {
            gs.addErrorMessage(
                'Invalid asset lifecycle transition: ' +
                oldStatus + ' → ' + newStatus
            );

            current.setAbortAction(true);
        }
    }

})(current, previous);
