<template>
  <section class="company-profile">
    <div class="container flex flex-col md:flex-row py-20 md:space-x-20">
      <div class="flex-1 mt-5 text-gray-800 lg:mt-0">
        <h2 class="title">
          Improve Battery
        </h2>
        <h3 class="sub-title">
          A Leading Provider of LiFePO4 Battery Energy Solutions
        </h3>

        <p class="description-content">
          We not only provide high quality product with excellent services.
          Also, Improve is committed to providing environment-friendly,
          fast and efficient new energy integration solution services.
        </p>
        <p class="description-content">
          With more and more products successfully exporting to over
          50 countries, we won a fair reputation for trusted manufacturer
          and faithful partner.
        </p>

        <router-link
          to="/about-us"
          class="link-view-more"
        >
          <div class="link-icon-wrapper">
            <svg-icon
              name="index/arrow_right"
              class="link-icon"
            />
          </div>

          View More About Us
        </router-link>
      </div>

      <div class="flex-1 bg-red-700'">
        <div class="wrapper-company-img">
          <img
            src="/img/index/company.png"
            alt="IMPROVE battery"
          >

          <div class="btn-play-wrapper">
            <svg-icon
              name="index/video_play"
              class="btn-play"
              @click="showVideo"
            />
          </div>
        </div>
      </div>
    </div>

    <transition
      name="animate"
      enter-active-class="animate__animated animate__faster animate__fadeIn"
      leave-active-class="animate__animated animate__faster animate__fadeOut"
    >
      <div
        v-if="showVideoPopup"
        class="video-popup"
      >
        <video
          ref="smallVideo"
          preload="auto"
          class="company-video video-js vjs-big-play-centered"
        />
      </div>
    </transition>

    <transition
      name="custom-classes"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div
        v-if="showVideoPopup"
        class="mask"
        @click="hideVideo"
      />
    </transition>
  </section>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref } from 'vue'

// import OverlayMask from '@/components/OverlayMask.vue'
import videojs from 'video.js'
import 'video.js/dist/video-js.min.css'
import 'videojs-youtube/dist/Youtube'

const showVideoPopup = ref(false)

let player: videojs.Player | null = null

const smallVideo = ref<HTMLVideoElement | null>(null)

// 初始化视频播放器
async function initVideoPlayer () {
  player = videojs(smallVideo.value, {
    controls: true,
    autoplay: true,
    fluid: true,
    aspectRatio: '16:9',
    techOrder: ['youtube', 'html5'],
    poster: '/img/index/small-video-poster.jpg',
    sources: [
      {
        type: 'video/youtube',
        src: 'https://www.youtube.com/watch?v=KglUjBgeQV4',
      },
    ],
    controlBar: { // 设置控制条组件
      /* 设置控制条里面组件的相关属性及显示与否  */
      currentTimeDisplay: true,
      timeDivider: true,
      durationDisplay: true,
      remainingTimeDisplay: false,
      volumePanel: {
        inline: false,
      },

      /* 使用children的形式可以控制每一个控件的位置，以及显示与否 */
      children: [
        { name: 'playToggle' }, // 播放/暂停按钮
        { name: 'currentTimeDisplay' }, // 视频当前已播放时间
        { name: 'progressControl' }, // 播放进度条
        { name: 'durationDisplay' }, // 视频播放总时间
        { // 倍数播放，可以自己设置
          name: 'playbackRateMenuButton',
        },
        { name: 'FullscreenToggle' }, // 全屏
      ],
    },
  })

  return player
}

function showVideo () {
  showVideoPopup.value = true

  nextTick(() => {
    initVideoPlayer().then((player) => {
      player.play()
    })

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        hideVideo()
      }
    })
  })
}

function hideVideo () {
  showVideoPopup.value = false

  setTimeout(() => {
    player?.dispose()
    player = null
  }, 500)
}

onBeforeUnmount(() => {
  if (player) {
    hideVideo()
  }

  document.removeEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hideVideo()
    }
  })
})
</script>

<style lang="scss">
.company-video.video-js {
  width: 100%;

  .vjs-tech {
    width: 100% !important;
  }

  .vjs-poster {
    background-size: cover;
  }
}

/* 暂停时显示播放按钮 */
.vjs-paused .vjs-big-play-button,
.vjs-paused.vjs-has-started .vjs-big-play-button {
  display: block;
}

.video-js .vjs-big-play-button{
  width: 2.5em;
  height: 2.5em;
  margin-top: -1.25em;
  margin-left: -1.75em;
  font-size: 2.5em;
  line-height: 2.3em;
  background-color: #fff;
  border-width: 0.15em;
  border-radius: 2.5em;
}

/* 中间的播放箭头 */
.vjs-big-play-button .vjs-icon-placeholder {
  font-size: 1.63em;
  color: var(--color-primary);
}

/* 加载圆圈 */
.vjs-loading-spinner {
  width: 2em;
  height: 2em;
  margin-top: -1em;
  margin-left: -1.5em;
  font-size: 2.5em;
  border-radius: 1em;
}

/* 点击屏幕播放/暂停 */
.video-js.vjs-playing .vjs-tech {
  pointer-events: auto;
}
</style>

<style scoped lang="scss">
$color-primary: var(--color-primary);

