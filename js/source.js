const srcObj = [
  { gName:'UI系', item:[
    { head:'a', src:[
      { type:'html', script:'\n\
        <div class="aWrapper">\n\
          <a href="" class="linkBtn">リンク</a>\n\
        </div>\n\
      ',},
    ],},
    { head:'input[type="checkbox"]', src:[
      { type:'html', script:'\n\
        <div class="uiWrapper checkbox">\n\
          <span></span>\n\
          <input type="checkbox" name="cb" value="qid" id="cb01">\n\
          <label for="cb01" class="cbLabel">選択01</label>\n\
          <input type="checkbox" name="cb" value="qid" id="cb02">\n\
          <label for="cb02" class="cbLabel">選択02</label>\n\
        </div>\n\
      ',},
      { type:'js', script:'\n\
        $(document).ready(function () {\n\
          $inputCheckbox = $(\'input[type="checkbox"][name="cb"]\');\n\
          //イベント\n\
          $inputCheckbox.on(\'change\', function () {\n\
            \n\
          });\n\
          // 取得\n\
          var cbState = new Array();\n\
          $(\'input[type="checkbox"][name="cb"]\').each(function (i, elem) {\n\
            cbState.push({\n\
              id: $(this).attr(\'id\'),\n\
              check: $(this).prop(\'checked\'),\n\
              val: $(this).val(),\n\
              text: $(\'label[for="\' + $(this).attr(\'id\') + \'"]\').text(),\n\
            });\n\
          });\n\
          // 操作\n\
          $(\'input[type="checkbox"][name="cb"][id="cb01"]\').prop(\'checked\', true);\n\
        });\n\
      ',},
    ],},
    { head:'input[type="radio"]', src:[
      { type:'html', script:'\n\
        <div class="uiWrapper radio">\n\
          <span></span>\n\
          <input type="radio" name="radio" value="qid" id="radio00" checked="checked">\n\
          <label for="radio00" class="radioLabel">選択01</label>\n\
          <input type="radio" name="radio" value="qid" id="radio01">\n\
          <label for="radio01" class="radioLabel">選択02</label>\n\
        </div>\n\
      ',},
      { type:'js', script:'\n\
        $inputRadio = $(\'input[type="radio"][name="radio"]\');\n\
        //イベント\n\
        $inputRadio.on(\'change\', function(){\n\
          \n\
        });\n\
        // 取得\n\
        var $checked = $(\'input[type="radio"][name="radio"]:checked\');\n\
        var radioRes = {\n\
          val: $checked.val(),\n\
          id: $checked.attr(\'id\'),\n\
          text: $(\'label[for="\'+$checked.attr(\'id\')+\'"\').text(),\n\
        };\n\
        // 操作\n\
        $(\'input[type="radio"][name="radio"][id="radio01"]\').prop(\'checked\', true);\n\
      ',},
    ],},
    { head:'button', src:[
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
              <option val="0">---</option>\n\
            </select>\n\
          </div>\n\
        </div>\n\
      ',},
      { type:'js', script:'\n\
        var $select = $(\'select[name=""]\');\n\
        //イベント\n\
        $select.on(\'change\', function() {\n\
          var val = $(this).children(\'option:selected\').val();\n\
        });\n\
        // 操作\n\
        $select.val(\'val\');\n\
      ',},
    ],},
    { head:'input[type="date"]', src:[
      { type:'html', script:'\n\
        <div class="uiWrapper date">\n\
          <div class="dateWrapper">\n\
            <label for="pubDate" class="dateLabel">\n\
              <input type="date" id="date" name="date" value="" min="2019-01-01">\n\
            </label>\n\
          </div>\n\
        </div>\n\
      ',},
      { type:'js', script:'\n\
        $inputDate = $(\'input[type="date"]\');\n\
        // 今日の日付セット\n\
        var today = new Date();\n\
        var month = (\'00\'+today.getMonth()+1).slice(-2);\n\
        var date = (\'00\'+today.getDate()).slice(-2);\n\
        $inputDate.val(today.getFullYear()+\'-\'+month+\'-\'+date);\n\
        //イベント\n\
        $inputDate.on(\'change\', function() {\n\
          var val = $(this).val();\n\
        });\n\
        // 操作\n\
        $inputDate.val(\'val\');\n\
      ',},
    ],},
    { head:'input[type="file"]', src:[
      { type:'html', script:'\n\
        <div class="uiWrapper">\n\
          <label for="file" class="openLabel">\n\
            <span>開く</span>\n\
            <input type="file" name="files[]" accept="" multiple="multiple" id="file">\n\
          </label>\n\
        </div>\n\
      ',},
      { type:'js', script:'\n\
        $inputFile = $(\'input[type="file"]\');\n\
      ',},
    ],},
  ]},
];
