import "./style.css";
import {GameState} from "./GameState.ts";
import {GameUI} from "./GameUI.ts";

let ui = new GameUI();
let state = new GameState();
state.connectUI(ui);
ui.present();