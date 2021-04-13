import { DialogService } from './core-services/dialog/dialog.service.js';
import { HttpService } from './core-services/http/http.service.js';

/**
 * @author Alessandro Alberga
 * @description Box core api.
 */
export class HyperBoxCoreAPI {
  public dialogService: DialogService;
  public httpService: HttpService;

  constructor() {
    this.intiDependencies()
  }

  /**
   * Initialise our api dependencies.
   */
  intiDependencies() {
    this.dialogService = new DialogService();
    this.httpService = new HttpService();
  }
}
