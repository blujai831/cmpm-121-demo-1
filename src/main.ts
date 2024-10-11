import {GameState} from "./GameState.ts";
import {GameUI} from "./GameUI.ts";
import "./style.css";

let ui = new GameUI();
let state = new GameState();
state.connectUI(ui);
ui.present();