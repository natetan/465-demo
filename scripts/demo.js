window.onresize = function() {
  resize();
};

var schema = {
  FirstName: 'First Name',
  LastName: 'Last Name',
  Age: 'Age',
  DailyInternetUsage: 'Daily Internet Usage',
  FavoriteClass: 'Favorite Class',
  FavoriteHobby: 'Favorite Hobby',
}

createForm();

var $lis = $('.nav-tabs').children();
$lis.on('click', updateActive);

function updateActive() {
  var $currentItem = $(this);
  $currentItem.siblings().removeClass('active');
  $currentItem.addClass('active');

  var id = $currentItem.attr('id');
  var style = '';
  var messageContent = '';
  if (id == 'tab1') {
    console.log('Tab 1 clicked');
    createForm();
  } else if (id == 'tab2') {
    clearForm();
    messageContent = 'Everyone dies from bullets.';
  } else {
    clearForm();
    messageContent = 'Everyone dies from rocket powered pistols.';
  }
  // $('#story-text').html(messageContent);
}

function createForm() {
  var $form = $(document.createElement('form'));
  var $button = $(document.createElement('button'));
  const keys = Object.keys(schema);
  const objectLength = keys.length;
  for (var i = 0; i < objectLength; i++) {
    const value = schema[keys[i]];

    var $div = $(document.createElement('div'));
    var $label = $(document.createElement('label'));
    var $input = $(document.createElement('input'));

    $div.addClass('form-group');
    $label.html(value);
    $label.attr('id', keys[i]);
    $input.addClass('form-control');

    $label.appendTo($div);
    $input.appendTo($div);
    $div.appendTo($form);
  }

  $button.attr('type', 'submit');
  $button.attr('id', 'submitButton');
  $button.addClass('btn btn-primary');
  $button.html('Submit');
  $button.appendTo($form);
  $button.on('click', printStudentJson);

  $form.appendTo($('#form-area'));
}

function clearForm() {
  $('#form-area').html('');
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
  $('#content').html(`<pre>${JSON.stringify(studentObj, null, 2)}</pre>`);
}

function resize() {
  var height = window.innerHeight;
  $('#right-content').css({
    height: height + 'px',
  });
}