@media screen and (max-width: theme('screens.md')) {
  .company-profile {
    background-color: #fefeff;
    background-image: url('/img/index/bg-company.jpg');
    background-position: bottom 0 left 0;
    background-repeat: no-repeat;
    background-size: 100% auto;

    .title {
      @apply text-gray-700 leading-none relative font-medium;

      font-size: 32px;

      &::before {
        position: absolute;
        top: -8px;
        display: inline-block;
        width: 80px;
        height: 5px;
        background-color: var(--color-primary);
        content: '';
      }
    }

    .sub-title {
      @apply my-5 font-medium text-slate-500;

      font-size: 20px;
      line-height: 1.2;
    }

    .description-content {
      @apply mb-2 leading-normal text-slate-600;
    }

    .link-view-more {
      display: flex;
      margin-top: 3rem;
      margin-bottom: 1.5rem;
      color: var(--color-primary);
      align-items: center;

      .link-icon-wrapper {
        position: relative;
        display: inline-flex;
        width: 40px;
        height: 40px;
        margin-right: 2rem;
        overflow: visible;
        background-color: var(--color-primary);
        border-radius: 50%;
        align-items: center;
        justify-content: center;

        &:hover {
          background-color: darken(#91C072, 20%);
        }

        &::before {
          position: absolute;
          top: 50%;
          left: 50%;
          display: block;
          width: 100%;
          height: 100%;
          padding: 2.2rem;
          border: 2px solid #e0e0e0;
          border-radius: 50%;
          content: '';
          transform: translate(-50%, -50%);
          transition: opacity 0.3s ease;
        }
      }

      .link-icon {
        width: 30px;
        height: 30px;
        color: #fff;
      }
    }

    .video-popup {
      position: fixed;
      top: 50%;
      left: 50%;
      z-index: 99999;
      display: flex;
      width: 85vw;
      background-color: rgb(0 0 0 / 50%);
      transform: translate(-50%, -50%);
    }

    .mask {
      @apply block fixed inset-0 bg-black bg-opacity-70;

      z-index: 9999;
    }

    .wrapper-company-img {
      position: relative;

      img {
        filter: drop-shadow(0 20px 5px rgb(0 0 0 / 5%));
      }

      .btn-play-wrapper {
        position: absolute;
        bottom: 15%;
        left: 10%;

        .btn-play {
          @apply relative text-gray-800 cursor-pointer;

          z-index: 10;
          width: 50px;
          height: 50px;
          transition: color 0.6s ease-in-out;

          &:hover {
            color: var(--color-primary);
          }
        }

        &::before {

          @apply animate-ping;

          position: absolute;
          top: 0;
          left: 0;
          z-index: 0;
          display: inline-block;
          width: 100%;
          height: 100%;
          background-color: var(--color-primary);
          border-radius: 50%;
          content: '';
        }
      }
    }
  }
}

@media screen and (min-width: theme('screens.md')) {
  .company-profile {
    background-color: #fefeff;
    background-image: url('/img/index/bg-company.jpg');
    background-position: bottom 0 left 0;
    background-repeat: no-repeat;
    background-size: 100% auto;

    .title {
      display: flex;
      font-size: 40px;
      font-weight: bold;
      line-height: 1;
      align-items: center;

      &::before {
        display: inline-block;
        width: 55px;
        height: 10px;
        margin-right: 0.75rem;
        background-color: var(--color-primary);
        content: '';
      }
    }

    .sub-title {
      margin: 1.5rem 0;
      font-size: 26px;
      font-weight: 600;
      line-height: 1.2;
      color: #333;
    }

    .description-content {
      @apply mb-2 leading-normal text-lg text-slate-500;
    }

    .link-view-more {
      display: flex;
      margin-top: 3rem;
      color: var(--color-primary);
      align-items: center;

      .link-icon-wrapper {
        position: relative;
        display: inline-flex;
        width: 40px;
        height: 40px;
        margin-right: 2rem;
        overflow: visible;
        background-color: var(--color-primary);
        border-radius: 50%;
        align-items: center;
        justify-content: center;

        &::before {
          position: absolute;
          top: 50%;
          left: 50%;
          display: block;
          width: 100%;
          height: 100%;
          padding: 2.2rem;
          border: 2px solid #e0e0e0;
          border-radius: 50%;
          content: '';
          transform: translate(-50%, -50%);
          transition: all 0.4s ease;
        }

        &:hover::before {
          transform: translate(-50%, -50%) scale(0);
        }
      }

      .link-icon {
        width: 30px;
        height: 30px;
        color: #fff;
      }
    }

    .video-popup {
      position: fixed;
      top: 50%;
      left: 50%;
      z-index: 99999;
      display: flex;
      width: 50vw;
      background-color: rgb(0 0 0 / 50%);
      transform: translate(-50%, -50%);
    }

    .mask {
      @apply block fixed inset-0 bg-black bg-opacity-70;

      z-index: 9999;
    }

    .company-video {
      //width: calc(100% - 50px); // 大屏小视频右侧间距
    }

    .wrapper-company-img {
      position: relative;

      img {
        filter: drop-shadow(0 20px 5px rgb(0 0 0 / 5%));
      }

      .btn-play-wrapper {
        position: absolute;
        bottom: 15%;
        left: 10%;

        .btn-play {
          @apply relative text-gray-800 cursor-pointer;

          z-index: 10;
          width: 50px;
          height: 50px;
          transition: color 0.6s ease-in-out;

          &:hover {
            color: var(--color-primary);
          }
        }

        &::before {

          @apply animate-ping;

          position: absolute;
          top: 0;
          left: 0;
          z-index: 0;
          display: inline-block;
          width: 100%;
          height: 100%;
          background-color: var(--color-primary);
          border-radius: 50%;
          content: '';
        }
      }
    }
  }
}
</style>
