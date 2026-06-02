/* =============================================
   IKHLAQ PREMIUM PORTFOLIO — script.js
   ============================================= */

/* ===== LOADER ===== */
(function() {
  var fill = document.getElementById('loader-fill');
  var loaderText = document.getElementById('loader-text');
  var loader = document.getElementById('loader');
  var progress = 0;

  var messages = ['Initialising...', 'Loading assets...', 'Almost ready...', 'Welcome!'];
  var msgIndex = 0;

  var interval = setInterval(function() {
    progress += Math.random() * 18 + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      fill.style.width = '100%';
      loaderText.textContent = 'Welcome!';
      setTimeout(function() {
        loader.classList.add('done');
        initAll();
      }, 400);
    } else {
      fill.style.width = progress + '%';
      if (progress > msgIndex * 30 && msgIndex < messages.length - 1) {
        msgIndex++;
        loaderText.textContent = messages[msgIndex];
      }
    }
  }, 80);
})();

/* ===== INIT ALL ===== */
function initAll() {
  initCursor();
  initScrollProgress();
  initNavbar();
  initTyper();
  initParticles();
  initReveal();
  initCounters();
  initPortfolioFilter();
  initSkillBars();
  initSkillCircles();
  initTiltCards();
  initContactForm();
  initBurger();
}

/* ===== CUSTOM CURSOR ===== */
function initCursor() {
  var cursor = document.getElementById('cursor');
  var follower = document.getElementById('cursor-follower');
  if (!cursor || !follower) return;

  var mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', function(e) {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  function followMouse() {
    fx += (mx - fx) * 0.1;
    fy += (my - fy) * 0.1;
    follower.style.left = fx + 'px';
    follower.style.top = fy + 'px';
    requestAnimationFrame(followMouse);
  }
  followMouse();

  var hoverEls = document.querySelectorAll('a, button, .tilt-card, .port-item, .pf-btn, .filter-btn');
  hoverEls.forEach(function(el) {
    el.addEventListener('mouseenter', function() {
      cursor.classList.add('hover');
      follower.classList.add('hover');
    });
    el.addEventListener('mouseleave', function() {
      cursor.classList.remove('hover');
      follower.classList.remove('hover');
    });
  });
}

/* ===== SCROLL PROGRESS ===== */
function initScrollProgress() {
  var bar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', function() {
    var scrolled = window.scrollY;
    var total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (scrolled / total * 100) + '%';
  });
}

