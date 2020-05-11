<template>
  <row>
    <primary-sidebar />
    <router-view class="flex-grow h-screen overflow-y-auto" />
  </row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PrimarySidebar from "@/components/shell/PrimarySidebar.vue";
import Row from "@/components/layout/Row.vue";
import "./styles/App.sass";

@Component({
  components: {
    PrimarySidebar,
    Row,
  },
})
export default class App extends Vue {}
</script>
