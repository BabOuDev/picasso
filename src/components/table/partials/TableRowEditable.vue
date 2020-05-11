<template>
  <tr v-click-outside="onFinishEditing" :class="rowClasses">
    <td
      v-for="(value, key, cellIndex) in filteredCells"
      :key="key"
      @click="onEditRow(cellIndex)"
    >
      <input
        v-if="isEditing"
        v-model="lrow[key]"
        class="p-2 h-full rounded"
        data-test="table-row-editable__edit-property"
      />

      <span v-if="!isEditing" data-test="table-row-editable__display-property">
        {{ value }}
      </span>
    </td>
  </tr>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import TableRow from "@/interfaces/TableRow";

@Component
export default class TableRowEditable extends Vue {
  @Prop({ type: Object, required: true })
  row!: TableRow;

  lrow!: TableRow;
  isEditing = false;

  @Watch("value", { immediate: true, deep: true })
  onValueChanged() {
    this.lrow = this.row;
  }

  get filteredCells() {
    const row = { ...this.lrow };
    delete row.renderKey;

    return row;
  }

  get rowClasses() {
    return {
      active: this.isEditing,
    };
  }

  onEditRow(cellIndex: number) {
    this.isEditing = true;

    this.$nextTick(() => {
      this.onFocusInput(cellIndex);
    });
  }

  onClickRow() {
    this.$emit("onClickRow", this.lrow);
  }

  onFocusInput(inputIndex: number) {
    const allInputs = this.$el.querySelectorAll("input");
    const targetInput = allInputs[inputIndex];

    if (!targetInput) {
      return;
    }

    targetInput.focus();
  }

  onFinishEditing() {
    if (!this.isEditing) {
      return;
    }

    this.isEditing = false;
    this.$emit("onUpdateRow", this.lrow);
  }
}
</script>

<style lang="sass" scoped>
td
  input
    background-color: var(--color-neutral-lightest)
    border: none

tr.active
  td
    background: var(--color-neutral-dark)
</style>
