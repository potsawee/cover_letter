
  $(document).ready( function() 
  {
    $('#ClickWordList li').click(function() { 
      console.log($(this).text());
      insertText($(this).text());
      return false
    });

    var highlights = [{
      color: '#FFF000',
      words: ['ADDRESS']
    }];

    $('#mainTextarea').highlightTextarea({
      words: highlights
    });

  });

  function insertText(text)
  {
    text = text.toUpperCase().replace(/ /g, '_');
    var textarea = $('#mainTextarea');
    var selectionStart = textarea.prop("selectionStart");
    var selectionEnd = textarea.prop("selectionEnd")
    var str = textarea.prop("value");
    console.log(selectionStart + " " + selectionEnd + " " + str);
    str = str.slice(0,selectionStart) + text + str.slice(selectionEnd);
    textarea.prop("value", str);
    textarea.trigger( "keydown" );
  }