import Reveal from "reveal.js";
import Markdown from "reveal.js/plugin/markdown/markdown.esm.js";
import RevealZoom from "reveal.js/plugin/zoom/zoom.esm";
import RevealHighlight from "reveal.js/plugin/highlight/highlight.esm";
import RevealMath from "reveal.js/plugin/math/math.esm";
import { Reveald3 } from "../plugin/reveald3";

let deck = new Reveal({
  plugins: [RevealHighlight, Markdown, Reveald3, RevealZoom, RevealMath.KaTeX],
});
deck.initialize();
