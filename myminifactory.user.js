// ==UserScript==
// @name           Myminifactory Download assistant
// @namespace      https://github.com/ksuquix/myminifactory-tamper
// @version        0.0.1
// @description    An assist so you can see the projects you haven't gotten yet.
// @include        https://www.myminifactory.com/object/*
// @require        http://code.jquery.com/jquery-1.12.4.min.js
// @run-at         document-end
// ==/UserScript==


function mygetall(){
	
// Fetch all downloads (on specific object page)
jQuery
.parseJSON($(".cont-download script").text())
.archives.forEach(function (lnk) {
  console.log(lnk.download_url);
  window.open(lnk.download_url);
});

// drop wgets for images into paste buffer
impath=$('meta[property="og:image"]').attr('content').match(/.*\//)[0];
imout=[];
$('img').map((_, { src }) => src).get().filter(s => s.includes(impath)).forEach(x => imout.push(x.replace("70X70","720x720")));
navigator.clipboard.writeText("wget "+imout.join("\nwget "));

}

$(document).ready(function() {
   $('button.downloadButton').after('<button class="basic-button  red" onclick="mygetall(); return false;"><i class="ico-download fa fa-arrow-down" aria-hidden="true"></i> All</button>');
});

