<template>
  <div class="testTracking">
    <div class="demo-title">
      <p>detect faces in a image</p>
    </div>

    <div class="demo-frame">
      <div class="demo-container">
        <img id="img" src="../../assets/beauty.png" />
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/tracking-min.js'
import '@/assets/face-min.js'

export default {
  mounted () {
    const img = document.getElementById('img');
    const tracker = new window.tracking.ObjectTracker(['face']);
    tracker.setStepSize(1.7);

    window.tracking.track('#img', tracker);

    tracker.on('track', function (event) {
      console.log(event.data)
      event.data.forEach(function (rect) {
        window.plot(rect.x, rect.y, rect.width, rect.height);
      });
    });

    window.plot = function (x, y, w, h) {
      var rect = document.createElement('div');
      document.querySelector('.demo-container').appendChild(rect);
      rect.classList.add('rect');
      rect.style.width = w + 'px';
      rect.style.height = h + 'px';
      rect.style.left = (img.offsetLeft + x) + 'px';
      rect.style.top = (img.offsetTop + y) + 'px';
    };
  }
}
</script>
