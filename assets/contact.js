var ajax_data = null;
$(function() {
    $("#contact-error").hide();
    $("#contact-success").hide();
    $("#contact-form").on("submit", function(e) {
        e.preventDefault();
        var name = $("#contact-name").val();
        var from = $("#contact-email").val();
        var message = $("#contact-message").val();
        if (name && from && message) {
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            if (re.test(from)) {
                var version = 'v0',
                    apiUrl = 'http://' + API_ENDPOINT + '/' + version;
                var domain = window.location.host;
                ajax_data = {
                    type: "POST",
                    url: apiUrl + "/email.php",
                    data: {
                        from: from,
                        name: name,
                        message: message
                    }
                };
                ajax_data.success = function(data) {
                    var response = JSON.parse(data);
                    $("#contact-name").val("");
                    $("#contact-email").val("");
                    $("#contact-message").val("");
                    $("#contact-success").text(response.text).show();
                    $("#contact-error").hide();
                };
                ajax_data.error = function(data) {
                    var response = JSON.parse(data);
                    $("#contact-success").hide();
                    $("#contact-error").text(response.text).show();
                };
                //ajax_data.data = JSON.stringify(ajax_data.data);
                $.ajax(ajax_data);
            } else {
                $("#contact-error").show();
            }
        }
    });
    $("img.close").on("click", function() {
        $("#contact-error").hide();
        $("#contact-success").hide();
    });
});