import { type Globals } from "../globals";
import { Component } from "./component";

export class TextComponent<G extends Globals> extends Component<G, 'text'> {};