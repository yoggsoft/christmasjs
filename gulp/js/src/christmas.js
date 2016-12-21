(function () {
  var count, wind, particles, PI2, ctx, canvas;
  var width = window.innerWidth;
  var height = window.innerHeight;
  var halfWidth = width / 2;
  // var mouse = {
  //   x: 0,
  //   y: 0
  // };
  var snow = function () {
    count = 75;
    wind = {
      x: 2,
      y: 1
    };
    PI2 = Math.PI * 2;
    particles = [];
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.className = 'snow';
    canvas.style.width = width;
    canvas.style.height = height;
    document.body.appendChild(canvas);
    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 1 + Math.random() * 3,
        weight: Math.random() * count,
        angle: Math.random() * 360
      });
    }
  };

  var render = function () {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(250,250,250,0.8)';
    ctx.beginPath();
    for (var i = 0; i < count; i++) {
      var particle = particles[i];
      ctx.moveTo(particle.x, particle.y);
      ctx.arc(particle.x, particle.y, particle.size, 0, PI2, true);
    }
    ctx.fill();
    update();
    // requestAnimationFrame(render);
  };

  snow();

  var update = function () {
    for (var i = 0; i < count; i++) {
      var particle = particles[i];
      particle.angle += 0.01;
      particle.y += Math.cos(particle.weight) + wind.y + particle.size / 2;
      particle.x += Math.sin(particle.angle) + wind.x;
      if (particle.x > width + 5 || particle.x < -5 || particle.y > height) {
        if (i % 3 > 0) {
          particle.x = Math.random() * width;
          particle.y = -5;
        } else {
          if (particle.x > halfWidth) {
            particle.x = -5;
            particle.y = Math.random() * height;
          } else {
            particle.x = width + 5;
            particle.y = Math.random() * height;
          }
        }
      }
    }
  };
  render();
})();
