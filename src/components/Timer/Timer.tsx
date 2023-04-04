import React, { FunctionComponent } from "react";

export const TimerIcon: FunctionComponent<{
  duration: number;
  action?: () => void;
}> = ({ duration, action }) => {
  setTimeout(() => {
    action && action();
  }, duration * 1000);

  return (
    <div
      className="timer-icon"
      style={{ "--size": 30, "--duration": duration } as React.CSSProperties}
    >
      <div className="timer-icon-mask"></div>
    </div>
  );
};
