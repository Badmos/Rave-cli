exports.wrapperFunction = function() {
    const API_publicKey = "<ADD YOUR PUBLIC KEY HERE>";

    function payWithRave() {
        var x = getpaidSetup({
            PBFPubKey: API_publicKey,
            customer_email: String(document.getElementById('email').value),
            amount: document.getElementById('amount'),
            customer_phone: document.getElementById('customer_phone'),
            currency: "NGN",
            txref: `rave-${Math.floor((Math.random() * 1000000000000) + 1)}`,
            meta: [{
                metaname: "flightID",
                metavalue: "AP1234"
            }],
            onclose: function() {},
            callback: function(response) {
                var txref = response.tx.txRef; // collect txRef returned and pass to a server page to complete status check.
                console.log("This is the response returned after a charge", response);
                if (
                    response.tx.chargeResponseCode == "00" ||
                    response.tx.chargeResponseCode == "0"
                ) {
                    // redirect to a success page
                } else {
                    // redirect to a failure page.
                }

                x.close(); // use this to close the modal immediately after payment.
            }
        });
    }

}