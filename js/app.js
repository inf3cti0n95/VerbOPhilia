
function stringContains(s,substr) {
  return s.toString().indexOf(substr) != -1;
}

// window.history.pushState({page: 1}, "VerbOPhilia", "");
//   console.log(window.history.state.page);


var direct =false;
var direct1 =false;

$(document).ready(function(){
  var loc = window.location;
// alert(loc);

  var typingTl = new TimelineMax();

  if(stringContains(loc,"maverick")){
    console.log("in");
    getExplaination("maverick");
    animationIn();
    // window.history.replaceState()
    direct=true;
    direct1=true;
    // window.history.pushState({page:5},"Maverick","?word=maverick");
    // console.log(window.history.state);

  }


  if(direct != true){
    console.log(direct);


    //makes it flash at the end
    //
    // .to(wordOfTheDay, blinktime, {
    //     text:messageBodyStr + '|',
    //     repeat:-1,
    //     repeatDelay:blinktime,
    //     ease:Linear.easeNone
    // });
    direct=false;
  }
  else{
    wordOfTheDay.textContent = "Maverick";
  }
});



var mq = window.matchMedia( "(min-width: 320px) and (max-width: 600px)" );


var wordOfTheDay = document.getElementById("wordOfTheDay");
var messageBodyStr = wordOfTheDay.getAttribute("data-text");
var contentMain = document.getElementById("contentMain");
var content = document.getElementById("content");
var myText = document.getElementById("myText");
var text = document.getElementById("text");
var arrowLeft = document.querySelector("#arrowLeft");
var arrowRight = document.querySelector("#arrowRight");
var explaination = document.getElementById("explaination");
// "Maverick";

function animationIn() {
  var anim = new TimelineMax();
  anim.add(TweenMax.to(myText, 0.2, {opacity : 0, ease:Power4.easeInOut}));
  anim.add(TweenMax.to(text, 1, {css:{top:"0px"}, ease:Power4.easeInOut}));
  anim.add(TweenMax.to(contentMain, 1, {opacity: 1, y : "-50%", ease:Power4.easeInOut,delay: -1}));
  anim.add(TweenMax.to(arrowLeft, 0.2, {opacity:0, ease:Power4.easeInOut,delay: -1}));
  anim.add(TweenMax.to(arrowRight, 0.5, {opacity:1, ease:Power4.easeInOut,delay:-0.45}));
  if (mq.matches) {
    document.getElementById("contentWrapper").style.overflow = "auto";
    console.log("smalldevice");
  } else {
    // window width is less than 500px
  }

}

  arrowLeft.addEventListener("click", function (e) {
  e.preventDefault();
  getWord();
});

function getWord() {
  getExplaination("maverick");
  animationIn();
  // window.history.pushState({page:5},"Maverick","?word=maverick");
  console.log(window.history.state);
}
arrowRight.addEventListener("click",function () {

  if(direct1){
    console.log("direct");
    // window.history.pushState({page: 1}, "VerbOPhilia", "/verbophilia/");
  }
  else
    // window.history.go(-1);


  animationOut();


});

// window.addEventListener("popstate",function () {
//
//   if(window.history.state.page==1) {
//     animationOut();
//   }
//   else if(window.history.state.page==5) {
//     getWord();
//   }
//   else {
//     // window.history.go(-1);
//   }
// });
function animationOut () {

  var anim1 = new TimelineMax();
  anim1.add(TweenMax.to(arrowRight, 0.1, {opacity:0, ease:Power4.easeInOut}));
  anim1.add(TweenMax.to(contentMain, 1, {opacity: 0, y : "50%", ease:Power4.easeInOut}));
  anim1.add(TweenMax.to(wordOfTheDay, 1, {opacity:0, ease:Power4.easeInOut,delay: -1}));
  anim1.add(TweenMax.to(text, 1, {css:{top:"40%"}, ease:Power4.easeInOut,delay: -0.5}));
  anim1.add(TweenMax.to(myText, 0.2, {opacity : 1, ease:Power4.easeInOut,delay: -0.5}));
  anim1.add(TweenMax.to(wordOfTheDay, 0.2, {
    opacity: 1, onStart: function () {

    wordOfTheDay.textContent = "";

    anim1.to(wordOfTheDay, messageBodyStr.length/6, {
      text:messageBodyStr,
      onUpdate:function(){
        wordOfTheDay.textContent += ""
      },
      onComplete:function(){
        wordOfTheDay.textContent = messageBodyStr;
        TweenMax.to(arrowLeft,0.2,{opacity:1,x:10});
      }
    },'+=0.5');

  }, ease:Power4.easeInOut,delay: -0.7}));

  if (mq.matches) {
    document.getElementById("contentWrapper").style.overflow = "hidden";
    console.log("smalldevice");
  } else {
    // window width is less than 500px
  }

  // anim1.add(TweenMax.to(arrowLeft, 0.2, {opacity:1,x:10, ease:Power4.easeInOut,delay:1}));

}



function getExplaination(word){

    // document.getElementById("loader").style.display = "block";

    $.ajax({
      type:"GET",
      dataType: "json",
      url: "http://117.198.160.99/json.php?word="+word,
      success: function(data) {

        // document.getElementById("loader").style.display = "none";
        explaination.innerHTML = data[word];

      },
      error: function (data) {
        explaination.textContent = "Error";
      }
    });

}




