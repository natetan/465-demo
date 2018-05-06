var _schema = {
  FirstName: 'First Name',
  LastName: 'Last Name',
  Age: 'Age',
  DailyInternetUsage: 'Daily Internet Usage',
  FavoriteClass: 'Favorite Class',
  FavoriteHobby: 'Favorite Hobby',
}

var _students = [];
var _thereIsData = false;

createForm();
displayRightContent(1);

var $lis = $('.nav-tabs').children();
$lis.on('click', updateActive);

function updateActive() {
  var $currentItem = $(this);
  $currentItem.siblings().removeClass('active');
  $currentItem.addClass('active');

  var id = $currentItem.attr('id');
  var style = '';
  var messageContent = '';
  var title = 'Data';
  if (id == 'tab1') {
    title = 'Data';
    clearRightContent();
    displayRightContent(1);
    createForm();
  } else if (id == 'tab2') {
    title = 'Database';
    clearRightContent();
    clearForm();
    messageContent = 'Everyone dies from bullets.';
  } else {
    title = 'Chart';
    clearRightContent();
    clearForm();
    messageContent = 'Everyone dies from rocket powered pistols.';
  }
  updateRightTitle(title);
  // $('#story-text').html(messageContent);
}

function createForm() {
  var $form = create('form');
  var $addButton = create('button');
  var $postButton = create('button');
  var $clearButton = create('button');
  const keys = Object.keys(_schema);
  const objectLength = keys.length;
  for (var i = 0; i < objectLength; i++) {
    const value = _schema[keys[i]];

    var $div = create('div');
    var $label = create('label');
    var $input = create('input');

    $div.addClass('form-group');
    $label.html(value);
    $label.attr('id', keys[i]);
    $input.addClass('form-control');

    $label.appendTo($div);
    $input.appendTo($div);
    $div.appendTo($form);
  }

  $addButton.attr('type', 'submit');
  $addButton.attr('id', 'addButton');
  $addButton.addClass('btn btn-primary');
  $addButton.html('Add');
  $addButton.appendTo($form);
  $addButton.on('click', addStudent);

  $postButton.attr('type', 'submit');
  $postButton.attr('id', 'postButton');
  $postButton.addClass('btn btn-success');
  $postButton.html('Post');
  $postButton.css('marginLeft', '3%');

  $clearButton.attr('type', 'submit');
  $clearButton.attr('id', 'clearButton');
  $clearButton.addClass('btn btn-danger');
  $clearButton.html('Clear');
  $clearButton.css('marginLeft', '3%');

  if (_thereIsData) {
    showElement($postButton);
    showElement($clearButton);
  } else {
    hideElement($postButton);
    hideElement($clearButton);
  }
  $postButton.appendTo($form);
  $clearButton.appendTo($form);
  $form.appendTo($('#left-content'));
}

function showElement(element) {
  element.css('visibility', 'visible');
}

function hideElement(element) {
  element.css('visibility', 'hidden');
}

function updateRightTitle(title) {
  // var $h1 = create('h1');
  // $h1.attr('id', 'right-title');
  // $h1.html(title);
  // $h1.appendTo($('#right-content'));
  $('#right-title').html(title);
}

function clearForm() {
  $('#left-content').html('');
}

function clearRightContent() {
  $('#right-content-inner').html('');
}

function addStudent() {
  _thereIsData = true;
  showElement($('#postButton'));
  showElement($('#clearButton'));
  printStudentJson();
  createHtmlTable();
}

function printStudentJson() {
  var $formGroup = $('.form-group');
  var studentObj = {};
  for (var i = 0; i < $formGroup.length; i++) {
    var $formItem = $($formGroup[i]).first()[0];
    var labelId = $formItem.firstChild.id;
    var value = $formItem.lastChild.value;
    if (labelId == 'Age' || labelId == 'DailyInternetUsage') {
      value = parseInt(value);
    }
    studentObj[labelId] = value;
  }
  studentObj['id'] = `${studentObj['FirstName']}-${studentObj['LastName']}-${studentObj['Age']}`;
  _students.push(studentObj);

  // var $pre = create('pre');
  // $pre.html(JSON.stringify(_students, null, 2));
  // $pre.appendTo($('#right-content-inner'));
  $('#right-content-inner').html(`<pre>${JSON.stringify(_students, null, 2)}</pre>`);
}

function createHtmlTable() {
  var $table = create('table');
  var $trTop = create('tr');
  $trTop.appendTo($table);

  const keys = Object.keys(_schema);
  const objectLength = keys.length;
  for (var i = 0; i < objectLength; i++) {
    var $th = create('th');
    $th.html(keys[i]);
    $th.appendTo($trTop);
  }

  for (var i = 0; i < _students.length; i++) {
    var $tr = create('tr');
    for (var j = 0; j < objectLength; j++) {
      var $td = create('td');
      
      $td.html(_students[i][keys[j]]);
      $td.appendTo($tr);
    }
    $tr.appendTo($table);
  }
  $table.appendTo('#right-content-inner');
}

function displayRightContent(tab) {
  if (tab == 1) {
    $('#right-content-inner').html(`<pre>${JSON.stringify(_students, null, 2)}</pre>`);
    createHtmlTable();
  }
}

function create(element) {
  return $(document.createElement(element));
}
