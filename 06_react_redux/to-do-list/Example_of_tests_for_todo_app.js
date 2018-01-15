import React from "react";
import ReactDOM from "react-dom";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./App";

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

test("it should add a todo", () => {
  const wrapper = shallow(<App />);

  wrapper.find("form input").simulate("change", { target: { value: "test" } });
  wrapper.find("form").simulate("submit", { preventDefault: () => {}});
  expect(wrapper.find(".task").length).toBe(1);
});


test("it should toggle a todo", () => {
  const wrapper = shallow(<App />);

  wrapper.find("form input").simulate("change", { target: { value: "test" } });
  wrapper.find("form").simulate("submit", { preventDefault: () => {}});
  wrapper.find("li input").simulate("change", 1)
  expect(wrapper.find(".completed").length).toBe(1);
  expect(wrapper.find(".task").length).toBe(0);
});

test("it should delete a todo", () => {

    const wrapper = shallow(<App />);

    wrapper.find("form input").simulate("change", { target: { value: "test" } });
    wrapper.find("form").simulate("submit", { preventDefault: () => {}});
    wrapper.find("li input").simulate("change", 1)
    wrapper.find("li input[type='button']").simulate("click", 1);
    
    expect(wrapper.find(".completed").length).toBe(0);
    expect(wrapper.find(".task").length).toBe(0);
})
