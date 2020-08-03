import React, { FC, ReactNode, CSSProperties, useState, useRef, useEffect } from "react";
import { css, cx } from "emotion";
import { fullHeight } from "@jimengio/flex-styles";

interface IMesonGridConfigs {
  sizes: [number, number];
  gap: number;
  /** gap in X direction */
  xGap?: number;
  /** gap in Y direction */
  yGap?: number;
  /** number, or [top, right, bottom, right] */
  padding: number | number[];
}

interface GridItem {
  name: string;
  from: [number, number];
  span: [number, number];
  overwritePosition?: (config: any) => CSSProperties;
  className?: string;
  style?: CSSProperties;
}

let MesonGrid: FC<{ className?: string; configs: IMesonGridConfigs; items: GridItem[]; components: { [k: string]: ReactNode } }> = React.memo((props) => {
  let [contentSize, setContentSize] = useState({
    w: 0,
    h: 0,
  });
  let [finishedLayout, setFinishedLayout] = useState(false);
  let contentRef = useRef<HTMLDivElement>();

  /** Plugins */
  /** Methods */
  /** Effects */

  useEffect(() => {
    let rect = contentRef.current.getBoundingClientRect();
    setContentSize({ w: rect.width, h: rect.height });
    setFinishedLayout(true);
  }, []);

  /** Renderers */

  let configs = props.configs;

  let columnGap = configs.xGap || configs.gap;
  let rowGap = configs.yGap || configs.gap;
  let columnUnit = (contentSize.w + columnGap) / configs.sizes[0] - columnGap;
  let rowUnit = (contentSize.h + rowGap) / configs.sizes[1] - rowGap;

  return (
    <div
      className={cx(styleContainer, props.className)}
      data-area="meson-grid"
      style={{
        padding: Array.isArray(configs.padding) ? configs.padding.map((x) => `${x}px`).join(" ") : configs.padding,
      }}
    >
      <div className={cx(fullHeight, styleContent)} ref={contentRef}>
        {finishedLayout
          ? props.items.map((item, idx) => {
              let left = (columnUnit + columnGap) * item.from[0];
              let top = (rowUnit + rowGap) * item.from[1];
              let width = (columnUnit + columnGap) * item.span[0] - columnGap;
              let height = (rowUnit + rowGap) * item.span[1] - rowGap;

              if (item.from[0] + item.span[0] > configs.sizes[0]) {
                console.warn("succeeded in x direction", item, configs);
              }
              if (item.from[1] + item.span[1] > configs.sizes[1]) {
                console.warn("succeeded in y direction", item, configs);
              }

              return (
                <div className={cx(styleCard, item.className)} key={idx} style={Object.assign({ top, left, width, height }, item.style)}>
                  {props.components[item.name] || (
                    <span className={styleMissing}>
                      No component for {JSON.stringify(item.name)} among {JSON.stringify(Object.keys(props.components))}
                    </span>
                  )}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
});

export default MesonGrid;

let styleContainer = css`
  min-height: 80px;
`;

let styleContent = css`
  position: relative;
`;

let styleCard = css`
  position: absolute;
`;

let styleMissing = css`
  color: hsla(357, 91%, 55%, 1);
`;
