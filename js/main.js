$(document).ready(function() {
    // Copy to Clipboard //
    $("#copy_btn").click(function(){
        $("#mainTextarea").select();
        document.execCommand('copy');
        $("#mainTextarea").blur();
    });


    // Saving cover letters //



    $("#save_btn").click(function(){
        var a_cover_letter = document.getElementById("mainTextarea").value;
        saved_letters.push(a_cover_letter);
        saved_letters_number = saved_letters_number + 1;

        $("#save_list").append("<li><a onclick=showSavedLetter(event) class=letter id=letter" + saved_letters_number +">Save " + saved_letters_number + " </a></li>");
        // alert("You have saved " + saved_letters_number + " cover letters.");
        // console.log(saved_letters);
    });



});
var saved_letters_number = 0;
var saved_letters = []; //array to stored saved cover letters.


function showSavedLetter(){
    var index = event.target.id[6];
    alert(saved_letters[index-1]);
}
