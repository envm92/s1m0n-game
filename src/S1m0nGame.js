import {html, css, LitElement} from 'lit';
import {when} from 'lit/directives/when.js';
import {
  provideFluentDesignSystem,
  fluentButton,
  fluentBadge,
  fluentCard
} from "@fluentui/web-components";


provideFluentDesignSystem().register(fluentCard());
provideFluentDesignSystem().register(fluentBadge());
provideFluentDesignSystem().register(fluentButton());

export class S1m0nGame extends LitElement {
  static get styles() {
    return css`
      :host {
        height: 450px;
        width: 350px;
        display: block;
        font-family: system-ui,serif;
        font-weight: bold;
      }

      #board {
        height: 100%;
        display: grid;
        grid-template-columns: auto auto;
        place-items: center;
        row-gap: 10px;
        margin: 5px 0px;
        justify-content: space-around;
        justify-items: center;
        align-content: center;
      }

      fluent-card {
        padding: 1em;
      }

      #start {
        height: 100%;
        width: auto;
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: center;
      }

      #display {
        display: flex;
        justify-content: space-between;
        align-content: center;
        flex-wrap: wrap;
        flex-direction: row;
        align-items: baseline;
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
    }, 0);

  }

  async _animateCurrentBox() {
    if (!this.isAnimate) {
      this.__playSound(this.whoIsTurn);
      setTimeout(() => {
        this.onHighlight = this.sequence[this.playerStep];
        this.playerStep++;
        this.requestUpdate();
      }, 0);
      await this.updateComplete;
    }
  }

  __playSound(type) {
    const gallery = {
      'gameOver': 'https://cdn.pixabay.com/download/audio/2022/02/11/audio_7f0bf4cdc0.mp3?filename=buzzer-or-wrong-answer-20582.mp3',
      's1m0n': 'https://cdn.pixabay.com/download/audio/2022/03/26/audio_515cd38fa2.mp3?filename=slow-wind-sound-effect-108401.mp3',
      'player': 'https://cdn.pixabay.com/download/audio/2022/01/07/audio_ea449d6cea.mp3?filename=start-13691.mp3'
    }
    const audio = new Audio(gallery[type]);
    audio.loop = false;
    audio.play();
  }

  addToSequence() {
    const nextStep = Math.floor(Math.random() * this.options.length);
    this.sequence.push(nextStep);
  }

  compareMove(idColor) {
    if (this.sequence[this.playerStep] !== idColor) {
      setTimeout(() => {
        this.__playSound('gameOver');
      });
      this.isOver = true;
    }
    this.playerStep++;
    this.requestUpdate();
  }

  updated(_changedProperties) {
    if (!this.isAnimate && !this.isOver && (_changedProperties.has('whoIsTurn') || _changedProperties.has('isAnimate'))) {
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
      <fluent-card>
      ${when(this.isOver, () => html`
        <div id="start">
          <fluent-button appearance="accent" @click=${this.__start}>Start</fluent-button>
        </div>
      `, () => html`
        <div id="display">
          <fluent-badge appearance="${this.whoIsTurn === 's1m0n' ? 'accent': 'neutral'}">S1m0n</fluent-badge>
          <span>${this.sequence.length - 1}</span>
          <fluent-badge appearance=${this.whoIsTurn === 'player' ? 'accent': 'neutral'}>You</fluent-badge>
        </div>
        <div id="board">
          ${this.options.map((opt, i) => html`
            <box-button
              background=${opt}
              index=${i}
              enabled=${this.whoIsTurn !== 's1m0n'}
              highlight=${i === this.onHighlight}
              @click=${() => {
                if (this.whoIsTurn !== 's1m0n' && !this.isAnimate) {
                  this.__playSound(this.whoIsTurn);
                  this.onHighlight = i;
                  this.compareMove(i);
                  this.requestUpdate();
                }
              }}
              @webkitAnimationStart=${() => {
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
      </fluent-card>
    `;
  }
}
