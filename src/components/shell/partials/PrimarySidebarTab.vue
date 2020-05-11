<template>
  <router-link
    tag="div"
    :to="tab.to"
    :class="tabClasses"
    :data-test="`sidebar-tab__${tab.name}`"
  >
    {{ tab.label }}
  </router-link>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import PrimarySidebarItem from "@/interfaces/PrimarySidebarItem";

@Component
export default class PrimarySidebarTab extends Vue {
  @Prop({ type: Object, required: true })
  tab!: PrimarySidebarItem;

  get isTabActive() {
    return this.tab.to === this.$route.path;
  }

  get tabClasses() {
    return {
      "p-2 rounded mb-1 fs": true,
      "bg-neutral-darkest text-neutral-lightest": this.isTabActive,
      "text-neutral-light cursor-pointer": !this.isTabActive,
    };
  }
}
</script>
