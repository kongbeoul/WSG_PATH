import { Template } from "./Node";
import Toolbar from "./Toolbar";
import Status, { COMPLETE, NONE } from "./Status";
import Menu from "./Menu";
import EventHelper from "./EventHelper";
import { create, parsing, display, counted } from "./Utils";

export default class Tree {
    constructor(data) {
        this.data = this.create([], data);
        this.parse = this.parsing([], data).sort((a, b) => a._depID - b._depID);

        this.toolbar = new Toolbar(["전체", ...data.map((v) => v.title)]);
        this.toolbar.render();

        const [complete, total] = this.parse.reduce((a, { state }) => {
                state == COMPLETE && a[0]++;
                a[1]++;
                state == NONE && a[1]--;
                return a;
            },
            [0, 0]
        );

        this.status = new Status(complete, total);
        this.status.render();
    }
    create(temp, data) {
        return create(temp, data);
    }
    display(data) {
        return display(data);
    }
    parsing(temp, data) {
        return parsing(temp, data);
    }
    counted(data, complete, total) {
        return counted(data, complete, total);
    }
    createDOM(element, data) {
        let i = 0;
        while (i < data.length) {
            const { _depID, title, url, state, history, children } = data[i];
            const menu = +_depID == 1 && new Menu();

            if (menu) {
                const [complete, total] = this.counted(children, state == COMPLETE ? 1 : 0, state == NONE ? 0 : 1);
                menu.init({ title, complete, total });
                element.appendChild(menu.render());
            }

            if (children.length > 0) {
                const node = document.createElement("div");
                node.classList.add("c-menu__item__children");
                const t = this.createDOM(node, children);
                menu
                    ? menu.element.querySelector(".c-menu__children").insertAdjacentHTML("beforeend", Template(_depID, title, url, state, history, t))
                    : element.insertAdjacentHTML("beforeend", Template(_depID, title, url, state, history, t));
            } else {
                menu
                    ? menu.element.querySelector(".c-menu__children").insertAdjacentHTML("beforeend", Template(_depID, title, url, state, history))
                    : element.insertAdjacentHTML("beforeend", Template(_depID, title, url, state, history));
            }
            i++;
        }
        return element;
    }
    render(element) {
        this.root = element;
        this.createDOM(this.root, this.data);
        this.eventHelper = new EventHelper();
        return this;
    }
}
