/**
 * @author Alessandro Alberga
 * @description Box core api.
 */
class BoxCoreAPI {
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
