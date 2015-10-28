function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  //var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    //daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.hours == 1 && t.minutes == 0 && t.seconds == 0) {
      alert("Boo");
      var audio = new  Audio('http://www.soundjay.com/button/beep-01a.mp3');
      audio.play();
    }

    if (t.total <= 0) {
      var d1 = new Date ();
      var d2 = new Date ( d1 );
      d2.setHours ( d1.getHours() + 7 );
      var deadline = d2;
      initializeClock('clockdiv', deadline);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}
//TODO - Pull the next warband from file rather than just 7 hours from present
var d1 = new Date ();
var d2 = new Date ();
d2.setHours ( d1.getHours() + 7 );
var deadline = d2;

var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
        initializeClock('clockdiv', deadline);
    }
}, 10);