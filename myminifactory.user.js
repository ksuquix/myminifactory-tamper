// ==UserScript==
// @name           Myminifactory Download assistant
// @namespace      https://github.com/ksuquix/myminifactory-tamper
// @version        0.0.4
// @description    An assist so you can see the projects you haven't gotten yet.
// @include        https://www.myminifactory.com/object/*
// @require        http://code.jquery.com/jquery-1.12.4.min.js
// @run-at         document-end
// ==/UserScript==

function myrenderall() {
  // drop wgets for images into paste buffer (do first while document is focused)
  impath = $('meta[property="og:image"]').attr("content").match(/.*\//)[0];
  imout = [];
  $("img")
    .map((_, { src }) => src)
    .get()
    .filter((s) => s.includes(impath))
    .forEach((x) => imout.push(x.replace("70X70", "720x720")));
  navigator.clipboard.writeText("wget " + imout.join("\nwget "));
}

function mygetall() {
  // Fetch all downloads (on specific object page)
  jQuery
    .parseJSON($(".cont-download script").text())
    .archives.forEach(function (lnk) {
      console.log(lnk.download_url);
      window.open(lnk.download_url);
    });
}

$(document).ready(function () {
	$("button.downloadButton").after('<button class="basic-button  red mydownloader"><i class="ico-download fa fa-arrow-down" aria-hidden="true"></i> Files</button>');
	$('button.mydownloader').click(mygetall);
	$("button.downloadButton").after('<button class="basic-button  red myrenders"><i class="ico-download fa fa-arrow-down" aria-hidden="true"></i> Renders</button>');
  	$('button.myrenders').click(myrenderall);
});