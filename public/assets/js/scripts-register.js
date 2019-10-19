$(document).ready(function() {
  $(".masthead").visibility({
    once: !1,
    onBottomPassed: function() {
      $(".fixed.menu").transition("fade in");
    },
    onBottomPassedReverse: function() {
      $(".fixed.menu").transition("fade out");
    }
  });
  $(".ui.sidebar").sidebar("attach events", ".toc.item");
  $("select.dropdown").dropdown();
  $(".ui.radio.checkbox").checkbox();
  $(".ui.checkbox").checkbox();
  $("#picture-form").submit(function(event) {
    event.preventDefault();
    var formData = new FormData(this);
    $("#submit-pic").addClass("loading");
    $.ajax({
      url: "/api/upload/pictures",
      method: "POST",
      data: formData,
      processData: !1,
      contentType: !1,
      timeout: 30000,
      success: function(data, textStatus) {
        $("#submit-pic").removeClass("loading");
        var profileImage = $("#profile-image");
        profileImage.attr("src", `/api/pictures/${data.fileName}`);
        Swal.fire(
          "อัพโหลดเสร็จสิ้น",
          "รูปภาพของคุณถูกอัพโหลดขึ้นเครื่องแม่ข่ายแล้ว",
          "success"
        );
      },
      error: function(jqXHR, textStatus, error) {
        $("#submit-pic").removeClass("loading");
        Swal.fire("พบข้อผิดพลาด", jqXHR.responseText, "error");
      }
    });
  });
  $("#document-form").submit(function(event) {
    event.preventDefault();
    var formData = new FormData(this);
    $("#submit-doc").addClass("loading");
    $.ajax({
      url: "/api/upload/documents",
      method: "POST",
      data: formData,
      processData: !1,
      contentType: !1,
      timeout: 30000,
      success: function(data, textStatus) {
        $("#submit-doc").removeClass("loading");
        var documentDownload = $("#document-download");
        documentDownload.attr("href", `/api/documents/${data.fileName}`);
        Swal.fire(
          "อัพโหลดเสร็จสิ้น",
          "ไฟล์ของคุณถูกอัพโหลดขึ้นเครื่องแม่ข่ายแล้ว",
          "success"
        );
      },
      error: function(jqXHR, textStatus, error) {
        $("#submit-doc").removeClass("loading");
        Swal.fire("พบข้อผิดพลาด", jqXHR.responseText, "error");
      }
    });
  });
});
