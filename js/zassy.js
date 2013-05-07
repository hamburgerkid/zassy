var count = 0
var page = 1
var init = 3
var column = 5
var hit = 10
var above = 100
var limit = 100

var checkGenre = function(booksGenreId) {
  if (booksGenreId.indexOf('007610001')) {
    return false
  }
  return true
};

var loadItem = function() {
  $.getJSON('https://app.rakuten.co.jp/services/api/BooksMagazine/Search/20121128?applicationId=bd7dad817cb2f7fab2890e0b513db00d&affiliateId=11159626.d2e91abc.11159627.079be713&booksGenreId=007&hits=' + hit + '&page=' + page + '&chirayomiFlag=0&sort=-releaseDate&elements=booksGenreId,affiliateUrl,largeImageUrl',
  function(data) {
    $.each(data.Items, function(i, items) {
      $.each(items, function(j, item) {
        if (count % column === 0) {
          var divLeft = '<div class="row-fluid">'
          $(divLeft).appendTo('#content');
        }
        var url = item.largeImageUrl
        if (url.indexOf('noimage') === -1 && !checkGenre(item.booksGenreId)) {
          url = url.replace('?_ex=200x200', '')
          var divItem = '<div id="item" class="span2"><a href="' + item.affiliateUrl + '" target="_blank"><img src="' + url + '" class="img-rounded"></a></div>'
          $(divItem).appendTo('#content');
          ++count
        }
        if (count % column === 0) {
          var divRight = '</div>'
          $(divRight).appendTo('#content');
        }
      });
    });
  });
};

var moreItem = function() {
  if (page < limit) {
    loadItem()
    ++page
  } else if (page === limit) {
    var divMsg = '<div class="alert alert-info"><a href="#" class="close" data-dismiss="alert">&times;</a><strong>All covers are aleady shown. You can pick your favorite one now. Thanks.</strong></div>'
    $(divMsg).appendTo('#message');
    $('#more').hide();
    ++page
  }
  return false
};

var backToTop = function() {
  $('html, body').animate({ scrollTop: 0 }, 'slow');
  return false
};

$(document).ready(function() {
  while (page < init) {
    loadItem()
    ++page
  }

  $(window).scroll(function() {
    if ($(window).scrollTop() + $(window).height() > $(document).height() - above) {
      moreItem()
    }
  });

  $("#more").click(function() {
    moreItem()
  });

  $("#brand").click(function() {
    backToTop()
  });

  $("#backtop").click(function() {
    backToTop()
  });

  $("#backhome").click(function() {
    window.location.replace('index.html')
  });
});

// Twitter Share Button
!function(d,s,id) {
  var js,fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location)?'http':'https';
  if (!d.getElementById(id)) {
    js = d.createElement(s);
    js.id = id;
    js.src = p + '://platform.twitter.com/widgets.js';
    fjs.parentNode.insertBefore(js,fjs);
  }
}(document, 'script', 'twitter-wjs');

// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-40371631-1', 'zassy.info');
ga('send', 'pageview');
