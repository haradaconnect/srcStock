const srcObj = [
  { gName:'UI系', item:[
    { head:'aタグ', src:[
      { type:'html', script:'\n\
        <div class="uiWrapper">\n\
            <input type="number" name="num" value="0" min="0" max="100">\n\
        </div>\n\
      ',},
    ],},
    { head:'buttonタグ', src:[
      { type:'html', script:'\n\
        <div class="btnWrapper">\n\
            <button>ボタン</button>\n\
        </div>\n\
      ',},
      { type:'js', script:'\n\
        $(\'\').on(\'click\', function() {\n\
          \n\
        })\n\
      ',},
    ],},
    { head:'select', src:[
      { type:'html', script:'\n\
        <div class="uiWrapper select">\n\
            <div class="selectWrapper">\n\
                <select name="">\n\
                </select>\n\
            </div>\n\
        </div>\n\
      ',},
      { type:'js', script:'\n\
        $(\'\').on(\'change\', function() {\n\
          var val = $(this).children(\'option:selected\').val()\n\
        });\n\
      ',},
    ],},
  ]},
];

