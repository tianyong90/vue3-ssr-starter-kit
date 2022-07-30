<template>
  <section class="company-achievement">
    <div class="container justify-around flex flex-col space-y-5 md:space-y-0 md:flex-row">
      <div class="achievement-item">
        <div class="icon-wrapper">
          <svg-icon
            name="index/logo"
            class="icon"
            style="width: 50px; height: 50px;"
          />
        </div>
        <div class="md:text-center">
          <div
            id="yearNum"
            class="num"
          >
            2005
          </div>
          <div class="label">
            We Are Founded in
          </div>
        </div>
      </div>
      <div class="achievement-item">
        <div class="icon-wrapper">
          <svg-icon
            name="index/factory"
            class="icon"
          />
        </div>
        <div class="md:text-center">
          <div
            id="factoryNum"
            class="num"
          >
            <!--3-->
          </div>
          <div class="label">
            Factories In ZS & DG
          </div>
        </div>
      </div>
      <div class="achievement-item">
        <div class="icon-wrapper">
          <svg-icon
            name="index/team"
            class="icon"
          />
        </div>
        <div class="md:text-center">
          <div
            id="employeeCount"
            class="num"
          >
            <!--550-->
          </div>
          <div class="label">
            Full-Time Employees
          </div>
        </div>
      </div>
      <div class="achievement-item">
        <div class="icon-wrapper">
          <svg-icon
            name="index/earth"
            class="icon"
          />
        </div>
        <div class="md:text-center">
          <div class="num">
            <span id="customerCount"><!--4000--></span><span class="sup text-4xl">+</span>
          </div>
          <div class="label">
            Global Customers
          </div>
        </div>
      </div>
      <div class="achievement-item">
        <div class="icon-wrapper">
          <svg-icon
            name="index/experience"
            class="icon"
          />
        </div>
        <div class="md:text-center">
          <div class="num">
            <span id="years"><!--17--></span><span class="sup text-lg">YEARS</span>
          </div>
          <div class="label">
            Focus On Battery
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, nextTick, onBeforeUnmount } from 'vue'

import { CountUp } from 'countup.js'

import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

let strollTriggerInstance: ScrollTrigger

function initGsap () {
  strollTriggerInstance = ScrollTrigger.create({
    markers: false,
    trigger: '.company-achievement',
    start: '50% 75%',
    once: true,
    onEnter: () => {
      const countUpOptions = {
        duration: 2,
      }

      const factoryCounter = new CountUp(document.getElementById('factoryNum'), 3, countUpOptions)
      const employeeCounter = new CountUp(document.getElementById('employeeCount'), 550, countUpOptions)
      const customerCounter = new CountUp(document.getElementById('customerCount'), 4000, countUpOptions)
      const yearCounter = new CountUp(document.getElementById('years'), 17, countUpOptions)
      factoryCounter.start()
      employeeCounter.start()
      customerCounter.start()
      yearCounter.start()
    },
  })
}

onMounted(async () => {
  await nextTick()
  initGsap()
})

onBeforeUnmount(() => {
  strollTriggerInstance && strollTriggerInstance.kill()
})
</script>

<style scoped lang="scss">
@media screen and (max-width: theme('screens.md')) {
  .company-achievement {
    padding: 3rem 0;
    background-color: #f8f8f8;

    .achievement-item {
      @apply flex flex-row items-center;
    }

    .icon-wrapper {
      @apply inline-flex items-center justify-center rounded-full mr-5;

      width: 45px;
      height: 45px;
      border: 2px solid var(--color-primary);
    }

    .icon {
      display: inline-block;
      width: 30px;
      height: 30px;
      padding: 5px;
      color: var(--color-primary);
      box-sizing: border-box;
    }

    .num {
      @apply inline-flex text-3xl;

      margin: 2rem 0 0.5rem;
      font-family: Roboto, sans-serif;
      font-weight: bold;
      line-height: 1;
      color: var(--color-primary);
      align-items: flex-start;

      .sup {
        font-size: 1.2rem;
        font-weight: bold;
        line-height: 1;
        color: var(--color-primary);
      }
    }

    .label {
      @apply mt-0 font-medium text-sm text-gray-500;
    }
  }
}

@media screen and (min-width: theme('screens.md')) {
  .company-achievement {
    @apply flex flex-row;

    padding: 4rem 0;
    background-color: #f8f8f8;

    .achievement-item {
      @apply flex flex-col items-center space-y-2;
    }

    .icon-wrapper {
      @apply inline-flex items-center justify-center rounded-full;

      width: 60px;
      height: 60px;
      border: 3px solid var(--color-primary);
    }

    .icon {
      display: inline-block;
      width: 40px;
      height: 40px;
      padding: 5px;
      color: var(--color-primary);
      box-sizing: border-box;
    }

    .num {
      @apply inline-flex text-4xl md:text-5xl lg:text-6xl;

      margin: 2rem 0 1rem;
      font-family: Roboto, sans-serif;
      font-weight: bold;
      line-height: 1;
      color: var(--color-primary);
      align-items: flex-start;

      .sup {
        font-weight: bold;
        line-height: 1;
        color: var(--color-primary);
      }
    }

    .label {
      margin-top: 0;
      font-size: 16px;
      font-weight: 600;
      color: #666;
    }
  }
}
</style>
