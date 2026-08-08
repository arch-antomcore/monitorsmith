import { gsap } from "./gsap/index.js";
import { ScrollTrigger } from "./gsap/ScrollTrigger.js";
import { ScrollToPlugin } from "./gsap/ScrollToPlugin.js";
import { CustomEase } from "./gsap/CustomEase.js";
import { SplitText } from "./gsap/SplitText.js";
import { Draggable } from "./gsap/Draggable.js";
import { Flip } from "./gsap/Flip.js";

// Register core plugins with GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(
    ScrollTrigger,
    ScrollToPlugin,
    CustomEase,
    SplitText,
    Draggable,
    Flip
  );
}

export {
  gsap,
  ScrollTrigger,
  ScrollToPlugin,
  CustomEase,
  SplitText,
  Draggable,
  Flip,
};
