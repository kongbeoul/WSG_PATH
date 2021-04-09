import each from "lodash/each";
import { MENU, MENU_TOGGLE, MENU_TRIGGER } from "@/Menu";
import { TOOLTIP, TOOLTIP_TOGGLE, TOOLTIP_TRIGGER } from "@/ToolTip";
import { TOOLBAR, TOOLBAR_MENU, TOOLBAR_MENU_ACTIVE, TOOLBAR_OPEN, TOOLBAR_CLOSE, TOOLBAR_ACTIVE } from "@/Toolbar";
import { LAYER, LAYER_ACTIVE, LAYER_OPEN, LAYER_CLOSE } from "@/Layer";
import { mq } from "./Utils";

const CLICK = "click";

export default class EventHelper {
    constructor() {
        this.target = document.body;
        this.toolbar = this.target.querySelector(TOOLBAR);
        this.tooltip = this.target.querySelectorAll(`.${TOOLTIP}`);
        this.btnTop = this.target.querySelector(".c-btn--top");
        this.init();
    }
    init() {
        this.globalEvent();
        this.toolbarEvent();
        this.tooltipEvent();
    }
    globalEvent() {
        // Global
        this.target.addEventListener(CLICK, (e) => {
            e.stopPropagation();

            let { target } = e;

            // MENU
            if (target.classList.contains(MENU_TRIGGER)) {
                while (!target.classList.contains(MENU)) {
                    target = target.parentNode;
                }
                target.classList.toggle(MENU_TOGGLE);
            }

            // ToolTip
            [].forEach.call(document.querySelectorAll(`.${TOOLTIP_TOGGLE}`), (tooltip) => {
                tooltip.classList.remove(TOOLTIP_TOGGLE);
            });

            // Layer
            if (target.classList.contains(LAYER_OPEN)) {
                document.querySelector(`.${LAYER}`).classList.add(LAYER_ACTIVE);
            }

            if (target.classList.contains(LAYER_CLOSE)) {
                target.parentNode.classList.remove(LAYER_ACTIVE);
            }
        });

        
        window.addEventListener('scroll', e => {
            const { pageYOffset } = window;
            const scrollHeight = document.body.scrollHeight - window.innerHeight;
            
            if(pageYOffset > scrollHeight * 0.3) {
                this.btnTop.style.opacity = 1;
            } else {
                this.btnTop.style.opacity = 0;
            }
        })

        this.btnTop.addEventListener('click', e => {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        })

    }
    toolbarEvent() {
        const handleMatchedOpenClicked = () => {
            this.toolbar.classList.add(TOOLBAR_ACTIVE);
        };
        const handleMatchedCloseClicked = () => {
            this.toolbar.classList.remove(TOOLBAR_ACTIVE);
        };

        // TOOLBAR
        this.toolbar.addEventListener(CLICK, (e) => {
            const { target } = e;
            if (target.classList.contains(TOOLBAR_MENU)) {
                const controls = target.getAttribute("aria-controls");
                target.classList.add(TOOLBAR_MENU_ACTIVE);
                [].forEach.call(document.querySelectorAll(`.${TOOLBAR_MENU}`), (menu) => {
                    menu !== target && menu.classList.remove(TOOLBAR_MENU_ACTIVE);
                });

                [...document.querySelectorAll(`.${MENU}`)].slice(1).forEach((menu) => {
                    const id = menu.getAttribute("id");

                    if (controls === "전체") {
                        menu.style.display = "block";
                    } else {
                        if (id !== controls) {
                            menu.style.display = "none";
                        } else {
                            menu.style.display = "block";
                        }
                    }

                    mq.matches &&
                        (() => {
                            document.querySelector(`.${TOOLBAR_CLOSE}`).dispatchEvent(new Event(CLICK));
                        })();
                });
            }
        });

        mq.matches &&
            (() => {
                document.querySelector(`.${TOOLBAR_OPEN}`).addEventListener(CLICK, handleMatchedOpenClicked);
                document.querySelector(`.${TOOLBAR_CLOSE}`).addEventListener(CLICK, handleMatchedCloseClicked);
            })();

        mq.addListener((_mq) => {
            if (_mq.matches) {
                document.querySelector(`.${TOOLBAR_OPEN}`).addEventListener(CLICK, handleMatchedOpenClicked);
                document.querySelector(`.${TOOLBAR_CLOSE}`).addEventListener(CLICK, handleMatchedCloseClicked);
            } else {
                document.querySelector(`.${TOOLBAR_OPEN}`).removeEventListener(CLICK, handleMatchedOpenClicked);
                document.querySelector(`.${TOOLBAR_CLOSE}`).removeEventListener(CLICK, handleMatchedCloseClicked);
            }
        });
    }
    tooltipEvent() {
        [].forEach.call(this.tooltip, (tooltip) => {
            const trigger = tooltip.querySelector(`.${TOOLTIP_TRIGGER}`);
            trigger.addEventListener(CLICK, (e) => {
                e.stopPropagation();
                e.target.parentNode.classList.toggle(TOOLTIP_TOGGLE);
                [].forEach.call(this.tooltip, (t) => {
                    t !== e.target.parentNode && t.classList.remove(TOOLTIP_TOGGLE);
                });
            });
        });
    }
}
