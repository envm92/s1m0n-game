import { html, css, LitElement } from 'lit';

export class BoxButton extends LitElement {

  static get styles() {
    return css`
      :host {
        height: 150px;
        width: 150px;
        border-radius: 15px;
        box-shadow: 5px 5px 5px 0 rgba(0,0,0,0.42);
        -webkit-box-shadow: 5px 5px 5px 0 rgba(0,0,0,0.42);
        -moz-box-shadow: 5px 5px 5px 0 rgba(0,0,0,0.42);
        background: var(--background);
      }
      :host([enabled='true']) {
        cursor: pointer;
      }
      :host([enabled='false']) {
        cursor: not-allowed;
      }
      :host([highlight='true']) {
        -webkit-animation:zoom-in-out 1s linear 0s 1 normal;
        -moz-animation:zoom-in-out 1s linear 0s 1 normal;
        -ms-animation:zoom-in-out 1s linear 0s 1 normal;
        animation:zoom-in-out 1s linear 0s 1 normal;
      }
      @-webkit-keyframes zoom-in-out {
        0%{ -webkit-transform: scale(1); transform: scale(1); }
        50%{ -webkit-transform: scale(1.2); transform: scale(1.2); }
        100%{ -webkit-transform: scale(1); transform: scale(1); }
      }
      @keyframes zoom-in-out {
        0%{ -ms-transform: scale(1); transform: scale(1); }
        50%{ -ms-transform: scale(1.2); transform: scale(1.2); }
        100%{ -ms-transform: scale(1); transform: scale(1); }
      }
    `;
  }

  static get properties() {
    return {
      index: { type: Number },
      background: { type: String },
      highlight: {
        type: Boolean,
        value: false
      },
      enabled: {
        type: Boolean
      }
    };
  }
  constructor() {
    super();
  }

  render() {
    return html`
      I'm : ${this.index}
    `;
  }

  set background(value) {
    this.style.setProperty("--background", value);
  }
}
