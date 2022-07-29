import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import {Reveald3} from '../plugin/reveald3'

let deck = new Reveal({
   plugins: [ Markdown, Reveald3 ]
})
deck.initialize();
