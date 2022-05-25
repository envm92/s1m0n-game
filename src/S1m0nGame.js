import {html, css, LitElement} from 'lit';
import {when} from 'lit/directives/when.js';

export class S1m0nGame extends LitElement {
  static get styles() {
    return css`
      :host {
        height: 450px;
        width: 350px;
        background-color: beige;
        display: block;
      }

      div {
        height: auto;
        display: grid;
        grid-template-columns: auto auto;
        justify-items: center;
        align-items: center;
        row-gap: 20px;
      }
    `;
  }

  static get properties() {
    return {
      whoIsTurn: {
        type: String
      },
      isOver: {
        type: Boolean,
        value: true
      },
      isAnimate: {
        type: Boolean,
        value: false
      },
      options: {
        type: Array,
        value: ['#f3b1cd', '#bad5f0', '#b0abcc', '#c2d5a8']
      },
      sequence: {
        type: Array,
        value: []
      },
      onHighlight: {
        type: Number,
        value: -1
      },
      playerStep: {
        type: Number,
        value: 0
      },
    };
  }

  constructor() {
    super();
    this._init();
  }

  _init() {
    this.whoIsTurn = '';
    this.sequence = [];
    this.options = ['#f3b1cd', '#bad5f0', '#b0abcc', '#c2d5a8'];
    this.isOver = true;
    this.onHighlight = -1;
    this.playerStep = 0;
    this.isAnimate = false;
  }

  __start() {
    this.sequence = [];
    this.isOver = false;
    this.onHighlight = -1;
    this.whoIsTurn = 's1m0n';
  }

   async __newTurn() {
     await this.updateComplete;
     this.onHighlight = -1;
     this.playerStep = 0;
     if (this.whoIsTurn === 's1m0n') {
       this.addToSequence();
       await this.updateComplete;
       this._animateCurrentBox();
     }

   }

   async __changeTurn() {
     await this.updateComplete;
     this.onHighlight = -1;
     this.playerStep = 0;
     setTimeout(() => {
       this.whoIsTurn = this.whoIsTurn === 's1m0n' ? 'player' : 's1m0n';
       if (this.whoIsTurn === 's1m0n') {
         this.addToSequence();
       }
     },0);

   }

  async _animateCurrentBox() {
    if (!this.isAnimate) {
      setTimeout(() => {
        this.onHighlight = this.sequence[this.playerStep];
        this.playerStep++;
        this.requestUpdate();
      },0);
      await this.updateComplete;
    }
  }

  addToSequence() {
    const nextStep = Math.floor(Math.random() * this.options.length);
    this.sequence.push(nextStep);

  }

  compareMove(idColor) {
    if (this.sequence[this.playerStep] !== idColor) {
      this.isOver = true;
    }
    this.playerStep++;
    this.requestUpdate();
  }

  updated(_changedProperties) {
    if (!this.isAnimate && !this.isOver && (_changedProperties.has('whoIsTurn')  || _changedProperties.has('isAnimate') )) {
        if (this.sequence.length !== 0 && (this.sequence.length === this.playerStep)) {
          this.__changeTurn();
        }
        if (this.sequence.length === 0) {
          this.__newTurn();
        }
        if (this.whoIsTurn === 's1m0n' && this.playerStep < this.sequence.length) {
          this._animateCurrentBox();
        }
    }
  }

  render() {
    return html`
      <h2>S1m0n Game</h2>
      <p>Turn: ${this.whoIsTurn}</p>
      <p>IsOver: ${this.isOver}</p>
      ${when(this.isOver, () => html`
        <button @click=${this.__start}>Start</button>
      `, () => html`
        <div>
          ${this.options.map((opt, i) => html`
            <box-button
              background=${opt}
              index=${i}
              enabled=${this.whoIsTurn !== 's1m0n'}
              highlight=${i === this.onHighlight}
              @click=${()=> {
                if (this.whoIsTurn !== 's1m0n' && !this.isAnimate) {
                  this.onHighlight = i;
                  this.compareMove(i);
                  this.requestUpdate();
                }
              }}
              @webkitAnimationStart=${() =>{
                this.isAnimate = true;
                this.requestUpdate();
              }}
              @webkitAnimationEnd=${() => {
                this.isAnimate = false;
                this.onHighlight = -1;
                this.requestUpdate();
              }}
            ></box-button>
          `)}
        </div>
      `)}
    `;
  }
}
