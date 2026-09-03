(function executeRule(current, previous) {

    // Only process active assets
    if (current.u_active != true) {
        return;
    }

    // Skip assets without purchase date
    if (gs.nil(current.u_purchase_date)) {
        return;
    }

    var purchaseDate = new GlideDateTime(
        current.u_purchase_date
    );

    var today = new GlideDateTime();

    // Default lifecycle period: 5 years
    var lifecycleYears = 5;

    var retirementDate = new GlideDateTime(
        purchaseDate
    );

    retirementDate.addYearsLocalTime(lifecycleYears);

    // Automatically mark expired assets for retirement
    if (today >= retirementDate &&
        current.u_status != 'retired') {

        current.u_status = 'retired';
        current.u_retirement_date = gs.nowDate();
        current.u_retirement_reason =
            'Automatic retirement - lifecycle exceeded';

        gs.info(
            'Asset automatically retired: ' +
            current.u_asset_id
        );
    }

})(current, previous);
