<template>
  <row
    class="p-6 position-sticky top-0 left-0 justify-between items-center bg-neutral-light"
  >
    <h1 data-test="page-header__header">{{ title }}</h1>

    <slot />
  </row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Row from "@/components/layout/Row.vue";

@Component({
  components: {
    Row,
  },
})
export default class PageHeader extends Vue {
  @Prop({ type: String, required: true })
  title!: string;
}
</script>
