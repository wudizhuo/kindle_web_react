$(document).ready(function () {
    $("#from_email").val($.cookie("from_email"));
    $("#to_email").val($.cookie("to_email"));

    $("#preview").click(function () {
        $('#preview_loading').show();
        var url = $("#url").val();

        var post_data = {
            url: url,
        }
        $.ajax({
            type: "post",
            url: 'V2/send/preview',
            dataType: "json",
            data: JSON.stringify(post_data),
            headers: {
                'App-Version': 'kindlezhushou'
            },
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $('#preview_loading').hide();
                if (data.status == 0) {
                    $('#preview_result').show();
                    var doc = $('#preview_result')[0].contentWindow.document;
                    doc.open();
                    doc.write(data.content);
                    doc.close();
                } else {
                    $("#preview_error").text(data.msg)
                }
            },
            error: function (jqXHR, exception) {
                $('#preview_loading').hide();
                $("#preview_error").text(jqXHR.responseText)
            }
        });
    });
    $("#send").click(function () {
        $('#send_loading').show();
        var url = $("#url").val();
        var from_email = $("#from_email").val();
        var to_email = $("#to_email").val();
        $.cookie("from_email", from_email);
        $.cookie("to_email", to_email);
        var domain = $("#domain").find("option:selected").text();
        var post_data = {
            url: url,
            from_email: from_email,
            to_email: to_email + domain
        }
        $.ajax({
            type: "post",
            url: 'V2/send/url',
            dataType: "json",
            data: JSON.stringify(post_data),
            headers: {
                'App-Version': 'kindlezhushou'
            },
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $('#send_loading').hide();
                if (data.status == 0) {
                    $("#send_result").text("发送成功")
                } else {
                    $("#send_result").text(data.msg)
                }
            },
            error: function (jqXHR, exception) {
                $('#send_loading').hide();
                $("#send_result").text(jqXHR.responseText)
            }
        });
    });

    $("#send_file").click(function () {
        var domain = $("#domain").find("option:selected").text();
        var to_email = $("#to_email").val();
        $("#to_email").val(to_email + domain);
        $('#send_file_loading').show();
        var options = {
            url: 'V2/uploads',
            type: 'post',
            headers: {
                'App-Version': 'kindlezhushou'
            },

            success: function (data, status) {
                $('#send_file_loading').hide();
                $("#to_email").val(to_email);
                if (data.status == 0) {
                    $("#send_file_result").text("发送成功")
                } else {
                    $("#send_file_result").text(data.msg)
                }
            },
            error: function (jqXHR, exception) {
                $('#send_file_loading').hide();
                $("#send_file_result").text(jqXHR.responseText)
            }
        };
        $("#send_form").ajaxSubmit(options);
    });
});
