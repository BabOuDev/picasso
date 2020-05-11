import { shallowMount } from "@vue/test-utils";
import Input from "@/components/input/Input.vue";

describe("Input.vue", () => {
  it("displays default value", () => {
    const value = "Input Value";
    const wrapper = shallowMount(Input, {
      propsData: {
        value,
      },
    });

    const input = wrapper.find("input");
    expect(input.element.value).toBe(value);
  });

  it("can edit value", () => {
    const value = "Input Value";
    const wrapper = shallowMount(Input, {
      propsData: {
        value,
      },
    });

    const input = wrapper.find("input");
    expect(input.element.value).toBe(value);

    const newValue = "New Value!";
    input.setValue(newValue);

    expect(input.element.value).toBe(newValue);
  });

  it("value is emitted on edit", () => {
    const value = "Input Value";
    const wrapper = shallowMount(Input, {
      propsData: {
        value,
      },
    });

    const input = wrapper.find("input");
    const newValue = "New Value!";
    input.setValue(newValue);

    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input.length).toBe(1);
    expect(wrapper.emitted().input).toEqual([[newValue]]);
  });
});
