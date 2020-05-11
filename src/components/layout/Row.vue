<template>
  <div class="flex-row">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Row extends Vue {}
</script>
