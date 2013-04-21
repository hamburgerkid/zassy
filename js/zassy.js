var column = 6
var count = 0
var page = 1
var firstLimit = 3
var hit = 20
var above = 100
var pageLimit = 100
var duration = 800

var checkGenre = function(booksGenreId) {
  if (booksGenreId.indexOf('007610001')) {
    return false
  }
  return true
};

var loadItem = function() {
  $.getJSON('https://app.rakuten.co.jp/services/api/BooksMagazine/Search/20121128?applicationId=bd7dad817cb2f7fab2890e0b513db00d&affiliateId=11159626.d2e91abc.11159627.079be713&booksGenreId=007&hits=' + hit + '&page=' + page + '&chirayomiFlag=0&sort=-releaseDate&elements=booksGenreId,affiliateUrl,largeImageUrl', function(data) {
    $.each(data.Items, function(i, items) {
      $.each(items, function(j, item) {
        if (count % column === 0) {
          var divLeft = '<div class="row-fluid">'
          $(divLeft).appendTo("#content");
        }
        var url = item.largeImageUrl
        if (url.indexOf('noimage') === -1 && !checkGenre(item.booksGenreId)) {
          url = url.replace('?_ex=200x200', '')
          var divItem = '<div id="item" class="span2"><a href="' + item.affiliateUrl + '" target="_blank"><img src="' + url + '" class="img-rounded" /></a></div>'
          $(divItem).appendTo("#content");
          count++
        }
        if (count % column === 0) {
          var divRight = '</div>'
          $(divRight).appendTo('#content');
        }
      });
    });
  });
}

$(document).ready(function() {
  while (page < firstLimit) {
    loadItem()
    ++page
  }
  return false
});

var moreItem = function() {
  if (page < pageLimit) {
    loadItem()
    ++page
  } else if (page === pageLimit) {
    var divMsg = '<div class="alert alert-info"><a href="#" class="close" data-dismiss="alert">&times;</a><strong>No More Zassy. Thanks.</strong></div>'
    $(divMsg).appendTo('#message');
    $('#more-item').hide();
    ++page
  }
  return false
};

$(window).scroll(function() {
  if ($(window).scrollTop() + $(window).height() > $(document).height() - above) {
    moreItem()
  }
});

var backToTop = function () {
  $('html, body').animate({ scrollTop: 0 }, duration);
  return false
};
