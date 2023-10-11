import { expressServer } from "@rpgjs/server/express";
import * as url from "url";
import { RpgWorld, RpgModule, Components, Control, EventData, RpgEvent } from "@rpgjs/server";
const client$4 = null;
function sendMessage(obj) {
  const {
    message,
    map,
    player: player2,
    type
  } = obj;
  const data = {
    message,
    date: Date.now(),
    type: type || "player"
  };
  if (player2) {
    data.sender = player2.id;
  }
  RpgWorld.getPlayersOfMap(map.id).forEach((p) => {
    p.emit("chat-message", data);
  });
}
const player$1 = {
  onJoinMap(player2, map) {
    sendMessage({
      message: `${player2.name} join this map`,
      map,
      player: player2,
      type: "info"
    });
    player2.off("chat-message");
    player2.on("chat-message", (message) => {
      sendMessage({
        message: `${player2.name}: ${message}`,
        map,
        player: player2
      });
    });
  },
  onLeaveMap(player2, map) {
    sendMessage({
      message: `${player2.name} left this map`,
      map,
      player: player2,
      type: "info"
    });
  }
};
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$2(target, key, result);
  return result;
};
let RpgServerEngine = class {
};
RpgServerEngine = __decorateClass$2([
  RpgModule({
    player: player$1
  })
], RpgServerEngine);
const mmorpg = {
  client: client$4,
  server: RpgServerEngine
};
const client$3 = null;
const _main_worlds_myworldworld = { "maps": [{ "fileName": "maps/simplemap.tmx", "height": 640, "width": 800, "x": 64, "y": -160 }, { "fileName": "maps/simplemap2.tmx", "height": 640, "width": 640, "x": -160, "y": 480 }], "onlyShowAdjacentMaps": false, "type": "world", "basePath": "./main/worlds", "id": "./main/worlds/myworld.world" };
const player = {
  onConnected(player2) {
    player2.name = "YungPunk";
    player2.setComponentsTop(Components.text("{name}"));
  },
  onInput(player2, {
    input
  }) {
    if (input == Control.Back) {
      player2.callMainMenu();
    }
  },
  async onJoinMap(player2) {
    if (player2.getVariable("AFTER_INTRO")) {
      return;
    }
    await player2.showText("Welcome to YungPunks: A new social identity ecosystem.");
    await player2.showText("On-chain identities, available to all, that can own and trade assets, earn XP, Achievements and Rewards, share in the decision making with the community, and build applications to benefit the whole YungPunk ecosystem.");
    await player2.showText("With digital sovereignty, open-source technology and decentralization at their core, YungPunks are a new identity ecosystem, closer to a protocol than a pfp.");
    await player2.showText("Are you ready, Punk?");
    player2.setVariable("AFTER_INTRO", true);
  }
};
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$1(target, key, result);
  return result;
};
let VillagerEvent = class extends RpgEvent {
  onInit() {
    this.setGraphic("female");
  }
  async onAction(player2) {
    await player2.showText("I give you 10 gold.", {
      talkWith: this
    });
    player2.gold += 10;
  }
};
VillagerEvent = __decorateClass$1([EventData({
  name: "EV-1",
  hitbox: {
    width: 32,
    height: 16
  }
})], VillagerEvent);
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
const _lastConnectedCb = player.onConnected;
player.onConnected = async (player2) => {
  if (_lastConnectedCb)
    await _lastConnectedCb(player2);
  if (!player2.server.module.customHookExists("server.player.onAuth")) {
    player2.setGraphic("hero");
    player2.setHitbox(16, 16);
    await player2.changeMap("simplemap");
  }
};
let RpgServerModuleEngine = class {
};
RpgServerModuleEngine = __decorateClass([
  RpgModule({
    player,
    events: [VillagerEvent],
    database: [],
    maps: [],
    worldMaps: [_main_worlds_myworldworld]
  })
], RpgServerModuleEngine);
const _main = {
  client: client$3,
  server: RpgServerModuleEngine
};
const client$2 = null;
const _rpgjs_mobile_gui = {
  client: client$2
};
const client$1 = null;
const _rpgjs_default_gui = {
  client: client$1
};
const client = null;
const _rpgjs_gamepad = {
  client
};
const modules = [
  mmorpg,
  _main,
  _rpgjs_mobile_gui,
  _rpgjs_default_gui,
  _rpgjs_gamepad
];
const globalConfig = { "startMap": "simplemap", "start": { "map": "simplemap", "graphic": "hero", "hitbox": [16, 16] }, "compilerOptions": { "build": {} }, "express": { "static": "" }, "name": "My Game" };
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
expressServer(modules, {
  globalConfig,
  basePath: __dirname,
  envs: {
    VITE_BUILT: 1,
    VITE_SERVER_URL: void 0,
    VITE_RPG_TYPE: "mmorpg",
    VITE_ASSETS_PATH: ""
  }
});
