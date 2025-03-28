import AnimatedCursor from "react-animated-cursor";

const CustomCursorInline = () => (
  <div className="pointer-events-none fixed top-0 left-0 z-[9999]">
    <AnimatedCursor
      innerSize={8}
      outerSize={44}
      color="255, 160, 1"
      outerAlpha={0.3}
      innerScale={0.7}
      outerScale={1.2}
    />
  </div>
);

export default CustomCursorInline;
