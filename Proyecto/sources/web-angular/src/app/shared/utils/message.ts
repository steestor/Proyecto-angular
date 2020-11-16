import notify from 'devextreme/ui/notify';
import { confirm, alert } from 'devextreme/ui/dialog';

export class ItiMessage {

    static position = 'top center';
    static displayTime = 5000;

    static toast(message: string, type: string = 'success', position: string = ItiMessage.position) {

        const object = {
            message: message,
            type: type,
            displayTime: ItiMessage.displayTime,
            position: position
        };

        notify(object);
    }

    static toastHTML(message: string, type: string) {
        const template = `<div data-options="dxTemplate: { name:'myContent' }">` + message + `</div>`;

        const object = {
            contentTemplate: template,
            type: type,
            displayTime: ItiMessage.displayTime,
            position: ItiMessage.position
        };

        notify(object);
    }

    static confirm(message, title = 'Pregunta') {
        return confirm(message, title);
    }

    static alert(message, title = 'Información') {
        return alert(message, title);
    }
}
