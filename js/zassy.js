var column = 6
var count = 0
var page = 1
var above = 10
var pageLimit = 100

var loadItem = function() {
  $.getJSON('https://app.rakuten.co.jp/services/api/BooksMagazine/Search/20121128?applicationId=bd7dad817cb2f7fab2890e0b513db00d&affiliateId=11159626.d2e91abc.11159627.079be713&booksGenreId=007&page=' + page + '&chirayomiFlag=0&sort=-releaseDate&elements=affiliateUrl,largeImageUrl', function(data) {
    $.each(data.Items, function(i, items) {
      $.each(items, function(j, item) {
        if (count % column === 0) {
          var divLeft = '<div class="row-fluid">'
          $(divLeft).appendTo("#content");
        }
        var url = item.largeImageUrl.replace('?_ex=200x200', '')
        if (url.indexOf('noimage') === -1) {
          var divRow = '<div id="item" class="span2"><a href="' + item.affiliateUrl + '" target="_blank"><img src="' + url + '" class="img-rounded" /></a></div>'
          $(divRow).appendTo("#content");
          count++
        }
        if (count % column === 0) {
          var divRight = '</div>'
          $(divRight).appendTo("#content");
        }
      });
    });
  });
}

$(document).ready(function() {
  while (page < 2) {
    loadItem()
    ++page
  }
});

var moreItem = function() {
  if (page < pageLimit) {
    loadItem()
    ++page
  } else if (page === pageLimit) {
    var divMsg = '<div class="alert alert-info"><a href="#" class="close" data-dismiss="alert">&times;</a><strong>No More Zassy...</strong></div>'
    $(divMsg).appendTo("#message");
    ++page
  }
  return false
};

$(window).scroll(function() {
  if ($(window).scrollTop() + $(window).height() > $(document).height() - above) {
    moreItem()
  }
});