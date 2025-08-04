import { cssInterop } from "nativewind";
import { 
  Svg, 
  Path, 
  Circle, 
  Rect, 
  Line, 
  Polyline, 
  Polygon, 
  Ellipse,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
  G,
  Text,
  TSpan,
  Use
} from "react-native-svg";

// Enable className support for SVG components
cssInterop(Svg, {
  className: true,
});

cssInterop(Path, {
  className: true,
});

cssInterop(Circle, {
  className: true,
});

cssInterop(Rect, {
  className: true,
});

cssInterop(Line, {
  className: true,
});

cssInterop(Polyline, {
  className: true,
});

cssInterop(Polygon, {
  className: true,
});

cssInterop(Ellipse, {
  className: true,
});

cssInterop(Defs, {
  className: true,
});

cssInterop(LinearGradient, {
  className: true,
});

cssInterop(Stop, {
  className: true,
});

cssInterop(ClipPath, {
  className: true,
});

cssInterop(G, {
  className: true,
});

cssInterop(Text, {
  className: true,
});

cssInterop(TSpan, {
  className: true,
});

cssInterop(Use, {
  className: true,
}); 
