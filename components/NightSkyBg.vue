<template>
  <div class="night-sky-bg">
    <div class="night-sky-bg-container">
      <div class="sky">
        <div class="stars"></div>
        <div class="stars2"></div>
        <div class="stars3"></div>
        <div class="comet"></div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
$starFieldWidth: 2560;
$starFieldHeight: 2560;
$starStartOffset: 600px;

$starOneScrollDuration: 100s;
$starTwoScrollDuration: 125s;
$starThreeScrollDuration: 175s;
$numStarOneStars: 1700;
$numStarTwoStars: 700;
$numStarThreeStars: 200;
$numComet: 10;

.night-sky-bg {
  z-index: -1;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(to bottom, #080811 0%, #000000 100%);
  // width: 100%;
  // height: 100%;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
}

@function create-stars($n) {
  $stars: '#{random($starFieldWidth)}px #{random($starFieldHeight)}px #FFF';

  @for $i from 2 through $n {
    $stars: '#{$stars} , #{random($starFieldWidth)}px #{random($starFieldHeight)}px #FFF';
  }
  @return unquote($stars);
}

@keyframes animStar {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-#{$starFieldHeight}px)
      translateX(-#{$starFieldWidth}px);
  }
}

@keyframes animShootingStar {
  from {
    transform: translateY(0px) translateX(0px) rotate(-45deg);
    opacity: 1;
    height: 5px;
  }
  to {
    transform: translateY(-#{$starFieldHeight}px)
      translateX(-#{$starFieldWidth}px) rotate(-45deg);
    opacity: 1;
    height: 800px;
  }
}
@mixin star-template($numStars, $starSize, $scrollSpeed) {
  z-index: 10;
  width: $starSize;
  height: $starSize;
  border-radius: 50%;
  background: transparent;
  box-shadow: create-stars($numStars);
  animation: animStar $scrollSpeed linear infinite;
  &:after {
    content: ' ';
    top: -$starStartOffset;
    width: $starSize;
    height: $starSize;
    border-radius: 50%;
    position: absolute;
    background: transparent;
    box-shadow: create-stars($numStars);
  }
}

@mixin shooting-star-template($numStars, $starSize, $speed) {
  z-index: 10;
  width: $starSize;
  height: $starSize + 80px;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  position: absolute;
  bottom: 0;
  right: 0;
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1)
  );
  animation: animShootingStar $speed linear infinite;
}
.stars {
  @include star-template($numStarOneStars, 1px, $starOneScrollDuration);
}
.stars2 {
  @include star-template($numStarTwoStars, 2px, $starTwoScrollDuration);
}
.stars3 {
  @include star-template($numStarThreeStars, 3px, $starThreeScrollDuration);
}
.comet {
  @include shooting-star-template($numComet, 5px, 10s);
}
</style>
