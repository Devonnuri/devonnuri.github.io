anime
  .timeline()
  .add({
    targets: '#logo #devonnuri path',
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 300,
    offset: 200,
    delay: function(el, i) {
      return 70 * (i + 1);
    }
  })
  .add({
    targets: '#logo #Eye_1',
    translateY: [100, 0],
    easing: 'easeOutExpo',
    duration: 800,
    offset: 600
  })
  .add({
    targets: '#logo #Eye_2',
    translateY: [100, 0],
    easing: 'easeOutExpo',
    duration: 800,
    offset: 800
  })
  .add({
    targets: '#logo #Brush',
    translateY: [-100, 0],
    easing: 'easeOutExpo',
    duration: 500,
    offset: 1000
  });