/* ===== NAVBAR ===== */
function initNavbar() {
  var nav = document.getElementById('navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

/* ===== BURGER MENU ===== */
function initBurger() {
  var burger = document.getElementById('burger');
  var menu = document.getElementById('mobile-menu');
  if (!burger || !menu) return;

  burger.addEventListener('click', function() {
    burger.classList.toggle('open');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });

  menu.querySelectorAll('.mob-link').forEach(function(link) {
    link.addEventListener('click', function() {
      burger.classList.remove('open');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ===== TYPEWRITER ===== */
function initTyper() {
  var el = document.getElementById('typed-text');
  if (!el) return;

  var phrases = [
    'cinematic videos',
    'stunning websites',
    'beautiful UI/UX',
    'powerful brand identities',
    'motion graphics',
    'unforgettable designs'
  ];

  var idx = 0, charIdx = 0, deleting = false;

  function tick() {
    var current = phrases[idx];

    if (deleting) {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    var delay = deleting ? 50 : 85;

    if (!deleting && charIdx === current.length) {
      delay = 2200;
      deleting = true;
    } else if (deleting && charIdx === 0) {
      deleting = false;
      idx = (idx + 1) % phrases.length;
      delay = 300;
    }

    setTimeout(tick, delay);
  }

  tick();
}

/* ===== PARTICLE CANVAS ===== */
function initParticles() {
  var canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var W, H, particles = [];
  var COLORS = ['#a855f7', '#06b6d4', '#f43f5e', '#f59e0b'];

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function Particle() {
    this.reset();
  }
  Particle.prototype.reset = function() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.r = Math.random() * 1.8 + 0.5;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.alpha = Math.random() * 0.5 + 0.1;
    this.life = Math.random() * 200 + 100;
    this.age = 0;
  };
  Particle.prototype.update = function() {
    this.x += this.vx;
    this.y += this.vy;
    this.age++;
    if (this.age > this.life || this.x < 0 || this.x > W || this.y < 0 || this.y > H) {
      this.reset();
    }
  };
  Particle.prototype.draw = function() {
    var fade = this.age < 20 ? this.age / 20 : (this.age > this.life - 20 ? (this.life - this.age) / 20 : 1);
    ctx.globalAlpha = this.alpha * fade;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  };

  var count = 80;
  for (var i = 0; i < count; i++) {
    var p = new Particle();
    p.age = Math.floor(Math.random() * p.life);
    particles.push(p);
  }

  var mouseX = -9999, mouseY = -9999;
  canvas.addEventListener('mousemove', function(e) {
    var rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  function drawConnections() {
    for (var a = 0; a < particles.length; a++) {
      for (var b = a + 1; b < particles.length; b++) {
        var dx = particles[a].x - particles[b].x;
        var dy = particles[a].y - particles[b].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.globalAlpha = (1 - dist / 100) * 0.12;
          ctx.strokeStyle = '#a855f7';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    particles.forEach(function(p) {
      var dx = p.x - mouseX;
      var dy = p.y - mouseY;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 80) {
        p.vx += (dx / dist) * 0.3;
        p.vy += (dy / dist) * 0.3;
      }
      p.vx *= 0.98;
      p.vy *= 0.98;
      p.update();
      p.draw();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(loop);
  }
  loop();
}

/* ===== SCROLL REVEAL ===== */
function initReveal() {
  var sections = document.querySelectorAll('.reveal-section');
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.08 });

  sections.forEach(function(s) { observer.observe(s); });
}

/* ===== COUNTER ANIMATION ===== */
function initCounters() {
  var counters = document.querySelectorAll('.stat-num[data-count]');
  var triggered = false;
  var aboutSection = document.getElementById('about');
  if (!aboutSection) return;

  var observer = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting && !triggered) {
      triggered = true;
      counters.forEach(function(el) {
        var target = parseInt(el.getAttribute('data-count'), 10);
        var start = 0;
        var duration = 1800;
        var startTime = null;

        function step(ts) {
          if (!startTime) startTime = ts;
          var progress = Math.min((ts - startTime) / duration, 1);
          var ease = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(ease * target);
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = target;
        }
        requestAnimationFrame(step);
      });
    }
  }, { threshold: 0.4 });

  observer.observe(aboutSection);
}

/* ===== PORTFOLIO FILTER ===== */
function initPortfolioFilter() {
  var btns = document.querySelectorAll('.pf-btn');
  var items = document.querySelectorAll('.port-item');

  btns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      btns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filter = btn.getAttribute('data-filter');
      items.forEach(function(item) {
        if (filter === 'all' || item.getAttribute('data-cat') === filter) {
          item.classList.remove('hidden');
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(function() {
            item.style.transition = 'opacity 0.4s, transform 0.4s';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

/* ===== SKILL BARS ===== */
function initSkillBars() {
  var bars = document.querySelectorAll('.skb-fill');
  var section = document.getElementById('skills');
  if (!section) return;
  var triggered = false;

  var observer = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting && !triggered) {
      triggered = true;
      bars.forEach(function(bar) {
        var w = bar.getAttribute('data-w');
        setTimeout(function() {
          bar.style.width = w + '%';
        }, 200);
      });
    }
  }, { threshold: 0.3 });

  observer.observe(section);
}

/* ===== SKILL CIRCLES (SVG) ===== */
function initSkillCircles() {
  var circles = document.querySelectorAll('.sc-fill');
  var section = document.getElementById('skills');
  if (!section) return;
  var triggered = false;

  var circumference = 2 * Math.PI * 34; /* r=34 */

  var observer = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting && !triggered) {
      triggered = true;
      circles.forEach(function(c) {
        var pct = parseInt(c.getAttribute('data-pct'), 10);
        var offset = circumference - (pct / 100) * circumference;
        setTimeout(function() {
          c.style.strokeDasharray = circumference;
          c.style.strokeDashoffset = offset;
        }, 300);
      });
    }
  }, { threshold: 0.3 });

  observer.observe(section);
}

/* ===== 3D TILT CARDS ===== */
function initTiltCards() {
  var cards = document.querySelectorAll('.tilt-card');

  cards.forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
      var rect = card.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;
      var mx = e.clientX - cx;
      var my = e.clientY - cy;
      var rotX = -(my / (rect.height / 2)) * 8;
      var rotY = (mx / (rect.width / 2)) * 8;
      card.style.transform = 'perspective(800px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) translateY(-4px)';
    });

    card.addEventListener('mouseleave', function() {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
      setTimeout(function() { card.style.transition = ''; }, 500);
    });
  });
}

/* ===== CONTACT FORM ===== */
function initContactForm() {
  var form = document.getElementById('cform');
  var success = document.getElementById('cf-success');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var btn = form.querySelector('.cf-submit');
    var btnText = btn.querySelector('.cf-submit-text');
    btnText.textContent = 'Sending...';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    setTimeout(function() {
      success.style.display = 'block';
      form.reset();
      btnText.textContent = 'Send Message';
      btn.disabled = false;
      btn.style.opacity = '1';
      setTimeout(function() {
        success.style.display = 'none';
      }, 5000);
    }, 1400);
  });
}
