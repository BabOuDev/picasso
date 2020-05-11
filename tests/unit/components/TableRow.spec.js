import { shallowMount } from "@vue/test-utils";
import TableRow from "@/components/table/partials/TableRow.vue";

describe("TableRow.vue", () => {
  it("renders all cells", () => {
    const row = {
      key1: "value1",
      key2: "value2",
      key3: "value3",
    };

    const wrapper = shallowMount(TableRow, {
      propsData: {
        row,
      },
    });

    // expect number of td cells to equal length of object values
    const dataCellElements = wrapper.findAll("td");
    expect(dataCellElements.length).toBe(3);

    const expectedValues = Object.values(row);

    expectedValues.forEach((expectedValue, i) => {
      const targetCell = dataCellElements.at(i);
      expect(targetCell.text()).toBe(expectedValue);
    });
  });

  it("if data has renderKey > does NOT render renderKey column", () => {
    const row = {
      key1: "value1",
      key2: "value2",
      key3: "value3",
      renderKey: "renderKey",
    };

    const wrapper = shallowMount(TableRow, {
      propsData: {
        row,
      },
    });

    const dataCellElements = wrapper.findAll("td");
    expect(dataCellElements.length).toBe(3);

    const interationArr = Array.from({ length: dataCellElements.length });
    const expectedValues = Object.values(row);

    interationArr.forEach((_, i) => {
      const targetCell = dataCellElements.at(i);
      const expectedValue = expectedValues[i];

      expect(targetCell.text()).toBe(expectedValue);
    });
  });
});
