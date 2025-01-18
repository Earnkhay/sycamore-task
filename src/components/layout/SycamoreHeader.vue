<template>
  <nav
    class="p-6 sm:px-16 z-20 bg-grey transition-all duration-300"
    :class="{
      'shadow-sm fixed top-0 right-0 left-0': scrolled,
      relative: !scrolled,
    }"
  >
    <div class="flex justify-between items-center">
      <div
        class="flex justify-between lg:justify-start items-center lg:gap-x-6"
      >
        <div class="cursor-pointer" @click.prevent="$router.push('/')">
          <h1
            class="font-light text-wine text-medium xl:text-large relative inline-block z-10"
          >
            Sycamore
            <span class="orange-box"></span>
          </h1>
        </div>
      </div>

      <!-- Button for large screens -->
      <div class="flex gap-6 items-center">
        <div v-if="!isBaseRoute" class="hidden lg:flex">
          <router-link to="/">
            <sycamore-button> Customers </sycamore-button></router-link
          >
        </div>
        <div v-else class="hidden lg:flex">
          <router-link to="/customer">
            <sycamore-button @click="customerstore.createNew(true)">
              Add customer
            </sycamore-button></router-link
          >
        </div>
      </div>

      <div @click="toggleNavBar" class="lg:hidden cursor-pointer">
        <img src="@/assets/svgs/nav.svg" />
      </div>
    </div>

    <!-- Dropdown Menu for Small Screens -->
    <transition name="fade">
      <ul
        v-if="isNavBarVisible"
        class="flex flex-col gap-4 bg-grey p-6 absolute top-16 left-0 w-full shadow-lg lg:hidden px-8 sm:px-24 z-50"
      >
        <!-- Button for small screens -->
        <li v-if="!isBaseRoute" class="py-2" @click="isNavBarVisible = false">
          <router-link to="/">
            <sycamore-button> Customers </sycamore-button>
          </router-link>
        </li>
        <li v-else class="py-2" @click="isNavBarVisible = false">
          <sycamore-button @click="customerstore.createNew(true)">
            Add New
          </sycamore-button>
        </li>
      </ul>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useCustomerStore } from "@/stores/customers";
import SycamoreButton from "../UI/SycamoreButton.vue";

const customerstore = useCustomerStore();

const route = useRoute();
const scrolled = ref(false);
const isNavBarVisible = ref(false);

const toggleNavBar = () => {
  isNavBarVisible.value = !isNavBarVisible.value;
};

const isBaseRoute = computed(() => {
  return route.path === "/";
});
</script>

<style scoped>
nav {
  transition: all 0.3s ease-in-out;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
