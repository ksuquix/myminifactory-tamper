// ==UserScript==
// @name           Myminifactory Download assistant
// @namespace      https://github.com/ksuquix/myminifactory-tamper
// @version        0.0.7
// @description    An assist so you can see the projects you haven't gotten yet.
// @match        https://www.myminifactory.com/object/*
// @match        https://www.myminifactory.com/library*
// @require        http://code.jquery.com/jquery-1.12.4.min.js
// @run-at         document-end
// ==/UserScript==

function myrenderall() {
  // drop wgets for images into paste buffer (do first while document is focused)
  let impath = $('meta[property="og:image"]').attr("content").match(/.*\//)[0];
  let imout = [];
  $("img")
    .map((_, { src }) => src)
    .get()
    .filter((s) => s.includes(impath))
    .forEach((x) => imout.push(x.replace("70X70", "720X720").replace("230X230","720X720")));
  navigator.clipboard.writeText("wget " + imout.join("\nwget "));
  console.log("render in paste");
  alert("Pasted");
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

function mylibrenderall() {
  let imout = [];
  $("div.object-img a img").each(function() { imout.push($(this).attr("src"))})
  navigator.clipboard.writeText("wget " + imout.join("\nwget "));
  console.log("render in paste");
  alert(`Pasted: ${imout.length}\n`+imout.join("\n"));
}

$(document).ready(function () {
  $("button.MuiButton-containedPrimary").after('<button class="basic-button  red mylibrender"><i class="ico-download fa fa-arrow-down" aria-hidden="true"></i> Renders</button>')
  $('button.mylibrender').click(mylibrenderall);
	$("button.downloadButton").after('<button class="basic-button  red mydownloader"><i class="ico-download fa fa-arrow-down" aria-hidden="true"></i> Files</button>');
	$('button.mydownloader').click(mygetall);
	$("button.downloadButton").after('<button class="basic-button  red myrenders"><i class="ico-download fa fa-arrow-down" aria-hidden="true"></i> Renders</button>');
  $('button.myrenders').click(myrenderall);
});