import React, { useEffect, useState } from "react";
import { animated, Transition, useSpring, useTransition } from "react-spring";
import { transform } from "typescript";
import "./Switch.css";

interface ArmProps {
  rotation: number;
  color: string;
  ballColor: string;
  clickCallback: () => void;
  index: number;
  selection: number;
}
function Arm({
  rotation,
  color,
  ballColor,
  clickCallback,
  index,
  selection,
}: ArmProps) {
  const styles = useSpring({
    from: { rotateZ: 0 },
    to: { rotateZ: rotation },
  });

  const [ballStyles, api] = useSpring(() => ({
    translateX: 0,
    config: {
      tension: 500,
    },
  }));
  useEffect(() => {
    if (index === selection) {
      api.start({ translateX: 14, delay: 80 });
    } else {
      api.start({ translateX: 0 });
    }
  }, [index, selection, api]);

  return (
    <>
      <animated.div
        className="switch-arm"
        style={{ ...styles, backgroundColor: color }}
        onClick={clickCallback}
      ></animated.div>
      <animated.div
        className="switch-ball"
        style={{
          ...styles,
          ...ballStyles,
          opacity: ballStyles.translateX.to((v) => (v < 1 ? 0 : 1)),
          backgroundColor: ballColor,
        }}
      />
    </>
  );
}

interface SwitchProps {
  optionCount: number;
  colors?: Record<string, string>[];
  onChange?: (val: number) => void;
  styles?: React.CSSProperties;
}

function Switch({ optionCount, colors, onChange, styles }: SwitchProps) {
  const [selection, setSelection] = useState(0);
  useEffect(() => {
    if (onChange) {
      onChange(selection);
    }
  }, [selection]);
  useEffect(() => {
    if (selection >= optionCount) setSelection(optionCount - 1);
  }, [selection, optionCount]);

  const optionsArr = Array.from(
    { length: optionCount },
    (item, index) => index
  );

  const angle = 360 / optionCount;
  const { armColor, ballColor } = colors
    ? {
        armColor: "#eee",
        ballColor: "#fff",
        ...colors[selection % colors.length],
      }
    : { armColor: "#eee", ballColor: "#fff" };

  const handleClick = () => {
    setSelection((prev) => (prev + 1) % optionCount);
  };

  const armProps = {
    color: armColor,
    ballColor: ballColor,
    clickCallback: handleClick,
  };

  return (
    <div className="switch" style={{ ...styles }}>
      <Arm key="base" index={0} rotation={0} selection={-1} {...armProps} />
      {optionsArr.map((n) => (
        <Arm
          key={optionCount - n}
          index={optionCount - n - 1}
          rotation={angle * n}
          selection={selection}
          {...armProps}
        />
      ))}
    </div>
  );
}

export default Switch;

// hi thas dumb
