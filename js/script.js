

//==============================================================================================
//================================PARTICLEJS START================================================
//==============================================================================================


particlesJS('particles-js',
    {
        "particles": {
            "number": {
                "value": 40,
                "density": {
                    "enable": true,
                    "value_area": 1000
                }
            },
            "color": {
                "value": "#EF3238"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 7.891476416322726,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "window",
            "events": {
                "onhover": {
                    "enable": false,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": false,
                    "mode": "bubble"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    }
);




//==============================================================================================
//================================DOCREADY SCRIPT START================================================
//==============================================================================================





(function(funcName, baseObj) {
    "use strict";
    // The public function name defaults to window.docReady
    // but you can modify the last line of this function to pass in a different object or method name
    // if you want to put them in a different namespace and those will be used instead of
    // window.docReady(...)
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;

    // call this when the document is ready
    // this function protects itself against being called more than once
    function ready() {
        if (!readyFired) {
            // this must be set to true before we start calling callbacks
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                // if a callback here happens to add new ready handlers,
                // the docReady() function will see that it already fired
                // and will schedule the callback to run right after
                // this event loop finishes so all handlers will still execute
                // in order and no new ones will be added to the readyList
                // while we are processing the list
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            // allow any closures held by these functions to free
            readyList = [];
        }
    }

    function readyStateChange() {
        if ( document.readyState === "complete" ) {
            ready();
        }
    }

    // This is the one public interface
    // docReady(fn, context);
    // the context argument is optional - if present, it will be passed
    // as an argument to the callback
    baseObj[funcName] = function(callback, context) {
        // if ready has already fired, then just schedule the callback
        // to fire asynchronously, but right away
        if (readyFired) {
            setTimeout(function() {callback(context);}, 1);
            return;
        } else {
            // add the function and context to the list
            readyList.push({fn: callback, ctx: context});
        }
        // if document already ready to go, schedule the ready function to run
        // IE only safe when readyState is "complete", others safe when readyState is "interactive"
        if (document.readyState === "complete" || (!document.attachEvent && document.readyState === "interactive")) {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            // otherwise if we don't have event handlers installed, install them
            if (document.addEventListener) {
                // first choice is DOMContentLoaded event
                document.addEventListener("DOMContentLoaded", ready, false);
                // backup is window load event
                window.addEventListener("load", ready, false);
            } else {
                // must be IE
                document.attachEvent("onreadystatechange", readyStateChange);
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    }
})("docReady", window);









//==============================================================================================
//================================MAINSCRIPT START================================================
//==============================================================================================




//==============================================================================================
//================================METHODS================================================
//==============================================================================================



function stringContains(string, substring) {
    return string.toString().indexOf(substring) != -1;
}

function getParam(paramName) {
    var val, i;
    var params = window.location.search.substring(1).split("&");
    for (i = 0; i < params.length; i++) {
        val = params[i].split("=");
        if (val[0] == paramName) {
            return val[1];
        }
    }

}
function checkURL() {
    if (stringContains(window.location.search.substring(1), "word=")) {
        return getParam("word");
    } else if (window.location.search.substring(1) == "") {
        return "homepg"
    } else {
        return "404";
    }
}
function checkRefresh(url) {
    return window.history.state == null ? true : window.history.state.page == url;
}


function navigate(url, state) {
    if (state == "replace") {
        if (url == "homepg") {
            window.history.replaceState({page: url}, "VerbOPhilia", "");
            goToHomePage();

        } else if (url == "404") {
            window.history.replaceState({page: url}, "VerboPhilia | Page Not Found", "/404");
            goTo404();

        } else {
            window.history.replaceState({page: url}, "VerboPhilia | " + url, "/?word=" + url);
            goToWord(url);
        }
    }
    else if (state == "push") {
        if (url == "homepg") {
            window.history.pushState({page: url}, "VerbOPhilia", "");
            goToHomePage();
        } else if (url == "404") {
            window.history.pushState({page: url}, "VerboPhilia | Page Not Found", "/404");
            goTo404();
        } else {
            window.history.pushState({page: url}, "VerboPhilia | " + url, "/?word=" + url);
            goToWord(url);
        }
    }
}

//==============================================================================================
//================================LOGIC START================================================
//==============================================================================================

var theWord,theExplaination;

function loadingAnimation(s) {
    if(s == "start"){
        loader.style.display="block";
        TweenMax.to(loader,0.5,{opacity:1});
        TweenMax.set(explaination,{opacity:0});
        var loadingmsg="Getting the Explaination..."
        TweenMax.to(loader, loadingmsg.length/6, {
            text:loadingmsg,
            onUpdate:function(){
                loader.textContent += ""
            },
            onComplete:function(){
                loader.textContent = loadingmsg;
                // TweenMax.to(arrowLeft,0.2,{opacity:1,x:10});
            }
        },'+=0.5');


    }
    else{
        TweenMax.to(loader,0.5,{opacity:0,onComplete:function () {
            loader.textContent="";
            loader.style.display = "none";
            TweenMax.to(explaination,0.11,{opacity:1});

        }});
        console.log("end");
    }
}
function requestWordAndExplainations (s) {

        loadingAnimation("start");
        var xmlhttp = new XMLHttpRequest();
        var url = "http://localhost/json.php/?word="+s;

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                loadingAnimation("end");
                var myArr = JSON.parse(xmlhttp.responseText);
                theWord=myArr["word"];
                messageBodyStr = theWord;
                var expl = myArr["explaination"];
                console.log(expl);
                if(expl!=""){
                    theExplaination=expl;
                    explaination.innerHTML = expl;
                }else{
                    explaination.innerHTML="The word is yet to be Explained send the word to me."
                }
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();

}
docReady(function () {
    var url = checkURL();
    if(checkRefresh(url)){
        navigate(url,"replace");
    }else{
        navigate(url,"push")
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
var loader = document.getElementById("loader");



//==============================================================================================
//================================LOGIC START================================================
//==============================================================================================

function goToHomePage () {
    var typingAnimation =  TweenMax
        .to(wordOfTheDay, messageBodyStr.length/6, {
            text:messageBodyStr,
            onUpdate:function(){
                wordOfTheDay.textContent += "";
            },
            onComplete:function(){
                wordOfTheDay.textContent = messageBodyStr;
                TweenMax.to(arrowLeft,0.2,{opacity:1,x:10});
            }
         },'+=0.5');
}


function goToWord(word) {
    requestWordAndExplainations(word);
    wordOfTheDay.textContent = word;
    var anim = new TimelineMax();
    anim.add(TweenMax.to(myText, 0.2, {opacity: 0, ease: Power4.easeInOut}));
    anim.add(TweenMax.to(text, 1, {css: {top: "0px"}, ease: Power4.easeInOut}));
    anim.add(TweenMax.to(contentMain, 1, {opacity: 1, y: "-50%", ease: Power4.easeInOut, delay: -1}));
    anim.add(TweenMax.to(arrowLeft, 0.2, {opacity: 0, ease: Power4.easeInOut, delay: -1}));
    anim.add(TweenMax.to(arrowRight, 0.5, {opacity: 1, ease: Power4.easeInOut, delay: -0.45}));
    if (mq.matches) {
        document.getElementById("contentWrapper").style.overflow = "auto";
    }
}

arrowLeft.addEventListener("click",function (e) {
    navigate(messageBodyStr,"push");
});

arrowRight.addEventListener("click",function (e) {
    window.history.back();
    explaination.innerHTML="";

});

function goTo404() {

}


window.addEventListener("popstate",function (e) {
    if(checkURL() == "homepg"){
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
        }
    }
});































