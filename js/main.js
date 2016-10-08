// Copy to Clipboard //
$("#copy_btn").click(function(){
    $("#mainTextarea").select();
    document.execCommand('copy');
    $("#mainTextarea").blur();
});
