import { Box } from '../../box.js';
/**
 * @author Alessandro Alberga
 * @description Dialog box implementation.
 */
export declare class DialogBox extends Box {
    static _BoxConfig: {
        name: string;
        styleSheetPath: string;
    };
    static _BoxInterface: {
        Inputs: {
            _dialogContext: {};
        };
    };
    private innerBox?;
    private _dialogContext?;
    constructor();
    /**
     * Insert the dialog inner box.
     *
     * @param { String } boxClassName box class name
     * @param { any } argumentsObject args object.
     * @param { function } onSuccess sucess callback.
     * @param { function } onError error callback
     */
    insertDialogInnerBox(boxClassName: any, argumentsObject: any, onSuccess: any, onError: any): void;
    /**
     * Getter for cancel button.
     */
    getCancelButton(): string;
    /**
     * Getter for accept button.
     */
    getAcceptButton(): string;
    /**
     * Getter for title.
     */
    getTitle(): string;
    /**
     * Getter for the inner box.
     */
    getInnerBox(): string;
    /**
     * Underlay was clicked handler.
     */
    underlayOnClicked(): void;
    display: () => string;
}
