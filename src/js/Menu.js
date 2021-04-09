export const MENU = "c-menu";
export const MENU_TOGGLE = "c-menu--is-active";
export const MENU_TRIGGER = "js-menu-trigger";

const Template = ({ title, complete = 0, total = 1 }) => {
    return `
  <div class="c-menu__title">
  <button type="button" class="c-menu__trigger js-menu-trigger"></button>
  <p class="c-menu__name">
    ${title}
    (<span class="c-menu__count">${complete}/${total}</span>)
  </p>
</div>
<div class="c-menu__children"></div>
  `;
};

export default class Menu {
    constructor() {
        this.element = document.createElement("div");
    }
    init({ title, complete, total }) {
        this.title = title;
        this.complete = complete;
        this.total = total;

        [MENU, MENU_TOGGLE].forEach((c) => this.element.classList.add(c));

        this.element.setAttribute("id", this.title);
    }
    render() {
        this.element.insertAdjacentHTML("beforeend", Template(this));

        return this.element;
    }
}
