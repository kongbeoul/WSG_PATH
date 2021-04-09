import { COMPLETE, NONE } from "./Status";

export const mq = window.matchMedia("(max-width: 767px)");

export const create = (temp, data) => {
    let i = 0;
    while (i < data.length) {
        const { _depID, title, url, state, history, children } = data[i];
        if (children.length > 0) {
            const t = create([], children);
            temp.push({ _depID, title, url, state, history, children: t });
        } else {
            temp.push({ _depID, title, url, state, history, children });
        }
        i++;
    }
    return temp;
};
export const parsing = (temp, data) => {
    let i = 0;
    while (i < data.length) {
        const { _depID, title, url, state, history, children } = data[i];
        if (children.length > 0) {
            temp.push({ _depID, title, url, state, history, children });
            parsing(temp, children);
        } else {
            temp.push({ _depID, title, url, state, history, children });
        }
        i++;
    }
    return temp;
};
export const display = (data) => {
    let i = 0;
    while (i < data.length) {
        const { _depID, title, url, state, history, children } = data[i];
        if (children.length > 0) {
            console.log(_depID, title, url, state, history);
            display(children);
        } else {
            console.log(_depID, title, url, state, history);
        }
        i++;
    }
};

export const counted = (data, complete, total) => {
    let i = 0;
    while (i < data.length) {
        const { state, children } = data[i];
        if (children.length > 0) {
            const [c, t] = counted(children, complete, total);
            complete = c;
            total = t;
        } else {
            state == COMPLETE && complete++;
            total++;
            state == NONE && total--;
        }
        i++;
    }
    return [complete, total];
};
