$(document).ready(function() {
  $('form[action="/admin/calculate-score"]').submit(function(e) {
    var form = this;

    e.preventDefault();

    Swal.fire({
      title: "คุณแน่ใจหรือไม่ที่จะดำเนินการ ?",
      type: "question",
      dangerMode: true,
      showCloseButton: true,
      showCancelButton: true
    }).then(function(result) {
      if (result.value) {
        Swal.fire(
          "เริ่มต้นดำเนินการ",
          "ส่งการดำเนินการแล้ว กรุณารอสักครู่",
          "success"
        ).then(function() {
          form.submit();
        });
      } else {
        Swal.fire("ยกเลิก", "ยกเลิกเรียบร้อย", "error");
      }
    });
  });

  $("form[action='/admin/staffs/verification']").submit(function(event) {
    event.preventDefault();
    var form = $(this);
    var button = $(this).children("button");
    button.addClass("loading");
    $.ajax({
      url: "/admin/staffs/verification",
      method: "POST",
      data: form.serialize(),
      success: function(data) {
        var result = "";
        for (var key in data) {
          if (key === "verification_proof_file_name") {
            result +=
              "<p><a href='/api/pictures/verifications/" +
              data[key] +
              "'><img class='ui centered small image' src='/api/pictures/verifications/" +
              data[key] +
              "'></a></p>";
          } else if (
            key === "created_at" ||
            key === "updated_at" ||
            key === "user_id"
          ) {
          } else {
            result += "<p>" + key + ": " + data[key] + "</p>";
          }
        }
        Swal.fire("ข้อมูลการยืนยันสิทธิ์", result);
      },
      error: function(jqXHR, textStatus, err) {
        Swal.fire("Error", "Found some error", "error");
      },
      complete: function(jqXHR, textStatus) {
        button.removeClass("loading");
      }
    });
  });

  $("#search-user").submit(function(event) {
    event.preventDefault();
    var form = $(this);
    $.ajax({
      url: "/admin/search/user",
      method: "POST",
      data: form.serialize(),
      success: function(data, textStatus) {
        const table = $("<table></table>");
        table.addClass("ui inverted celled table");
        const thead = $("<thead></thead>");
        thead.addClass("thead-light");
        const headRow = $("<tr></tr>");
        for (let key in data) {
          headRow.append($("<th>" + key + "</th>"));
        }
        thead.append(headRow);
        const tbody = $("<tbody></tbody>");
        const bodyRow = $("<tr></tr>");
        for (let key in data) {
          if (
            key != "grade_report_file_name" &&
            key != "profile_picture_file_name"
          ) {
            if (key == "is_completed") {
              bodyRow.append(
                "<td data-label='" +
                  key +
                  "'>" +
                  (data[key] === 0
                    ? "<p class='red font-weight-bold'>INCOMPLETE</p>"
                    : "<p class='green  font-weight-bold'>COMPLETED</p>") +
                  "</td>"
              );
            } else {
              bodyRow.append(
                "<td data-label='" + key + "'>" + data[key] + "</td>"
              );
            }
          } else if (key == "grade_report_file_name") {
            if (data[key] == null) {
              bodyRow.append(
                "<td data-label='" +
                  key +
                  "'><img class='ui small image' src='https://via.placeholder.com/150'></td>"
              );
            } else if (data[key].split(".")[1] == "pdf") {
              bodyRow.append(
                "<td data-label='" +
                  key +
                  "'><object data='/api/documents/" +
                  data[key] +
                  "' type='application/pdf' width='100%' height='100%'><p><a href='/api/documents/" +
                  data[key] +
                  "'>Download</a></p></object></td>"
              );
            } else {
              bodyRow.append(
                "<td data-label='" +
                  key +
                  "'><img class='ui small image' src='" +
                  (data[key] == "" || data[key] == null
                    ? "https://via.placeholder.com/150"
                    : "/api/documents/" + data[key]) +
                  "'></td>"
              );
            }
          } else if (key == "profile_picture_file_name") {
            bodyRow.append(
              "<td data-label='" +
                key +
                "'><img class='ui small image' src='" +
                (data[key] == "" || data[key] == null
                  ? "https://via.placeholder.com/150"
                  : "/api/pictures/" + data[key]) +
                "'></td>"
            );
          }
        }
        tbody.append(bodyRow);
        table.append(thead);
        table.append(tbody);
        const searchResult = $("#search-result-user");
        searchResult.append(table);
      },
      error: function(jqXHR, textStatus, error) {
        $("#search-result-user").text(jqXHR.responseText);
      }
    });
  });

  $("#search-answer").submit(function(event) {
    event.preventDefault();
    var form = $(this);
    $.ajax({
      url: "/admin/search/answer",
      method: "POST",
      data: form.serialize(),
      success: function(data, textStatus) {
        const table = $("<table></table>");
        table.addClass("ui inverted celled table");
        const thead = $("<thead></thead>");
        thead.addClass("thead-light");
        const headRow = $("<tr></tr>");
        for (let key in data) {
          headRow.append($("<th>" + key + "</th>"));
        }
        thead.append(headRow);
        const tbody = $("<tbody></tbody>");
        const bodyRow = $("<tr></tr>");
        for (let key in data) {
          bodyRow.append("<td data-label='" + key + "'>" + data[key] + "</td>");
        }
        tbody.append(bodyRow);
        table.append(thead);
        table.append(tbody);
        const searchResult = $("#search-result-answer");
        searchResult.append(table);
      },
      error: function(jqXHR, textStatus, error) {
        $("#search-result-answer").text(jqXHR.responseText);
      }
    });
  });

  $("#search-user-all").submit(function(event) {
    event.preventDefault();
    $.ajax({
      url: "/admin/search/user/all",
      method: "POST",
      success: function(data, textStatus) {
        const table = $("<table></table>");
        table.addClass("ui inverted celled table");
        const thead = $("<thead></thead>");
        thead.addClass("thead-light");
        const headRow = $("<tr></tr>");
        for (let key in data[0]) {
          headRow.append($("<th>" + key + "</th>"));
        }
        thead.append(headRow);
        const tbody = $("<tbody></tbody>");
        for (let i = 0; i < data.length; i++) {
          let bodyRow = $("<tr></tr>");
          for (let key in data[i]) {
            if (
              key != "grade_report_file_name" &&
              key != "profile_picture_file_name"
            ) {
              if (key == "is_completed") {
                bodyRow.append(
                  "<td data-label='" +
                    key +
                    "'>" +
                    (data[i][key] === 0
                      ? "<p class='red font-weight-bold'>INCOMPLETE</p>"
                      : "<p class='green  font-weight-bold'>COMPLETED</p>") +
                    "</td>"
                );
              } else {
                bodyRow.append(
                  "<td data-label='" + key + "'>" + data[i][key] + "</td>"
                );
              }
            } else if (key == "grade_report_file_name") {
              if (data[i][key] == null) {
                bodyRow.append(
                  "<td data-label='" +
                    key +
                    "'><img class='ui small image' src='https://via.placeholder.com/150'></td>"
                );
              } else if (data[i][key].split(".")[1] == "pdf") {
                bodyRow.append(
                  "<td data-label='" +
                    key +
                    "'><object data='/api/documents/" +
                    data[i][key] +
                    "' type='application/pdf' width='100%' height='100%'><p><a href='/api/documents/" +
                    data[i][key] +
                    "'>Download</a></p></object></td>"
                );
              } else {
                bodyRow.append(
                  "<td data-label='" +
                    key +
                    "'><img class='ui small image' src='" +
                    (data[i][key] == "" || data[i][key] == null
                      ? "https://via.placeholder.com/150"
                      : "/api/documents/" + data[i][key]) +
                    "'></td>"
                );
              }
            } else if (key == "profile_picture_file_name") {
              bodyRow.append(
                "<td data-label='" +
                  key +
                  "'><img class='ui small image' src='" +
                  (data[i][key] == "" || data[i][key] == null
                    ? "https://via.placeholder.com/150"
                    : "/api/pictures/" + data[i][key]) +
                  "'></td>"
              );
            }
          }
          tbody.append(bodyRow);
        }
        table.append(thead);
        table.append(tbody);
        const searchResult = $("#search-result-user-all");
        searchResult.append($("<p>Count: " + data.length + "</p>"));
        searchResult.append(table);
      },
      error: function(jqXHR, textStatus, error) {
        $("#search-result-user-all").text(jqXHR.responseText);
      }
    });
  });

  $("#search-user-all-completed").submit(function(event) {
    event.preventDefault();
    $.ajax({
      url: "/admin/search/user/all/completed",
      method: "POST",
      success: function(data, textStatus) {
        const table = $("<table></table>");
        table.addClass("ui inverted celled table");
        const thead = $("<thead></thead>");
        thead.addClass("thead-light");
        const headRow = $("<tr></tr>");
        for (let key in data[0]) {
          headRow.append($("<th>" + key + "</th>"));
        }
        thead.append(headRow);
        const tbody = $("<tbody></tbody>");
        for (let i = 0; i < data.length; i++) {
          let bodyRow = $("<tr></tr>");
          for (let key in data[i]) {
            if (
              key != "grade_report_file_name" &&
              key != "profile_picture_file_name"
            ) {
              if (key == "is_completed") {
                bodyRow.append(
                  "<td data-label='" +
                    key +
                    "'>" +
                    (data[i][key] === 0
                      ? "<p class='red font-weight-bold'>INCOMPLETE</p>"
                      : "<p class='green  font-weight-bold'>COMPLETED</p>") +
                    "</td>"
                );
              } else {
                bodyRow.append(
                  "<td data-label='" + key + "'>" + data[i][key] + "</td>"
                );
              }
            } else if (key == "grade_report_file_name") {
              if (data[i][key] == null) {
                bodyRow.append(
                  "<td data-label='" +
                    key +
                    "'><img class='ui small image' src='https://via.placeholder.com/150'></td>"
                );
              } else if (data[i][key].split(".")[1] == "pdf") {
                bodyRow.append(
                  "<td data-label='" +
                    key +
                    "'><object data='/api/documents/" +
                    data[i][key] +
                    "' type='application/pdf' width='100%' height='100%'><p><a href='/api/documents/" +
                    data[i][key] +
                    "'>Download</a></p></object></td>"
                );
              } else {
                bodyRow.append(
                  "<td data-label='" +
                    key +
                    "'><img class='ui small image' src='" +
                    (data[i][key] == "" || data[i][key] == null
                      ? "https://via.placeholder.com/150"
                      : "/api/documents/" + data[i][key]) +
                    "'></td>"
                );
              }
            } else if (key == "profile_picture_file_name") {
              bodyRow.append(
                "<td data-label='" +
                  key +
                  "'><img class='ui small image' src='" +
                  (data[i][key] == "" || data[i][key] == null
                    ? "https://via.placeholder.com/150"
                    : "/api/pictures/" + data[i][key]) +
                  "'></td>"
              );
            }
          }
          tbody.append(bodyRow);
        }
        table.append(thead);
        table.append(tbody);
        const searchResult = $("#search-result-user-all-completed");
        searchResult.append($("<p>Count: " + data.length + "</p>"));
        searchResult.append(table);
      },
      error: function(jqXHR, textStatus, error) {
        $("#search-result-user-all-completed").text(jqXHR.responseText);
      }
    });
  });

  $("#search-answer-all").submit(function(event) {
    event.preventDefault();
    $.ajax({
      url: "/admin/search/answer/all",
      method: "POST",
      success: function(data, textStatus) {
        const table = $("<table></table>");
        table.addClass("ui inverted celled table");
        const thead = $("<thead></thead>");
        thead.addClass("thead-light");
        const headRow = $("<tr></tr>");
        for (let key in data[0]) {
          headRow.append($("<th>" + key + "</th>"));
        }
        thead.append(headRow);
        const tbody = $("<tbody></tbody>");
        for (let i = 0; i < data.length; i++) {
          let bodyRow = $("<tr></tr>");
          for (let key in data[i]) {
            bodyRow.append(
              "<td data-label='" + key + "'>" + data[i][key] + "</td>"
            );
          }
          tbody.append(bodyRow);
        }
        table.append(thead);
        table.append(tbody);
        const searchResult = $("#search-result-answer-all");
        searchResult.append($("<p>Count: " + data.length + "</p>"));
        searchResult.append(table);
      },
      error: function(jqXHR, textStatus, error) {
        $("#search-result-user-all").text(jqXHR.responseText);
      }
    });
  });

  $("#upload-picture").submit(function(event) {
    event.preventDefault();
    var formData = new FormData(this);
    $.ajax({
      url: "/admin/edit/picture",
      method: "POST",
      data: formData,
      processData: !1,
      contentType: !1,
      headers: {
        "User-Id": formData.get("id")
      },
      success: function(data, textStatus) {
        Swal.fire("อัพโหลดเสร็จสิ้น", data.fileName, "success");
      },
      error: function(jqXHR, textStatus, error) {
        Swal.fire("พบข้อผิดพลาด", jqXHR.responseText, "error");
      }
    });
  });

  $("#upload-document").submit(function(event) {
    event.preventDefault();
    var formData = new FormData(this);
    $.ajax({
      url: "/admin/edit/document",
      method: "POST",
      data: formData,
      processData: !1,
      contentType: !1,
      headers: {
        "User-Id": formData.get("id")
      },
      success: function(data, textStatus) {
        Swal.fire(
          "อัพโหลดเสร็จสิ้น",
          "เอกสารของคุณถูกอัพโหลดขึ้นเครื่องแม่ข่ายแล้ว",
          "success"
        );
      },
      error: function(jqXHR, textStatus, error) {
        Swal.fire("พบข้อผิดพลาด", jqXHR.responseText, "error");
      }
    });
  });
  $("form[action='/admin/edit/verification']").submit(function(event) {
    event.preventDefault();
    var formData = new FormData(this);
    $.ajax({
      url: "/admin/edit/verification",
      method: "POST",
      data: formData,
      processData: !1,
      contentType: !1,
      headers: {
        "User-Id": formData.get("user_id")
      },
      success: function(data, textStatus) {
        Swal.fire("อัพโหลดเสร็จสิ้น", "ส่งข้อมูลสำเร็จ", "success");
      },
      error: function(jqXHR, textStatus, error) {
        Swal.fire("พบข้อผิดพลาด", jqXHR.responseText, "error");
      }
    });
  });
});
