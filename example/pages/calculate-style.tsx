import React, { FC, useState } from "react";
import { css, cx } from "emotion";
import { DocDemo, DocSnippet, DocBlock } from "@jimengio/doc-frame";
import MesonGrid from "../../src/grid";
import { fullHeight } from "@jimengio/flex-styles";

enum EGridItem {
  a = "a",
  b = "b",
}

let PageCalculateStyle: FC<{ className?: string }> = React.memo((props) => {
  let [showLines, setShowLines] = useState(false);

  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */

  let elementA = (
    <div className={fullHeight} style={{ backgroundColor: `hsl(0,90%,90%)` }}>
      A
    </div>
  );

  let elementB = (
    <div className={fullHeight} style={{ backgroundColor: `hsl(200,90%,90%)` }}>
      B
    </div>
  );

  return (
    <div className={props.className}>
      <DocDemo title="Basic" className={styleDemo}>
        <DocBlock content={content} />
        <DocSnippet code={code} />
        <div>
          <button
            onClick={() => {
              setShowLines(!showLines);
            }}
          >
            Toggle guidelines
          </button>
        </div>
        <MesonGrid
          className={styleArea}
          configs={{ sizes: [6, 6], gap: 12 }}
          items={[
            { name: EGridItem.a, from: [0, 0], span: [2, 2] },
            { name: EGridItem.a, from: [2, 0], span: [4, 1] },
            { name: EGridItem.b, from: [2, 1], span: [2, 2] },
            { name: EGridItem.b, from: [0, 2], span: [2, 2] },
            {
              name: EGridItem.b,
              from: [2, 3],
              span: [2, 2],
              calculateCustomStyle: (configs, containerSize, item, genStyle) => {
                return { left: 340, top: 240, width: 300, height: 100 };
              },
            },
          ]}
          components={{
            [EGridItem.a]: elementA,
            [EGridItem.b]: elementB,
          }}
          showGuideLines={showLines}
        />
      </DocDemo>
    </div>
  );
});

export default PageCalculateStyle;

let styleArea = css`
  height: 400px;
  padding: 12px 16px;
`;

let code = `
{
  name: EGridItem.b,
  from: [2, 3],
  span: [2, 2],
  calculateCustomStyle: (configs, containerSize, item, genStyle) => {
    return { left: 340, top: 240, width: 300, height: 100 };
  },
},
`;

let styleDemo = css`
  max-width: unset;
`;

let content = `
特殊的布局需要通过 calculateCustomStyle 自行定义.
`;
