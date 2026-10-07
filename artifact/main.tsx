import { createRoot } from "react-dom/client";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Cursor from "@/components/ui/Cursor";
import Home from "@/app/page";

createRoot(document.getElementById("root")!).render(
  <>
    <SmoothScroll>
      <Home />
    </SmoothScroll>
    <Cursor />
  </>,
);
