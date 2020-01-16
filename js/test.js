$(document).ready(function () {
  $inputRadio = $('input[type="radio"][name="radio"]');
  //イベント
  $inputRadio.on('change', function(){
    
  });
  // 取得
  var $checked = $('input[type="radio"][name="radio"]:checked');
  var radioRes = {
    val: $checked.val(),
    id: $checked.attr('id'),
    text: $('label[for="'+$checked.attr('id')+'"').text(),
  };
  // 操作
  $('input[type="radio"][name="radio"][id="radio01"]').prop('checked', true);
});