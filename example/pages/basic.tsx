import React, { FC } from "react";
import { css, cx } from "emotion";
import { DocDemo } from "@jimengio/doc-frame";
import MesonGrid from "../../src/grid";
import { fullHeight } from "@jimengio/flex-styles";

enum EGridItem {
  a = "a",
  b = "b",
}

let PageBasic: FC<{ className?: string }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div className={props.className}>
      <DocDemo title="Basic">
        <MesonGrid
          className={styleArea}
          configs={{ sizes: [6, 6], gap: 12, padding: [12, 16] }}
          items={[
            { name: EGridItem.a, from: [0, 0], span: [2, 1] },
            { name: EGridItem.a, from: [2, 0], span: [4, 1] },
            { name: EGridItem.b, from: [2, 1], span: [2, 2] },
            { name: EGridItem.b, from: [0, 2], span: [2, 2] },
            { name: EGridItem.b, from: [0, 2], span: [2, 2] },
          ]}
          components={{
            [EGridItem.a]: (
              <div className={fullHeight} style={{ backgroundColor: `hsl(0,90%,90%)` }}>
                A
              </div>
            ),
            [EGridItem.b]: (
              <div className={fullHeight} style={{ backgroundColor: `hsl(200,90%,90%)` }}>
                B
              </div>
            ),
          }}
        />
      </DocDemo>
    </div>
  );
});

export default PageBasic;

let styleArea = css`
  height: 400px;

  box-shadow: 0 0 1px hsl(0, 0%, 50%);
  * {
    box-shadow: 0 0 1px hsl(0, 0%, 50%);
  }
`;
