export const STATE = 'c-state';
export const NONE = "none";
export const SOON = "soon";
export const ING = "ing";
export const COMPLETE = "complete";
export const DELETE = "delete";

export const STATE_CLASSES = {
    [NONE]: `${STATE}--none`,
    [SOON]: `${STATE}--soon`,
    [ING]: `${STATE}--ing`,
    [COMPLETE]: `${STATE}--complete`,
    [DELETE]: `${STATE}--delete`,
};

export default class Status {
    constructor(complete, total) {
        this.total = total;
        this.complete = complete;
    }
    render(element = ".l-status__total") {
        const { complete, total } = this;
        document.querySelector(element).innerHTML = `${complete} / total ${total} pages`;

        Object.values(STATE_CLASSES).slice(1).forEach(v => {
            let html = "";
            switch(v) {
                case STATE_CLASSES[SOON]:
                    html = `<span class="l-legend__item ${STATE} ${STATE_CLASSES[SOON]}"><em>작업예정</em></span>`;
                    break;
                case STATE_CLASSES[ING]:
                    html = `<span class="l-legend__item ${STATE} ${STATE_CLASSES[ING]}"><em>작업중</em></span>`;
                    break;
                case STATE_CLASSES[COMPLETE]:
                    html = `<span class="l-legend__item ${STATE} ${STATE_CLASSES[COMPLETE]}"><em>작업완료</em></span>`;
                    break;
                case STATE_CLASSES[DELETE]:
                    html = `<span class="l-legend__item ${STATE} ${STATE_CLASSES[DELETE]}"><em>화면삭제</em></span>`;
                    break;
                default: 
                    return;
            }

            document.querySelector(".l-legend").insertAdjacentHTML("beforeend", html);
        })

    }
}
