import { BoxInterface, BoxConfig } from './types';
declare const HtmlClass: any;
/**
 * @author Alessandro Alberga
 * @description Describes the base structure of a box.
 */
export declare class Box extends HtmlClass {
    protected _boxId?: string;
    protected _name?: string;
    protected _init?: boolean;
    protected _container?: HTMLElement;
    protected _parentBoxId?: string;
    protected _context?: any;
    display: (context: any) => string;
    static _BoxConfig?: BoxConfig;
    static _BoxInterface: BoxInterface;
    protected detectBoxChanges: () => void;
    /**
     * Initialise our special box!
     */
    connectedCallback(): void;
    /**
     * Get the parent box from the parentBoxId set.
     */
    getParentBox(): HTMLElement;
    /**
     * Allows any box to terminate itself.
     */
    terminateSelf(): void;
    /**
     * Get box element by id.
     *
     * @param { Number } id box id.
     */
    getBoxElementById(id: any): HTMLElement;
    /**
     * Box disconnected callback.
     */
    disconnectedCallback(): void;
}
export {};
