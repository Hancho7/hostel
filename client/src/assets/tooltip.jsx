export const Tooltip = ({ position, content, show }) => (
    <div className="relative cursor-pointer group">
      {show && content && (
        <>
          <span
            className={`${
              position === "top"
                ? "left-1/2 -translate-x-1/2 bottom-[calc(100%+5px)]"
                : ""
            } ${
              position === "bottom"
                ? "left-1/2 translate-x-1/2 top-[calc(100%+5px)]"
                : ""
            } ${
              position === "left"
                ? "left-1/2 -translate-x-1/2 right-[calc(100%+5px)]"
                : ""
            } ${
              position === "right" ? "left-1/2-translate-x-1/2 top-full" : ""
            } absolute group-hover:inline-block inner-block bg-neutral-900 text-white text-xs p-2 whitespace-nowrap rounded`}
          >
            {content}
          </span>
          <span
            className={`${
              position === "top"
                ? "left-1/2-translate-x-1/2 bottom-full w-14 border-l-transparent border-r-transparent border-b-0 border-t-neutral-900"
                : ""
            } ${
              position === "bottom"
                ? "left-1/2 translate-x-1/2 top-full border-l-transparent border-r-transparent border-b-0 border-t-neutral-900"
                : ""
            } ${
              position === "left"
                ? "right-full top-1/2 -translate-y-1/2 border-l-transparent border-r-transparent border-b-0 border-t-neutral-900"
                : ""
            } ${
              position === "right"
                ? "left-full top-1/2 -translate-y-1/2 w-14  border-l-transparent border-r-transparent border-b-0 border-t-neutral-900"
                : ""
            } absolute inline-block`}
          />
        </>
      )}
    </div>
  );