<template>
  <tr @click="onClickRow">
    <td v-for="(value, key) in filteredCells" :key="key">
      <span style="white-space: pre">{{ formatCellValue(value) }}</span>
    </td>
  </tr>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ITableRow from "@/interfaces/TableRow";

@Component
export default class TableRow extends Vue {
  @Prop({ type: Object, required: true })
  row!: ITableRow;

  get filteredCells() {
    const row = { ...this.row };
    delete row.renderKey;

    return row;
  }

  formatCellValue(value: string | object) {
    const isValueObject = typeof value === "object";

    if (!isValueObject) {
      return value;
    }

    return Object.entries(value).reduce((prev, curr) => {
      const [key, val] = curr;
      return `${key}: ${val}\n${prev}`;
    }, "");
  }

  onClickRow() {
    this.$emit("onClickRow", this.row);
  }
}
</script>
