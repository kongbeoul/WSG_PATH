export const NONE = "none";
export const SOON = "soon";
export const ING = "ing";
export const COMPLETE = "complete";
export const DELETE = "delete";

export const STATE_CLASSES = {
    [NONE]: "c-state--none",
    [SOON]: "c-state--soon",
    [ING]: "c-state--ing",
    [COMPLETE]: "c-state--complete",
    [DELETE]: "c-state--delete",
};

export default class Status {
    constructor(complete, total) {
        this.total = total;
        this.complete = complete;
    }
    render(element = ".l-status__total") {
        const { complete, total } = this;
        document.querySelector(element).innerHTML = `${complete} / total ${total} pages`;
    }
}
