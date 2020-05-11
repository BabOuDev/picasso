import { mount } from "@vue/test-utils";
import TableRowEditable from "@/components/table/partials/TableRowEditable.vue";

const editPropertySelector = "[data-test=table-row-editable__edit-property]";
const displayPropertySelector =
  "[data-test=table-row-editable__display-property]";

const rowDataWithoutRenderKey = {
  key1: "value1",
  key2: "value2",
  key3: "value3",
};

const rowDataWithRenderKey = {
  ...rowDataWithoutRenderKey,
  renderKey: "render-key",
};

const clickOutside = jest.fn();
const directives = {
  "click-outside": clickOutside,
};

describe("TableRowEditable.vue", () => {
  it("renders all cells", () => {
    const wrapper = mount(TableRowEditable, {
      propsData: {
        row: rowDataWithoutRenderKey,
      },
      directives,
    });

    const dataCellElements = wrapper.findAll("td");
    expect(dataCellElements.length).toBe(3);

    const expectedValues = Object.values(rowDataWithoutRenderKey);

    expectedValues.forEach((expectedValue, i) => {
      const targetCell = dataCellElements.at(i);
      expect(targetCell.text()).toBe(expectedValue);
    });
  });

  it("if data has renderKey > does NOT render renderKey column", () => {
    const wrapper = mount(TableRowEditable, {
      propsData: {
        row: rowDataWithRenderKey,
      },
      directives,
    });

    const dataCellElements = wrapper.findAll("td");
    expect(dataCellElements.length).toBe(3);

    const interationArr = Array.from({ length: dataCellElements.length });
    const expectedValues = Object.values(rowDataWithRenderKey);

    interationArr.forEach((_, i) => {
      const targetCell = dataCellElements.at(i);
      const expectedValue = expectedValues[i];

      expect(targetCell.text()).toBe(expectedValue);
    });
  });

  it("click row > can edit data", () => {
    const wrapper = mount(TableRowEditable, {
      propsData: {
        row: rowDataWithRenderKey,
      },
      directives,
    });

    let displayPropertyEl = wrapper.find(displayPropertySelector);
    let editPropertyEl = wrapper.find(editPropertySelector);

    expect(displayPropertyEl.exists()).toBeTruthy();
    expect(editPropertyEl.exists()).toBeFalsy();

    const tableCellElement = wrapper.find("td");
    tableCellElement.trigger("click");

    // wait for virtual DOM to update
    wrapper.vm.$nextTick(() => {
      displayPropertyEl = wrapper.find(displayPropertySelector);
      editPropertyEl = wrapper.find(editPropertySelector);

      expect(displayPropertyEl.exists()).toBeFalsy();
      expect(editPropertyEl.exists()).toBeTruthy();
    });
  });

  it("click row > input is auto focused", () => {
    // targetIndex is last cell in row
    const targetIndex = Object.keys(rowDataWithoutRenderKey).length - 1;

    const wrapper = mount(TableRowEditable, {
      propsData: {
        row: rowDataWithRenderKey,
      },
      directives,
      attachToDocument: true,
    });

    const tableCellElement = wrapper.findAll("td").at(targetIndex);
    tableCellElement.trigger("click");

    // wait for virtual DOM to update
    wrapper.vm.$nextTick(() => {
      const displayPropertyEl = wrapper.findAll(displayPropertySelector);
      const editPropertyEl = wrapper.findAll(editPropertySelector);

      // loop through cells, expect last item to be focused
      const interationArr = Array.from({ length: displayPropertyEl.length });

      interationArr.forEach((_, i) => {
        const currInput = editPropertyEl.at(i);
        const isTargetInput = i === targetIndex;

        if (isTargetInput) {
          expect(currInput).toBe(document.activeElement);
        } else {
          expect(currInput).not.toBe(document.activeElement);
        }
      });
    });
  });
});
