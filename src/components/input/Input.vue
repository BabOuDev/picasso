<template>
  <row>
    <input
      class="p-2 rounded"
      :placeholder="placeholder"
      :value="lvalue"
      @input="onInput"
    />
  </row>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import Row from "@/components/layout/Row.vue";

@Component({
  components: {
    Row,
  },
})
export default class DefaultInput extends Vue {
  @Prop({ type: [String, Number], required: false })
  placeholder!: string;

  @Prop({ type: [String, Number], required: false, default: null })
  value!: string | number | null;

  lvalue!: string | number | null;

  @Watch("value", { immediate: true })
  onValueChanged() {
    this.lvalue = this.value;
  }

  onInput(ev: InputEvent) {
    const element = ev.target as HTMLInputElement;
    this.$emit("input", element.value);
  }
}
</script>

<style lang="sass" scoped>
input
  outline: none
  border: 1px solid var(--color-neutral-lighter)
  background-color: var(--color-neutral-lightest)
  min-width: var(--dim-input-min-width)
  font-size: var(--fs-sm)

  &:focus
    outline: none
</style>
