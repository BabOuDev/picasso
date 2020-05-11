<template>
  <button type="button" :disabled="isDisabled" :class="buttonClasses">
    <slot />
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

type ButtonWeight = "primary" | "secondary" | "tertiary";

@Component
export default class Button extends Vue {
  @Prop({ type: String, required: false, default: "primary" })
  type!: ButtonWeight;

  @Prop({ type: Boolean, required: false, default: false })
  isDisabled!: boolean;

  get buttonClasses() {
    return [
      this.type,
      {
        "pt-1 pr-3 pb-1 pl-3 rounded": true,
        disabled: this.isDisabled,
        active: !this.isDisabled,
      },
    ];
  }
}
</script>

<style lang="sass" scoped>
button
  outline: none
  border: none
  font-size: var(--fs-sm)
  user-select: none
  box-sizing: border-box
  border-width: 1px
  border-style: solid

  &.active
    cursor: pointer

  &.disabled
    opacity: var(--base-disabled-opacity)
    cursor: not-allowed

  &.primary
    background-color: var(--color-neutral-dark)
    border-color: var(--color-neutral-dark)
    color: var(--color-neutral-lightest)

    &:hover
      background-color: var(--color-neutral-darkest)

  &.secondary
    background-color: transparent
    border-color: var(--color-neutral-dark)
    color: var(--color-neutral-dark)

    &:hover
      background-color: var(--color-neutral-darkest)
      color: var(--color-neutral-lightest)
</style>
