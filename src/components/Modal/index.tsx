import { css } from "catom";
import { actionButton, mask, modal, closeButton } from "./modal.styles";
export function ModalLayout(props?: {
  close: (e?: MouseEvent) => void | null;
  children?: any;
}) {
  return (
    <section
      class={mask}
      onClick={(e) =>
        props.close && e.target === e.currentTarget && props.close()
      }
    >
      <div class={modal}>
        <div class={css({ maxHeight: "80vh" })}>
          {props.close && (
            <button
              onClick={props.close}
              class={[actionButton, closeButton]}
              style={{ fontSize: "2rem", fontWeight: "normal" }}
            >
              <svg
                height="2rem"
                width="2rem"
                className="w-6 h-6"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke-width={"2px"}
                  fill="var(--bg)"
                  stroke="black"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          )}
          {props.children}
        </div>
      </div>
    </section>
  );
}
