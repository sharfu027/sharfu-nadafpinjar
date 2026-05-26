jQuery(document).ready(function ($) {
    // Alert
    $('#downloadAll a').click(function () {
        var r = confirm('Download the files of all version ?');
        if (r == true) {
            return true;
        } else {
            return false;
        }
    });

// Tab
    $('#tabs div.tab-content').hide();
    $('#tabs div.tab-content:first').show();
    $('#tabs ul li:first').addClass('active');
    $('#tabs ul li a').click(function () {
        var target_url = $('iframe').attr('src');
        $('#tabs ul li').removeClass('active');
        $(this).parent().addClass('active');
        var currentTab = $(this).attr('href');
        $('#tabs div.tab-content').hide();
        $('iframe').attr('src', '#');
        $('iframe').attr('src', target_url);
        $(currentTab).show();
        return false;
    });

// help text 1
    var help_text_1 = 'Open in a new tab'
    $('.devise-nav ul li em').text(help_text_1);
// Close Tab
// $('.frameWrapper').append('<a id="closeTab" href="javascript:close_window();"><span>close</span><i class="fa fa-remove"></i></a>')
});

function close_window() {
    if (confirm("Close Window?")) {
        close();
    }
}

// Sticky-header
jQuery(window).scroll(function ($) {
    if (jQuery(window).scrollTop() >= 100) {
        jQuery('.top-bar').addClass('top-fix');
    } else {
        jQuery('.top-bar').removeClass('top-fix');
    }
});