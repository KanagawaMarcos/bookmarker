//Listen for a submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  var bookmark = {
    name: siteName,
    url: siteUrl
  }

  if (!validateForm(siteName, siteUrl)) {
    return false;
  }
  /*
    // Local storage examples

    localStorage.setItem('key','value');
    localStorage.getItem('key');
    localStorage.removeItem('key')
  */

  //  Check if there isn't any bookmark created yet
  if (localStorage.getItem('bookmarks') === null) {
    //  Initialize the array of bookmarks
    var bookmarks = [];

    //  Adds the first bookmark
    bookmarks.push(bookmark);

    //  Adds it to local local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  } else {
    //  Get the array of bookmarks
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //  Adds the new site to array
    bookmarks.push(bookmark);

    //  Re-set the local storage bookmark
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  //  Clear the form
  document.getElementById('myForm').reset();

  //  Update the html page
  fetchBookmarks();

  //  Prevent form from submiting
  e.preventDefault();
}

//  Delete a bookmark
function deleteBookmark(url) {

  //  Get all bookmarks
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  //  Iterate through all bookmarks
  for (var i = 0; i < bookmarks.length; i++) {

    //  If the url matchs some, it deletes it
    if (bookmarks[i].url == url) {

      //  Remove the bookmark
      bookmarks.splice(i, 1);
    }
  }

  //  Updates the bookmarks in the local storage again
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  //  Update the html page
  fetchBookmarks();

  //  Prevent form from submiting
  e.preventDefault();
}

function fetchBookmarks() {

  //  Get all bookmarks
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  //  Get the DOM object that is going to output the fetch result
  var bookmarksResult = document.getElementById('bookmarksResults');

  //  Loop through all bookmarks and output them
  for (var i = 0; i < bookmarks.length; i++) {

    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResult.innerHTML += '<div class="well">' + '<h3>' + name + '<a class="btn btn-default" target="__blank" href="' + url + '">Visit</a>' + '<a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="">Delete</a>' + '</h3></div>';
  }


}

function validateForm(siteName, siteUrl) {
  //  Check if the form was actually filled
  if (!siteName || !siteUrl) {
    alert('Please, fill in the form!');
    return false;
  }

  //  Create a regular expression to validate the page url
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert('Please use a valid url!');
    return false;
  }
  return true;
}
