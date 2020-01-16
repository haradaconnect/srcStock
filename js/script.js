$(document).ready(function(afterRead){
/*====================================
  Initialization
====================================*/
/*=== Window width/height ===*/
  var windowW = window.innerWidth;
  var windowH = window.innerHeight;
  var device = deviceDet(windowW);
  $(window).on('resize', function() {
    windowW = window.innerWidth;
    windowH = window.innerHeight;
    device = deviceDet(windowW);
  });
/*=== Device detection by width ===*/
  function deviceDet(windowW) {
    if (windowW < 415) {
      device = 'sp';
    } else if (windowW < 769) {
      device = 'tab';
    } else {
      device = 'pc';
    }
    return device;
  }
/*=== コード整形 ===*/
  setSrc(srcObj);
  preCode();
/*====================================
  Oparation
====================================*/
/*=== クリボにコピー ===*/
  setBtn(setBtnEvent);
/*=== Smooth scroll ===*/
  $('a[href^="#"]').on('click', function(){
    var margin = (device==='pc') ? 60 : 10;
    var href = $(this).attr('href');
    var target = $((href=='#' || href=='') ? 'html' : href);
    var posY = target.offset().top - margin;
    $('html, body').animate({scrollTop:posY}, 500, 'swing');
    return false;
  });
/*=== グローバルナビゲーション ===*/
// ON/OFF
  const $nav = $('nav');
  const $openBtn = $nav.find('.openBtn');
  const target = ['nav', 'main'];
  const open = 'navOpen';
  $openBtn.on('click', function(){
    $.each(target,function(index,val){
      if ($(val).hasClass(open)) {
        $('body').removeClass(open);
        $(val).removeClass(open);
        document.removeEventListener('touchmove', handleTouchMove, { passive: false });
      } else {
        $('body').addClass(open);
        $(val).addClass(open);
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
      }
    });
  });
  // ボタン位置
  var $btnSide = $('.btnSide');
  var flagSideChage = false;
  $btnSide.on('click', function(){
    if (!flagSideChage) {
      flagSideChage = true;
    var navW = $nav.outerWidth();
    var openBtnW = $openBtn.outerWidth();
    if ($nav.hasClass('righty')) {
      navW += windowW - openBtnW;
      $btnSide.css({'opacity': '0'});
      $openBtn.animate({'right': navW+'px'}, 500, 'swing', function(){
        $openBtn.css({'right': 'auto', 'left': '100%'});
        $btnSide.css({'opacity': '1'});
        $nav.removeClass('righty');
        flagSideChage = false;
      });
    } else {
      navW += windowW - openBtnW;
      $btnSide.css({'opacity': '0'});
      $openBtn.animate({'left': navW+'px'}, 500, 'swing', function(){
        $openBtn.css({'left': 'auto', 'right': '100%'});
        $btnSide.css({'opacity': '1'});
        $nav.addClass('righty');
        flagSideChage = false;
      });
    }
    }
  });
  // 移動したら閉じる
  $nav.find('a').on('click', function() {
    $.each(target,function(index,val){
      $('body').removeClass(open);
      $(val).removeClass(open);
      document.removeEventListener('touchmove', handleTouchMove, { passive: false });
    });
  });
// 追従
  const $traceElm = $('nav');
  var traceThrY = (device === 'pc') ? $('header').offset().top+$('header').outerHeight() : $('footer').offset().top;
  // Resize
  $(window).on('resize', function() {
    traceElmH = $traceElm.outerHeight();
    traceThrY = (device === 'pc') ? $('header').offset().top+$('header').outerHeight() : $('footer').offset().top;
  });
  // Scroll
  setLimitScrl();
  $(window).on('scroll', function() {
    setLimitScrl();
  });
  function setLimitScrl() {
    var scrTop = $(this).scrollTop();
    var scrBot = scrTop + windowH;
    if ((device==='pc'&&scrTop<traceThrY) || ((device==='sp'||device==='tab')&&scrBot>traceThrY)) {
      $traceElm.addClass('limitscrl');
    } else {
      $traceElm.removeClass('limitscrl');
    }
  }
});
/*====================================
  Function
====================================*/
/*=== ソースコード埋め込み整形 ===*/
function preCode() {
  var $src = document.querySelectorAll('.prettyprint script');
  for (var i = 0; i < $src.length; i++) {
    var text = '';
    var lineArr = new Array();
    var indent = null;
    var lineArrTmp = $src[i].textContent.replace(/^[\r\n]/, '').replace(/[\r\n]\s+$/, '').split('\n');
    for (var j = 0; j < lineArrTmp.length; j++) {
      if (!lineArrTmp[j].match(/^\s*$/)) {
        var indentTmp = lineArrTmp[j].match(/^(\s+).+/);
        if (indentTmp.length > 1) {
          if (indent === null) {
            indent = indentTmp[1].length;
          } else if (indentTmp[1].length < indent) {
            indent = indentTmp[1].length;
          }
        }
      }
      lineArr.push(lineArrTmp[j]);
    }
    for (var j = 0; j < lineArr.length; j++) {
      lineArr[j] = lineArr[j].substr(indent);
      text += lineArr[j] + '\n';
    }
    $src[i].parentNode.textContent = text;
  }
}
/*=== ソースコード挿入 ===*/
function setSrc(srcObj) {
  var $target = $('#srcGroupField .wrap');
  var $targetNav = $('nav .jumpField');
  var html = '';
  var gNum = 0;
  var srcNum = 0;
  $.each(srcObj,function(index,val){
    var gName = srcValid(val['gName']);
    html += '\
  <div id="group'+gNum+'" class="srcGroup">\
    <h2>'+gName+'</h2>\
    ';
    $targetNav.append('<div class="aWrapper gNameNav"><a href="#group'+gNum+'">'+gName+'</a></div>');
    gNum++;
    $.each(val['item'],function(index,val){
      var head = srcValid(val['head']);
      html += '\
    <div class="srcField">\
      <div id="src'+srcNum+'" class="srcItem">\
        <h3>'+head+'</h3>\
        <div class="codeArea flexBox">\
      ';
      $targetNav.append('<div class="aWrapper srcNav"><a href="#src'+srcNum+'">'+head+'</a></div>');
      srcNum++;
      $.each(val['src'],function(index,val){
        var type = srcValid(val['type']);
        var script = srcValid(val['script']);
        html += '\
          <div class="preWrapper '+type+'">\
            <pre><code class="prettyprint linenums">\
            <script type="text/plain">'+script+'</script>\
            </code></pre>\
          </div>\
        ';
      });
      html += '\
        </div>\
      </div>\
    </div>\
      ';
    });
    html += '\
  </div>\
    ';
  });
  $target.append(html);
}
/*=== null, undefined対策 ===*/
function srcValid(src) {
  if (src) {
    return src;
  } else {
    return '';
  }
}
/*=== クリボにコピー ===*/
function setBtn(setBtnEvent) {
  $('.preWrapper').each(function(i, elm){
    $(this).append('<div class="btnWrapper"><button>COPY</button></div>');
  });
  setBtnEvent();
}
function setBtnEvent() {
  $('.preWrapper').each(function(i, elm){
    var $wrap = $(this);
    var $button = $wrap.find('button');
    $button.on('click', function(){
      var copyText = $wrap.find('pre');
      var range = document.createRange();
      range.selectNode(copyText.get(0));
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand('copy');
    });
  });
}
/*=== スクロール停止 ===*/
function handleTouchMove(event) {
    event.preventDefault();
}
/*====================================
  Memo
======================================
console.log();
var ua = navigator.userAgent;
if (((ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0) && ua.indexOf('Mobile') > 0) && windowW < 415 && !flagScrStopCancel ) {}
var i = $('li').index();
$('').on('click', function() {});
$('').on('mousedown', function(){});
$('').on('mousemove', function(){});
$('').on('mouseup mouseleave', function(){});
$('').on('touchstart', function(){});
$('').on('touchmove', function(){});
$('').on('touchend', function(){});
$(window).scrollTop()
$(window).on('scroll', function(){});
$(window).on('resize', function(e) {});
$('').offset().top
$('')[0].scrollHeight
.addClass("right")
.children('')
.find('*')
.append('<span></span>')
.outerWidth();
.attr('', )
.prop('disabled', true)
for (var i=0; i<array.length; i++) {}
$.each(a,function(index,val){});
$('').each(function(i, elem){});
.animate({'': ''}, 100, 'linear', function(){});
clearTimeout(timer);
var timer = setTimeout( function () {}, 100 );
$('a[href^="#"]').on('click', function(){
  var speed = 500;
  var href= $(this).attr('href');
  var target = $(href == '#' || href == '' ? 'html' : href);
  var position = target.offset().top;
  $('html, body').animate({scrollTop:position}, speed, 'swing');
  return false;
});
function handleTouchMove(event) {
    event.preventDefault();
}
//スクロール禁止
document.addEventListener('touchmove', handleTouchMove, { passive: false });
//スクロール復帰
document.removeEventListener('touchmove', handleTouchMove, { passive: false });
*/