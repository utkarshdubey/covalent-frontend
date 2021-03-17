import { useViewportSize } from "@/customHooks";
import { desktopContainer, mobileContainer } from "./Landing.styles";
import { ActionBox } from "@/components/ActionBox";
import { Relationships } from "@/components/Relationships";
import { useState } from "@hydrophobefireman/ui-lib";
import { FetchContext } from "@/context";
function useIsWideScreen() {
  const [, width] = useViewportSize();
  return width < 650;
}
export default function Landing() {
  const mobile = useIsWideScreen();
  const [fetcher, setFetcher] = useState(null);
  return (
    <FetchContext.Provider value={{ fetcher, setFetcher }}>
      <section class={mobile ? mobileContainer : desktopContainer}>
        {!mobile && <ActionBox />}
        <Relationships mobile={mobile} />
        {mobile && <ActionBox />}
      </section>
    </FetchContext.Provider>
  );
}

// function DesktopLayout() {
//   return (
//     <section class={desktopContainer}>
//       <ActionBox />
//       <Relationships />
//     </section>
//   );
// }

// function MobileLayout() {
//   return (
//     <section class={mobileContainer}>
//       <Relationships mobile />
//       <ActionBox />
//     </section>
//   );
// }
