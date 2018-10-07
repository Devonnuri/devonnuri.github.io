// Wrap every letter in a span
$('.logo .letters').each(function() {
  $(this).html(
    $(this)
      .text()
      .replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>")
  );
});

$('.title p').each(function() {
  $(this).html(
    $(this)
      .text()
      .replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>")
  );
});

anime
  .timeline()
  .add({
    targets: '.logo .letter',
    scale: [0.3, 1],
    opacity: [0, 1],
    translateZ: 0,
    easing: 'easeOutExpo',
    duration: 600,
    delay: function(el, i) {
      return 70 * (i + 1);
    }
  })
  .add({
    targets: '.logo .line',
    scaleX: [0, 1],
    opacity: [0.5, 1],
    easing: 'easeOutExpo',
    duration: 700,
    offset: '-=875',
    delay: function(el, i, l) {
      return 80 * (l - i);
    }
  });

anime.timeline().add({
  targets: '.title .letter',
  opacity: [0, 1],
  easing: 'easeInOutQuad',
  duration: 400,
  delay: function(el, i) {
    return 30 * (i + 1);
  }
});

anime.timeline().add({
  targets: '.scrollDown',
  opacity: [0, 1],
  easing: 'easeInOutQuad',
  delay: 500
});
