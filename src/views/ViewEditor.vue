<template>
  <column>
    <page-header title="CSV Editor">
      <div>
        <l-button
          v-if="hasValidData"
          type="secondary"
          class="mr-1"
          @click.native="onDownloadData"
        >
          Download JSON
        </l-button>

        <input
          class="file-upload hidden"
          type="file"
          accept=".csv"
          @change="onSelectedFile"
        />

        <l-button @click.native="onSelectFile">
          Upload CSV
        </l-button>
      </div>
    </page-header>

    <div class="mt-1 flex-1">
      <l-table
        v-if="hasValidData"
        :data-set="dataSet"
        :is-editable="true"
        @onUpdateRow="onUpdateRow"
      />

      <empty-state
        v-if="!hasValidData"
        class="mt-6"
        title="Get Started!"
        description="Upload a CSV file to view and edit data"
      >
        <icon-upload-file />
      </empty-state>
    </div>
  </column>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";

import Row from "@/components/layout/Row.vue";
import Column from "@/components/layout/Column.vue";
import PageHeader from "@/components/shell/PageHeader.vue";
import LButton from "@/components/button/Button.vue";
import LTable from "@/components/table/Table.vue";
import EmptyState from "@/components/display/EmptyState.vue";
import IconUploadFile from "@/components/svg/IconUploadFile.vue";

import convertCsvToJson from "@/utils/convertCsvToJson";
import downloadObjectAsJson from "@/utils/downloadObjectAsJson";
import ITableRow from "@/interfaces/TableRow";

@Component({
  components: {
    Row,
    Column,
    PageHeader,
    LButton,
    LTable,
    EmptyState,
    IconUploadFile,
  },
})
export default class ViewEditor extends Vue {
  @State(state => state.editormodule.dataSet) dataSet!: ITableRow[];

  @Mutation setDataSet!: (dataSet: ITableRow[]) => void;
  @Mutation setDataRow!: (row: ITableRow) => void;

  getFileUploadInput() {
    const fileUploadInput: HTMLInputElement | null = this.$el.querySelector(
      "input.file-upload"
    );

    return fileUploadInput;
  }

  onSelectFile() {
    const fileUploadInput = this.getFileUploadInput();

    if (!fileUploadInput) {
      return;
    }

    fileUploadInput.click();
  }

  async onSelectedFile() {
    const fileUploadInput = this.getFileUploadInput();

    if (!fileUploadInput || !fileUploadInput.files) {
      return;
    }

    const file = Array.from(fileUploadInput.files)[0];
    const dataSet: ITableRow[] = await convertCsvToJson(file, true);

    this.setDataSet(dataSet);
  }

  onUpdateRow(newRow: ITableRow) {
    this.setDataRow(newRow);
  }

  onDownloadData() {
    downloadObjectAsJson(this.dataSet, "data");
  }

  get hasValidData() {
    return this.dataSet.length > 0;
  }
}
</script>
