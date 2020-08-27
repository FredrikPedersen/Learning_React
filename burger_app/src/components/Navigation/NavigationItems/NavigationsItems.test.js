import React from "react";

import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavigationItems from "./NavigationItems"
import NavigationItem from "./NavigationItem/NavigationItem";

configure({adapter: new Adapter()});

describe("NavigationItems", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems/>);
    });

    it("Should render two NavigationItems-elements if not authhenticated", () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it("Should render three NavigationItems-elements if authhenticated", () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
});