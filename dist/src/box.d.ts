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
    protected boxOnDisplayed: () => void;
    protected boxOnDestroyed: () => void;
    display: (context: any) => string;
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
