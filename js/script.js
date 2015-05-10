function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

$(function() {
    // Check if page came back from Simple Forms
    if (window.location.pathname == '/contact/' && getUrlParameter('sent')) {
        // Removes param from address bar
        window.history.pushState("object or string", "Title", window.location.pathname);

        // Success message
        $('#success').html("<div class='alert alert-success'>\
                                <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>\
                                    &times;\
                                </button>\
                                <strong>\
                                    Your message was sent!\
                                </strong>\
                            </div>");
    }
});

// Floating label headings for the contact form
$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});