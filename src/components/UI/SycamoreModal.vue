<template>
  <transition name="modal-fade">
    <div
      v-if="show"
      class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex modal-overlay"
      @click="handleOverlayClick"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const handleOverlayClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (target.classList.contains("modal-overlay")) {
    emit("close");
  }
};
</script>

<style scoped>
.-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  width: 80%;
  animation: modal-slide-up 0.4s ease-out;
}

@keyframes modal-slide-up {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Ensure the modal content does not overflow the screen on smaller devices */
@media (max-width: 640px) {
  .modal-content {
    width: 90%;
  }
}
</style>
