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

      :host([index='0']) {
        background-image: linear-gradient(#eb7ea9 7.5px, transparent 7.5px), linear-gradient(to right, #eb7ea9 7.5px, transparent 7.5px);
        background-size: 25px 25px;
        background-color: #f3b1cd;
      }

      :host([index='1']) {
        background-image: repeating-conic-gradient(#bad5f0 0% 25%, #07b0da 0% 50%);
        background-position: 0 0, 25px 25px;
        background-size: 50px 50px;
        background-color: #07b0da;
      }

      :host([index='2']) {
        background-image: radial-gradient(#6f59a0 2.5px, transparent 2.5px), radial-gradient(#6f59a0 2.5px, transparent 2.5px);
        background-size: 19px 19px;
        background-position: 0 0, 9.5px 9.5px;
        background-color: #b0abcc;
      }

      :host([index='3']) {
        background-image: repeating-linear-gradient(45deg, transparent, transparent 19px, #96c8ad 19px, #96c8ad 38px);
        background-color: #c2d5a8;
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

    `;
  }

  set background(value) {
    this.style.setProperty("--background", value);
  }
}
