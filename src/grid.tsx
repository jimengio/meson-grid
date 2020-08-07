import React, { FC, ReactNode, CSSProperties, useState, useRef, useEffect } from "react";
import { css, cx } from "emotion";
import { fullHeight } from "@jimengio/flex-styles";
import useComponentSize from "@rehooks/component-size";

interface IMesonGridConfigs {
  sizes: [number, number];
  gap: number;
  /** gap in X direction */
  xGap?: number;
  /** gap in Y direction */
  yGap?: number;
}

export interface IMesonGridItem {
  name: string;
  from: [number, number];
  span: [number, number];
  /** custom style */
  calculateCustomStyle?: (
    configs: IMesonGridConfigs,
    containerSize: { width: number; height: number },
    item: IMesonGridItem,
    generatedStyle: CSSProperties
  ) => CSSProperties;
  className?: string;
  style?: CSSProperties;
}

let MesonGrid: FC<{
  className?: string;
  style?: CSSProperties;
  configs: IMesonGridConfigs;
  items: IMesonGridItem[];
  /** show guidelines, do not enabled this in production */
  showGuideLines?: boolean;
  guideLinesClassName?: string;
  components: { [k: string]: ReactNode };
}> = React.memo((props) => {
  let contentRef = useRef<HTMLDivElement>();
  let contentSize = useComponentSize(contentRef);

  /** Plugins */
  /** Methods */
  /** Effects */

  /** Renderers */

  let configs = props.configs;

  let columnGap = configs.xGap || configs.gap;
  let rowGap = configs.yGap || configs.gap;
  let columnUnit = (contentSize.width + columnGap) / configs.sizes[0] - columnGap;
  let rowUnit = (contentSize.height + rowGap) / configs.sizes[1] - rowGap;

  let renderGrids = () => {
    return props.items.map((item, idx) => {
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

      let computedStyle: CSSProperties = Object.assign({ top, left, width, height }, item.style);

      if (item.calculateCustomStyle != null) {
        computedStyle = item.calculateCustomStyle(props.configs, contentSize, item, computedStyle);
      }

      return (
        <div className={cx(styleCard, item.className)} key={idx} style={computedStyle}>
          {props.components[item.name] || (
            <span className={styleMissing}>
              No component for {JSON.stringify(item.name)} among {JSON.stringify(Object.keys(props.components))}
            </span>
          )}
        </div>
      );
    });
  };

  let renderDebugArea = () => {
    return (
      <>
        {Array.from({ length: configs.sizes[0] }, (_, idx) => {
          let left = (columnUnit + columnGap) * idx;
          let top = 0;
          let width = columnUnit;
          let height = contentSize.height;
          return (
            <div key={`h-${idx}`} style={{ left, top, width, height }} className={cx(styleDebug, props.guideLinesClassName, styleYDebug)}>
              {idx}
            </div>
          );
        })}
        {Array.from({ length: configs.sizes[1] }, (_, idx) => {
          let left = 0;
          let top = (rowUnit + rowGap) * idx;
          let width = contentSize.width;
          let height = rowUnit;
          return (
            <div key={`w-${idx}`} style={{ left, top, width, height }} className={cx(styleDebug, props.guideLinesClassName, styleXDebug)}>
              {idx}
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className={cx(styleContainer, props.className)} style={props.style} data-area="meson-grid">
      <div className={cx(fullHeight, styleContent)} ref={contentRef}>
        {contentSize.width ? (
          <>
            {renderGrids()}
            {props.showGuideLines ? renderDebugArea() : null}
          </>
        ) : null}
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

let styleDebug = css`
  border: 1px dashed hsla(220, 100%, 50%, 0.4);
  color: hsla(220, 100%, 50%, 0.2);
  position: absolute;
  pointer-events: none;
`;

let styleXDebug = css`
  border-width: 1px 0px;
`;

let styleYDebug = css`
  border-width: 0px 1px;
`;
