# Project : Visual ts game engine #
## Version : new era - 2018/2019 ##

#### 2d canvas game engine based on Matter.js 2D physics engine for the web. ####
 - Writen in typescript current version 3.1.3.
 - Text editor used and recommended: Visual Studio Code

![visualTS](https://github.com/zlatnaspirala/visual-ts/blob/master/logo.png)

#### To make all dependency works in build proccess we need some plugins. ####

```javascript
  npm install
```

```javascript
  npm run build
```

<b> Navigate in browser /build/app.html to see client app in action </b>

## Client part ##

 -Client part is browser web application. No reloading or redirecting. This is single page
 application. I use html request only for loading local html (register, login etc.).
 Networking is based on webSocket full-duplex communication.
 -webRTC Can be used for any proporsion.
   Already implemented :
   -video chat webRTC (SIP)
   -chat or data communication

 -Connector (native webSocket) used for user session staff.
  in progress...

### Client config ###

 if you want web app without networking then setup :

<code>  appUseAccountsSystem: boolean = false; </code>

 - No need for deactivation multi media webRTC support becouse
 this feature run only on user request for now.

Find configuration at ./src/lib/client-config.ts

```javascript
/**
 * ClientConfig instance created in ioc.ts
 * In scripts you need to use get methods
 * like : getDomain() etc.
 */
class ClientConfig {

  private drawReference: string = "frame";

  /**
   * aspectRatio default value , can be changed in run time.
   */
  private aspectRatio: number = 1.333;

  /**
   * domain is simple url address,
   * recommendent to use for local propose LAN ip
   * like : 192.168.0.XXX if you wanna run ant test app with server.
   */
  private domain: string = "127.0.0.1";

  /**
   * networkDeepLogs control of dev logs.
   */
  private networkDeepLogs: boolean = false;

  /**
   * rtcServerPort Port used to connect multimedia server.
   * Default value is 12034
   */
  private rtcServerPort: number = 12034;

  /**
   * masterServerKey is channel access id used to connect
   * multimedia server channel.
   */
  private masterServerKey: string = "multi-platformer-sever1.maximum";

  /**
   * connectorPort is access port used to connect
   * session web socket.
   */
  private connectorPort: number = 1234;

  /**
   * appUseAccountsSystem If you don't want to use session
   * in your application just setup this variable to the false.
   */
  private appUseAccountsSystem: boolean = true;

```

### Start dependency system from app.ts ###

 - Fisrt game template is Platformer.

#### Main dependency file ####

```typescript
/**
 * Import global css
 */
require("./style/styles.css");

import AppIcon from "./app-icon";
import Platformer from "./examples/platformer/platformer";
import Ioc from "./libs/ioc";

const master = new Ioc();
const appIcon: AppIcon = new AppIcon(master.get.Browser);

// First demo is platformer
master.singlton(Platformer, master.get.Starter);

```

### Project structure ###

 - build/ is autogenerated. Don't edit or add content in this folder.
 - src/ is main client part (Browser web application).
   Main file : app.ts
 - src/libs/ is common and smart pack of classes, interfaces etc.
   easy access.


<pre>

├── package.json
├── package-lock.json
├── webpack.config.js
├── tsconfig.json
├── tslint.json
├── build/  (This is auto generated)
|   ├── imgs/
|   ├── styles/
|   |   └── favicon.ico
|   ├── visualjs2.js
|   ├── app.html
├── src/
|   ├── style/
|   |   ├── styles.css
|   ├── libs/
|   |   ├── class/
|   |   |   ├── networking/
|   |   |   ├── visual-methods/
|   |   |   ├── browser.ts
|   |   |   ├── math.ts
|   |   |   ├── position.ts
|   |   |   ├── resources.ts
|   |   |   ├── sound.ts
|   |   |   ├── system.ts
|   |   |   ├── view-port.ts
|   |   |   ├── visual-render.ts
|   |   ├── interface/
|   |   |   ├── drawI.ts
|   |   |   ├── global.ts
|   |   |   ├── visual-components.ts
|   |   ├── multiplatform/
|   |   ├── types/
|   |   |   ├── global.ts
|   |   ├── engine-config.ts
|   |   ├── ioc.ts
|   |   ├── starter.ts
|   ├── icon/ ...
|   ├── examples/
|   |   ├── platformer/
|   ├── html-components/
|   |   ├── register.html
|   |   ├── login.html
|   ├── index.html
|   ├── app-icon.ts
|   └── app.ts
└── server/
|   ├── package.json
|   ├── package-lock.json
|   ├── server-config.js
|   ├── database/
|   |   ├── database.js
|   |   ├── common/
|   |   ├── email/
|   |   |   ├── templates/
|   |   |   |   ├── confirmation.html.js
|   |   |   ├── nocommit.js (no commited for now)
|   |   └── data/ (ignored - db system folder)
|   ├── rtc/
|   |   ├── server.ts
|   |   ├── connector.ts
|   |   ├── self-cert/

</pre>


## Server part ##

### Installed database : mongodb@3.1.8 ###

-No typescript here, we need keep state clear no.
Node.js is best options.

- Not yet commited email support class.

 I choose :

 ```node
 npm i gmail-send
 ```

-Run services database server (Locally and leave it alive for develop proccess):

```javascript
npm run dataserver
```

Looks like this :
 ```node
mongod --dbpath ./server/database/data
 ```

Fix : "failed: address already in use"

```javascript
  netstat -ano | findstr :27017

  taskkill /PID typeyourPIDhere /F
```

<b>Also important "Run Visual Studio Code as Administrator".</b>

 -Command for kill all node.js procces for window users:
```node
  taskkill /im node.exe /F
```


### Networking multimedia communication : WebSocketServer running on Node.js ###

<b> - Running server is easy : </b>

```javascript
  npm run rtc
```

- Implemented video chat based on webRTC protocol

## Documentation : ##

 - In progress like whole project ...
 If you wanna generate doc you will need manual remove comment
 from plugin section in webpack.config.js.
 Best way to fully build healty.
 HTML/CSS is not prior in this project.

If you wanna insert some new html page just define it intro
webpack.config.js :

```javascript
plugins : [
        new HtmlWebpackPlugin({
            filename: '/templates/myGameLobby.html',
            template: 'src/html-components/myGameLobby.html'
        }),
...
```
 - See register and login example.

### Code format : ###

```javascript
  npm run fix
  npm run tslint
```
or use :

```javascript
  tslint -c tslint.json 'src/**/*.ts' --fix
  tslint -c tslint.json 'src/**/*.ts'
```

## External licence in this project : ##

 <b>- Networking based on :</b> <br/>
 Muaz Khan <br/>
 MIT License www.WebRTC-Experiment.com/licence <br/>

 <b>- Base physics beased on :</b> <br/>
 Matter.js <br/>
 https://github.com/liabru/matter-js <br/>

## Todo list for 2019 ##

  <b>I'am still far a away from project objective :</b>

 - Make visual nodes for editor mode in game play.
 - Item's selling for crypto values.
 - Create examples demos in minimum 20 game play variants
  (table games, actions , platformers , basic demo trow the api doc etc.).
 - Implementing AR and webGL2.

## Donate this project ##

<a href="https://coingate.com/pay/visual-ts-game-engine" rel="noopener noreferrer nofollow" target="_blank"><img alt="CoinGate Payment Button" src="https://static.coingate.com/images/buttons/4.png" /></a>
 
