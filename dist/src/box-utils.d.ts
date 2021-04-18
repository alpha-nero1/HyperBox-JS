import { Box } from "./box";
/**
 * @author Alessandro Alberga
 * @description Box utils.
 */
export declare class BoxUtils {
    /**
     * Check if a value value is null or empty.
     *
     * @param { String } str the string to preform null or empty check on.
     */
    static IsNullOrEmpty: (value: any) => boolean;
    static CheckBoxRequirements(box: Box): void;
    /**
     * Build a function name that uses a certain prefix.
     *
     * @param { String } prefix prefix string e.g. 'get'
     * @param { String } variableName variable name e.g. 'name'
     */
    static BuildPrefixedFunctionName(prefix: any, variableName: any): any;
    /**
     * Build the setter name for a variable name.
     *
     * @param { String } variableName variable name.
     */
    static BuildSetterName(variableName: any): any;
    /**
     * Build the geter name for a variable name.
     *
     * @param { String } variableName variable name.
     */
    static BuildGetterName(variableName: any): any;
    /**
     * Capitalise the first letter in a string.
     *
     * @param { String } value string value.
     * @returns { String } Capitalised string.
     */
    static CapitalizeFirstLetter(value: any): any;
    /**
     * Load JSON.
     *
     * @param { String } path json path.
     * @returns { Promise<any> } Promise of JSON object.
     */
    static LoadJSON(path: any): Promise<unknown>;
    /**
     * After a change is needed, re-use the box display function to re-set inner html.
     *
     * @param {*} box
     */
    static DisplayBox(box: any): void;
    /**
     * Build box interfaces (setters and getters) if _BoxInterface present.
     *
     * @param { any } box box.
     */
    static BuildBoxInterfaces(box: any): void;
    static BuildBoxGettersAndSetters(box: any, inputsObject: {
        [key: string]: any;
    }): void;
    static BuildBoxOutputs(box: any, outputsObject: {
        [key: string]: any;
    }): void;
    /**
     * Build the standard variables that go on boxes.
     *
     * @param { any } box box.
     */
    static BuildBoxStandardVariables(box: any): void;
    /**
     * Load attributes from the DOM if they have been specified in the _BoxInterface!
     *
     * @param { any } box box.
     */
    static LoadDOMAttributes(box: any): void;
    /**
     * Check if a property name is an input.
     *
     * @param { String } propertyName property name.
     */
    static IsVariableInputProperty(propertyName: any): boolean;
    static GetFunctionNameFromFunctionCallString(functionCallString: any): string;
    /**
     * Check if a property name is an output.
     *
     * @param { String } propertyName property name.
     */
    static IsOutputProperty(propertyName: any): boolean;
    /**
     * Remove the first and last char of a string.
     *
     * @param { Stirng } propertyName property name.
     */
    static TrimFirstAndLastChar(propertyName: any): any;
}
