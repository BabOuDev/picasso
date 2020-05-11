<template>
  <transition name="modal-fade" appear>
    <column
      class="position-fixed top-0 left-0 w-screen h-screen items-center justify-center haze"
    >
      <column
        class="modal rounded justify-between"
        v-click-outside="onCloseModal"
      >
        <slot />
      </column>
    </column>
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Column from "@/components/layout/Column.vue";

@Component({
  components: {
    Column,
  },
})
export default class Modal extends Vue {
  onCloseModal() {
    this.$emit("onCloseModal");
  }
}
</script>

<style lang="sass" scoped>
.haze
  background-color: var(--color-haze)

.modal
  width: var(--dim-modal-width)
  height: var(--dim-modal-height)
  max-height: var(--dim-modal-max-height)
  background: var(--color-neutral-lightest)

.modal-fade-enter-active, .modal-fade-leave-active
  transition: opacity 0.3s

  .modal
    transition: transform 0.3s

.modal-fade-enter, .modal-fade-leave-to
  opacity: 0

  .modal
    transform: translateY(20px)
</style>
