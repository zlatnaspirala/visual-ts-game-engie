import { IGamePlayModel } from "../../../libs/interface/global";
import Starter from "../../../libs/starter";
import { worldElement } from "../../../libs/types/global";
import GamePLay from "./game-play";

/**
 * @author Nikola Lukic
 * @class Platformer
 * @param Starter
 * @description This is game logic part
 * we stil use class based methodology.
 * About resource we use requir
 */

class Platformer implements IGamePlayModel {

  public gameName: string = "platformer";
  public version: number = 0.2;
  public starter: Starter;
  public grounds: worldElement[] = [];
  public v: any;
  public player: any = {};

  constructor(starter: Starter) {

    this.starter = starter;
    this.v = starter.getView();

  }

  public attachAppEvents = () => {
    const myInstance = this;
    window.addEventListener("game-init", function (e) {
      console.log("Event triggered: ", e);
    });
  }

  protected collisionCheck(event, ground: boolean) {

  const pairs = event.pairs;
  for (let i = 0, j = pairs.length; i !== j; ++i) {
    const pair = pairs[i];
    if (pair.activeContacts) {

      if (pair.bodyA.label === "player" && pair.bodyB.label === "bitcoin") {
        const collectitem = pair.bodyB;
        this.starter.destroyBody(collectitem);
      }

      pair.activeContacts.forEach((element) => {
        if (element.vertex.body.label === "player" &&
          element.vertex.index > 5 && element.vertex.index < 8) {
          this.player.ground = ground;
        } else {
          this.player.ground = false;
        }
      });
      }
    }
  }

  private destroyGamePlay() {
    this.starter.destroyGamePlay();
  }

}
export default Platformer;
