import { DialogService } from './core-services/dialog/dialog.service.js';
import { HttpService } from './core-services/http/http.service.js';
/**
 * @author Alessandro Alberga
 * @description Box core api.
 */
export declare class HyperBoxCoreAPI {
    dialogService: DialogService;
    httpService: HttpService;
    constructor();
    /**
     * Initialise our api dependencies.
     */
    intiDependencies(): void;
}
