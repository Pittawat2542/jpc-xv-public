$(document).ready(function() {
  $("select").dropdown();

  $("form[action='/staff/comment']").submit(function(event) {
    event.preventDefault();
    var form = $(this);
    var button = $(this).children("button");
    button.addClass("loading");
    $.ajax({
      url: "/staff/comment",
      method: "POST",
      data: form.serialize(),
      success: function(data) {
        var result = "<ol>";
        for (var comment of data) {
          result += "<li>" + comment + "</li>";
        }
        result += "</ol>";
        if (data.length === 0) result = "No comments!";
        Swal.fire("Comments", result);
      },
      error: function(jqXHR, textStatus, err) {
        Swal.fire("Error", "Found some error", "error");
      },
      complete: function(jqXHR, textStatus) {
        button.removeClass("loading");
      }
    });
  });
});
