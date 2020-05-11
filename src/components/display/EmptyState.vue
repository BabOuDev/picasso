<template>
  <column class="empty-state items-center">
    <column class="icon justify-center items-center">
      <slot />
    </column>

    <h2 class="mt-3">{{ title }}</h2>
    <h3>{{ description }}</h3>
  </column>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Column from "@/components/layout/Column.vue";

@Component({
  components: {
    Column,
  },
})
export default class EmptyState extends Vue {
  @Prop({ type: String, required: true })
  title!: string;

  @Prop({ type: String, required: true })
  description!: string;
}
</script>

<style lang="sass">
.empty-state

  .icon
    height: var(--dim-empty-state-icon-diameter)
    width: var(--dim-empty-state-icon-diameter)
    box-shadow: var(--base-box-shadow)
    background-color: var(--color-neutral-lightest)
    border-radius: 50%

    svg
      width: var(--dim-empty-state-icon-svg-width)

      *
        fill: var(--color-neutral-dark)
</style>
