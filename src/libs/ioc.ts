import Browser from "./class/browser";
import ViewPort from "./class/view-port";
import VisualRender from "./class/visual-render";
import MasterConfig from "./engine-config";
import GlobalEvent from "./multiplatform/global-event";
import Starter from "./starter";
import { IUniVector } from "./types/global";

class Ioc {

  public get: IUniVector = {};

  private config: MasterConfig;

  constructor() {
    this.config = new MasterConfig();
    this.singlton(Browser, undefined);
    this.singlton(ViewPort, this.config.getDrawRefference());
    this.singlton(GlobalEvent, this.get.Browser);
    this.singlton(VisualRender, undefined);
    this.singlton(Starter, this);
    // console.log("ioc constructed");
  }

  public singlton(Singlton: any, args: undefined | any) {
    if (args !== undefined) {
      this.get[Singlton.name] = new Singlton(args);

    } else {
      this.get[Singlton.name] = new Singlton();
    }
  }

  public gen(newInstance: any) {
    return new newInstance();
  }

}
export default Ioc;
