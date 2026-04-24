import React, { forwardRef, CSSProperties } from "react";
import { SpacingToken } from "../types";
import styles from "./RevealFx.module.scss";
import { Flex } from ".";

interface RevealFxProps extends React.ComponentProps<typeof Flex> {
  children: React.ReactNode;
  speed?: "slow" | "medium" | "fast";
  delay?: number;
  revealedByDefault?: boolean;
  translateY?: number | SpacingToken;
  trigger?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const speedToDuration = (speed: RevealFxProps["speed"]) => {
  switch (speed) {
    case "fast":
      return "0.6s";
    case "slow":
      return "1.4s";
    default:
      return "1s";
  }
};

const RevealFx = forwardRef<HTMLDivElement, RevealFxProps>(
  (
    {
      children,
      speed = "medium",
      delay = 0,
      revealedByDefault = false,
      translateY,
      trigger,
      style,
      className,
      ...rest
    },
    ref,
  ) => {
    let stateClass = "";
    if (trigger === false) {
      stateClass = styles.hidden;
    } else if (trigger === true || revealedByDefault) {
      stateClass = styles.revealed;
    }

    const revealStyle: CSSProperties = {
      ["--reveal-duration" as string]: speedToDuration(speed),
      ["--reveal-delay" as string]: `${delay}s`,
      ...style,
    };

    return (
      <Flex
        fillWidth
        horizontal="center"
        ref={ref}
        style={revealStyle}
        className={`${styles.revealFx} ${stateClass} ${className || ""}`}
        {...rest}
      >
        {children}
      </Flex>
    );
  },
);

RevealFx.displayName = "RevealFx";
export { RevealFx };
