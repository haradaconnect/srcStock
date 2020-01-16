$(document).ready(function(){
    var $button = $('#copy');
    $button.on('click', function(){
        var copyText = $(this).parents('.uiWrapper').find('textarea');
        var range = document.createRange();
        range.selectNode(copyText.get(0));
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
    });
    $('textarea[name="src"]').on('change', function() {
        var formedSrc = $(this).val().replace(/^[\n\s]*/g, '').replace(/\'/g, '\\\'').replace(/\n/g, '\\n\\\n').replace(/\n*$/g, '\\n\\');
        $('#formedSrc').html(formedSrc);
    });
});