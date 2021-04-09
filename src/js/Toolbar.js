export const TOOLBAR = ".l-toolbar";
export const TOOLBAR_MENU_LIST = ".l-toolbar__menu__lists";
export const TOOLBAR_MENU = "l-toolbar__menu";
export const TOOLBAR_MENU_ACTIVE = "l-toolbar__menu--active";
export const TOOLBAR_OPEN = "js-toolbar-open-trigger";
export const TOOLBAR_CLOSE = "js-toolbar-close-trigger";
export const TOOLBAR_ACTIVE = "is-active";

export default class Toolbar {
    constructor(data) {
        this.data = data;
    }

    render(element = TOOLBAR) {
        this.root = document.querySelector(element);
        this.element = this.data.map((v) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.textContent = v;
            btn.classList.add("l-toolbar__menu");
            btn.setAttribute("aria-controls", v);
            this.root.querySelector(TOOLBAR_MENU_LIST).appendChild(btn);
            return btn;
        });
        this.element[0].classList.add("l-toolbar__menu--active");
    }
}
