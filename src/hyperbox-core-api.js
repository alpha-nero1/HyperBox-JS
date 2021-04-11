import { DialogService } from './core-services/dialog/dialog.service';
import { HttpService } from './core-services/http/http.service';

/**
 * @author Alessandro Alberga
 * @description Box core api.
 */
export class HyperBoxCoreAPI {
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
