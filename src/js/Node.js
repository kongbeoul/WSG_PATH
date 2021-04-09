import { SOON, DELETE, STATE_CLASSES } from "@/Status";
import { mq } from "@/Utils";

export const Template = (_depID, title, url, state, history, children) => {
    const historyElement = [].map.call(history, (v, k) => {
        return `
        <div class="c-tooltip">
          <span class="c-menu__item__date js-tooltip-trigger">${k}</span>
          <div class="c-tooltip__info">
            ${map(v, (_v) => "<p>" + _v + "</p>").join("")}
          </div>
        </div>
      `;
    }).join("");

    const dotted = () => {
      let dot = [];
      for(let i = 0; i < +_depID; i++) {
        dot.push("·");
      }

      return `
      <span class="c-dotted">
        ${dot.join("")}
      </span>
    `;
  };

    return ` 
<div class="c-menu__item ${state === DELETE ? "c-menu__item--delete" : ""} c-menu__item--dep0${+_depID}">
  <div class="c-menu__item__info">
      <p class="c-menu__item__name" style="${+_depID == 1 ? "padding-left:0px" : "padding-left:" + 10 * +(+_depID - 1) + "px"}">
        ${+_depID == 1 ? "" : dotted()}
        ${title}
      </p>
      <span class="c-menu__item__state c-state ${state === "" ? STATE_CLASSES[SOON] : STATE_CLASSES[state]}"></span>
      <a target="_blank" href="${url || "javascript:void(0)"}" class="c-menu__item__link" style=${mq.matches && +_depID == 1 ? "padding-left:0px" : "padding-left:" + 10 * +(+_depID - 1) + "px"}>${url}</a>
      <div class="c-menu__item__history">
        ${historyElement}
      </div>
  </div>
  ${children && children.innerHTML ? '<div class="c-menu__item__children">' + children.innerHTML + "</div>" : ""}
</div>
`;
};
