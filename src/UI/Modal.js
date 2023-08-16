export class Modal {
    constructor(contentId) {
        this.contentTemplateEl = document.getElementById(contentId);
        this.modalTemplateEl = document.getElementById('modal-template');
    }

    show() {
        const modalElements = document.importNode(this.modalTemplateEl.content, true);
        this.modalEl = modalElements.querySelector('.modal');
        this.backdropEl = modalElements.querySelector('.backdrop');

        const contentEl = document.importNode(this.contentTemplateEl.content, true);

        this.modalEl.appendChild(contentEl);


        document.body.insertAdjacentElement('afterbegin', this.modalEl);
        document.body.insertAdjacentElement('afterbegin', this.backdropEl);
    }

    hide() {
        if (this.modalEl) {
            document.body.removeChild(this.modalEl);
            document.body.removeChild(this.backdropEl);
            this.modalEl = null;
            this.backdropEl = null;
        }
    }
}