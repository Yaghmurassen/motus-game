<template>
  <div class="loader">
    <div class="square"></div>
    <div class="square"></div>
    <div class="square last"></div>
    <div class="square clear"></div>
    <div class="square"></div>
    <div class="square last"></div>
    <div class="square clear"></div>
    <div class="square"></div>
    <div class="square last"></div>
  </div>
</template>

<style lang="scss" scoped>
$squarew: 15px;
$squareh: 15px;
$squaremargin: 5px;
$loaderw: $squarew * 3 + $squaremargin * 2;
$loaderh: $squareh * 3 + $squaremargin * 2;
$delayenter: 0.3s;
$topenter: -10px;

@mixin transition($value) {
  -webkit-transition: $value;
  -moz-transition: $value;
  transition: $value;
}

@mixin delay($delay) {
  -webkit-animation-delay: $delay;
  -moz-animation-delay: $delay;
  animation-delay: $delay;
}
@-webkit-keyframes enter {
  0% {
    opacity: 0;
    top: $topenter;
  }
  5% {
    opacity: 1;
    top: 0px;
  }
  50% {
    opacity: 1;
    top: 0px;
  }
  55% {
    opacity: 0;
    top: -$topenter;
  }
}
@keyframes enter {
  0% {
    opacity: 0;
    top: $topenter;
  }
  5% {
    opacity: 1;
    top: 0px;
  }
  50% {
    opacity: 1;
    top: 0px;
  }
  55% {
    opacity: 0;
    top: -$topenter;
  }
}
@-moz-keyframes enter {
  0% {
    opacity: 0;
    top: $topenter;
  }
  5% {
    opacity: 1;
    top: 0px;
  }
  50% {
    opacity: 1;
    top: 0px;
  }
  55% {
    opacity: 0;
    top: -$topenter;
  }
}

.loader {
  position: absolute;
  left: 50%;
  top: 58%;
  margin-left: -$loaderw / 2;
  margin-top: -$loaderh / 2;
}
.square {
  background: white;
  width: $squarew;
  height: $squareh;
  float: left;
  top: $topenter;
  margin-right: $squaremargin;
  margin-top: $squaremargin;
  position: relative;
  opacity: 0;
  -webkit-animation: enter 6s infinite;
  animation: enter 6s infinite;
}
.enter {
  top: 0px;
  opacity: 1;
}
.square:nth-child(1) {
  @include delay(6 * $delayenter);
}
.square:nth-child(2) {
  @include delay(7 * $delayenter);
}
.square:nth-child(3) {
  @include delay(8 * $delayenter);
  background: #fdc96f;
}
.square:nth-child(4) {
  @include delay(3 * $delayenter);
}
.square:nth-child(5) {
  @include delay(4 * $delayenter);
}
.square:nth-child(6) {
  @include delay(5 * $delayenter);
}

.square:nth-child(8) {
  @include delay(1 * $delayenter);
}
.square:nth-child(9) {
  @include delay(2 * $delayenter);
}
.clear {
  clear: both;
}
.last {
  margin-right: 0;
}
</style>