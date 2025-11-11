import { cn } from "~/lib/utils";

export const LoaderImage = ({
  size,
  className = "",
  color = "#8D182A",
}: {
  size?: string;
  color?: string;
  className?: string;
}) => {
  return (
    <svg
      width="98"
      height="98"
      viewBox="0 0 100 100"
      className={cn("animate-spin", size ?? "size-8")}
      preserveAspectRatio="xMidYMid"
      xmlns="http://www.w3.org/2000/svg"
      style={{ shapeRendering: "auto", display: "block" }}
    >
      <g data-idx="1">
        <g data-idx="2">
          <rect
            fill={color}
            height="12"
            width="2"
            ry=".84"
            rx=".84"
            y="26"
            x="49"
            data-idx="3"
            opacity=".101"
            className={className}
          />
        </g>
        <g data-idx="5">
          <rect
            className={className}
            fill={color}
            height="12"
            width="2"
            ry=".84"
            rx=".84"
            y="26"
            x="49"
            data-idx="6"
            opacity=".192"
            transform="rotate(32.727 50 50)"
          />
        </g>
        <g data-idx="8">
          <rect
            className={className}
            fill={color}
            height="12"
            width="2"
            ry=".84"
            rx=".84"
            y="26"
            x="49"
            data-idx="9"
            opacity=".283"
            transform="rotate(65.455 50 50)"
          />
        </g>
        <g data-idx="11">
          <rect
            className={className}
            fill={color}
            height="12"
            width="2"
            ry=".84"
            rx=".84"
            y="26"
            x="49"
            data-idx="12"
            opacity=".374"
            transform="rotate(98.182 50 50)"
          />
        </g>
        <g data-idx="14">
          <rect
            className={className}
            fill={color}
            height="12"
            width="2"
            ry=".84"
            rx=".84"
            y="26"
            x="49"
            data-idx="15"
            opacity=".465"
            transform="rotate(130.909 50 50)"
          />
        </g>
        <g data-idx="17">
          <rect
            className={className}
            fill={color}
            height="12"
            width="2"
            ry=".84"
            rx=".84"
            y="26"
            x="49"
            data-idx="18"
            opacity=".555"
            transform="rotate(163.636 50 50)"
          />
        </g>
        <g data-idx="20">
          <rect
            className={className}
            fill={color}
            height="12"
            width="2"
            ry=".84"
            rx=".84"
            y="26"
            x="49"
            data-idx="21"
            opacity=".646"
            transform="rotate(-163.636 50 50)"
          />
        </g>
        <g data-idx="23">
          <rect
            className={className}
            fill={color}
            height="12"
            width="2"
            ry=".84"
            rx=".84"
            y="26"
            x="49"
            data-idx="24"
            opacity=".737"
            transform="rotate(-130.909 50 50)"
          />
        </g>
        <g data-idx="26">
          <rect
            className={className}
            fill={color}
            height="12"
            width="2"
            ry=".84"
            rx=".84"
            y="26"
            x="49"
            data-idx="27"
            opacity=".828"
            transform="rotate(-98.182 50 50)"
          />
        </g>
        <g data-idx="29">
          <rect
            className={className}
            fill={color}
            height="12"
            width="2"
            ry=".84"
            rx=".84"
            y="26"
            x="49"
            data-idx="30"
            opacity=".919"
            transform="rotate(-65.455 50 50)"
          />
        </g>
        <g data-idx="32">
          <rect
            className={className}
            fill={color}
            height="12"
            width="2"
            ry=".84"
            rx=".84"
            y="26"
            x="49"
            data-idx="33"
            opacity=".01"
            transform="rotate(-32.727 50 50)"
          />
        </g>
        <g data-idx="35" />
      </g>
    </svg>
  );
};
