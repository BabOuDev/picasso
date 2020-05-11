<template>
  <nav class="h-screen bg-neutral-dark pt-4 pb-4 pl-2 pr-2 flex-shrink-0">
    <primary-sidebar-tab v-for="tab in tabs" :key="tab.id" :tab="tab" />
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PrimarySidebarTab from "@/components/shell/partials/PrimarySidebarTab.vue";

import PrimarySidebarItem from "@/interfaces/PrimarySidebarItem";
import routesLibrary from "@/router/routesLibrary";

@Component({
  components: {
    PrimarySidebarTab,
  },
})
export default class PrimarySidebar extends Vue {
  get tabs(): PrimarySidebarItem[] {
    return [
      {
        id: 0,
        to: routesLibrary.DASHBOARD.path,
        name: routesLibrary.DASHBOARD.name,
        label: "Dashboard",
      },
      {
        id: 1,
        to: routesLibrary.EDITOR.path,
        name: routesLibrary.EDITOR.name,
        label: "Data Editor",
      },
      {
        id: 2,
        to: routesLibrary.SEARCH.path,
        name: routesLibrary.SEARCH.name,
        label: "Smart Search",
      },
    ];
  }
}
</script>

<style lang="sass" scoped>
nav
  width: var(--dim-primary-sidebar-width)
  box-sizing: border-box
</style>
