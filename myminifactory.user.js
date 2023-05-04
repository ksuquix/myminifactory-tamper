// ==UserScript==
// @name           Myminifactory Download assistant
// @namespace      https://github.com/ksuquix/myminifactory-tamper
// @version        0.0.11
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
    .forEach(function(x) {
      let imsrc=x.replace("70X70", "720X720").replace("230X230","720X720");
      imout.push("wget -O "+imsrc.replace("https://cdn2.myminifactory.com/assets/object-assets/","").replace(/\//g,"-")+" "+imsrc);
    });
  navigator.clipboard.writeText(imout.join("\n"));
  console.log("render in paste");
  alert("Pasted: "+`${imout.length}\n`+imout.join("\n"));
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
  $("div.object-img a img").each(function() { 
    let imsrc=$(this).attr("src").replace("70X70", "720X720").replace("230X230","720X720");
    imout.push("wget -O "+imsrc.replace("https://cdn2.myminifactory.com/assets/object-assets/","").replace(/\//g,"-")+" "+imsrc);
  });
  navigator.clipboard.writeText(imout.join("\n"));
  console.log("render in paste");
  alert(`Pasted: ${imout.length}\n`+imout.join("\n"));
}

function mygetloop() {
  if(dloader >= $("button.actionButton").length) {
    $("div[role=presentation] div").click();
  } else {
    $("button.actionButton")[dloader].click();
    console.log(dloader);
    dloader++;
    setTimeout(function() {
      mygetloop();
    },1000);
  }
}

function mylibgetall() {
  dloader = 0;
  $("div.object-card-options-box div button").click();
  mygetloop();
}

var dloader = 0;
$(document).ready(function () {
  $("button.MuiButton-containedPrimary").after('<button class="basic-button  red mylibrender"><i class="ico-download fa fa-arrow-down" aria-hidden="true"></i> Renders</button>')
  $("button.MuiButton-containedPrimary").after('<button class="basic-button  red mylibget"><i class="ico-download fa fa-arrow-down" aria-hidden="true"></i> DL</button>')
  $('button.mylibget').click(mylibgetall);
  $('button.mylibrender').click(mylibrenderall);
	$("button.downloadButton").after('<button class="basic-button  red mydownloader"><i class="ico-download fa fa-arrow-down" aria-hidden="true"></i> Files</button>');
	$('button.mydownloader').click(mygetall);
	$("button.downloadButton").after('<button class="basic-button  red myrenders"><i class="ico-download fa fa-arrow-down" aria-hidden="true"></i> Renders</button>');
  $('button.myrenders').click(myrenderall);
});