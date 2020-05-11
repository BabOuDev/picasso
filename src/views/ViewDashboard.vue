<template>
  <column>
    <page-header title="Dashboard" />

    <div class="pl-6 pr-6">
      Coming Soon!
    </div>
  </column>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Column from "@/components/layout/Column.vue";
import PageHeader from "@/components/shell/PageHeader.vue";

@Component({
  components: {
    Column,
    PageHeader,
  },
})
export default class ViewDashboard extends Vue {}
</script>
