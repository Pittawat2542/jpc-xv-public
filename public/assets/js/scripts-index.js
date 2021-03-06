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
  $(".ui.accordion").accordion();
  $("a[href^='#']").click(function(e) {
    e.preventDefault();
    var position = $($(this).attr("href")).offset().top;
    $("body, html").animate({ scrollTop: position });
  });
  $("#what-section .header").visibility({
    once: !0,
    onOnScreen: function() {
      $("#what-section p").transition("fade right", "1200ms");
    }
  });
  $("#when-section .header").visibility({
    once: !0,
    onOnScreen: function() {
      $("#when-section .row").transition("fade up", "1500ms");
    }
  });
  $(".ui.sidebar").sidebar("attach events", ".toc.item");
  $(".ui.form").form();
});
