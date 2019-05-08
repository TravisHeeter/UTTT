$(document).ready(function(){
  r();
});

function log(action, message, element){
  var numberOfLogs = `<td>${$('#log-container > tr').length + 1}</td>`
  var action =    `<td>${action}</td>`
  var message =   `<td>${message}</td>`
  var mark =      `<td>${window.gmark}</td>`
  var overallid = $(element).attr("data-overallid")
  
  $('#log-container')
    .append(
      `<tr 
        id="log-${numberOfLogs}" 
        class="log" 
        onMouseOver="highlightSpot(${overallid})" 
        onMouseOut="highlightSpot(${overallid})">
        ${numberOfLogs}
        ${action}
        ${message}
        ${mark}
        <td>${overallid != 'undefined' ? overallid : 'na'}</td>
      </tr>`
    )
}

function addMark(s){
  if(canAddMark(s)) {
    log('addMark',`mark added`, s)
    $(s).html(`<div class='gmark ${window.gmark}'>${window.gmark}</div>`);
    $(s).off('click');
    $(s).removeClass('clickable');
    checkLilWin(s);
    changeMark();
    calculateNextBoard(s);
  } else {
    log('addMark',`not added`, s)
  }
}

function findParentBoard(s){
  return $(s).closest('.lil-board')
}

function checkLilWin(s){
  var lb = findParentBoard(s);
  var marks = $(lb).find(`.gmark.${window.gmark}`);
  if(marks.length > 2){
    log('checkLilWin',`> 2 marks`, $(lb).attr('data-overallid'))
    var wTest = marks.map((i,v)=>{
      return $(v).parent().attr('data-thisid');
    })
    var lilWin = checkArrayForWin(wTest);
    if(lilWin){
      $(lb).append(`<div class="lilwin ${window.gmark}">${window.gmark}</div>`)
      return true;
    }
  }
}

function checkArrayForWin(a){
  log('checkArrayForWin',`checking array`)
  var b = a.map(e => Number(a[e])).toArray();
  var winCombos = [
    [1,2,3], // horizontals
    [4,5,6],
    [7,8,9],
    [1,5,9], // diagonals
    [3,5,7],
    [1,4,7], // verticals
    [2,5,8],
    [3,6,9]
  ]
  var check = false;
  var arrayString = b.toString();
  
  // compare arrays
  for(wc of winCombos){
    if(arrayString == wc.toString()){
      check = true;
      console.log(`Win detected: winning array:`);
      console.log(a);
      console.log(b)
    }
  }
  
  return check
}

function changeMark(){
  if(window.gmark == 'x')
    window.gmark = 'o'
  else
    window.gmark = 'x'
  
  $('#mark-message').text(window.gmark);
}

function calculateNextBoard(s){
  // remove all the clickable classes
  $('.lil-board .row > div.clickable')
    .removeClass('clickable');
  
  var classes = $(s).attr('class');
  var classString = `.${classes}`.replace(' ','.');
  
  
  // if the next board is already won
  if($(`.bb-row ${classString} .lil-board`).find('.lilWin').length)
    $(`.bb-row ${classString} .lil-board:not(:has(>.lilWin)) .row > div:not(:has(>.gmark))`).addClass('clickable');
  else
  // make clickable only if there is no mark
    $(`.bb-row ${classString} .lil-board .row > div:not(:has(>.gmark))`).addClass('clickable');
}

function canAddMark(s){
  return $(s).hasClass('clickable');
}

function highlightSpot(overallID){
  var o = overallID ? overallID : $('#highlight-input').val();
  $(`[data-overallid=${o}]`).toggleClass("highlight");
}

function r(){
  [...Array(9)].forEach((e,i) => {
    var c = 'bot'
    
    if( 1 % 3 == 0)
      c = 'top'
    else if( i % 3 == 1 )
      c = 'cen'
    
    $('#big-board').append(`<div class=bb-row ${c}`)
    
  })
  $('.gmark').remove();
  $('#log-container').html('')
  $('.lil-board .row > div')
    .addClass('clickable')
    .removeClass('highlight')
    .text('')
    .off('click')
    .on('click', s => addMark( s.target ))
    .off('onMouseOver')
    .on('onMouseOver', s => {
      var smallO = $(s).attr('data-overallid')
      var bigO = $(findParentBoard(s)).attr('data-overallid') == 'undefined' ? 'n' : $(findParentBoard(s)).attr('data-overallid')
      var smallL = $(s).attr('data-thisId')
      var bigL = $(findParentBoard(s)).attr('data-thisId') == 'undefined' ? 'n' : $(findParentBoard(s)).attr('data-overallid')
      $('hover-number-small').text(small)
      $('hover-number-big').text(big)
  })
  window.gmark = 'x';
  
  $('body').on('keydown',(e)=>{
    if(e.keyCode==32){
      e.preventDefault();
      h()
    }
  })
}
function h(){
  $('#big-board').toggle();
  $('#message').toggle();
  var sh = $('#sh').text();
  if(sh == "HHHHHHHHHHHHHHHHHHH")
    $('#sh').text("S");
  else
    $('#sh').text("HHHHHHHHHHHHHHHHHHH");
}

function showNumbers(){
  $('.lil-board .row > div').each((i,e) => {
    $(e).text(i + 1)
  })
}

