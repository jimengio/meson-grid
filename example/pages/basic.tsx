import React, { FC, useState } from "react";
import { css, cx } from "emotion";
import { DocDemo, DocSnippet, DocBlock } from "@jimengio/doc-frame";
import MesonGrid from "../../src/grid";
import { fullHeight } from "@jimengio/flex-styles";

enum EGridItem {
  a = "a",
  b = "b",
}

let PageBasic: FC<{ className?: string }> = React.memo((props) => {
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
            { name: EGridItem.b, from: [2, 3], span: [2, 2] },
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

export default PageBasic;

let styleArea = css`
  height: 400px;
  padding: 12px 16px;
`;

let styleDemo = css`
  max-width: unset;
`;

let code = `
<MesonGrid
  className={styleArea}
  configs={{
    // 设定栅格宽/高的大小
    sizes: [6, 6],
    // 也可以用 xGap, yGap 分别设定
    gap: 12,
  }}
  // 位置处理
  items={[
    { name: "a", from: [0, 0], span: [2, 2] },
    { name: "a", from: [2, 0], span: [4, 1] },
    { name: "b", from: [2, 1], span: [2, 2] },
    { name: "b", from: [0, 2], span: [2, 2] },
    { name: "b", from: [2, 3], span: [2, 2] },
  ]}
  // 注册组件
  components={{
    a: elementA,
    b: elementB,
  }}
  // 开发环境可以打开参考线方便调试
  showGuideLines={showLines}
/>
`;

let content = `
MesonGrid 提供简单的表格布局的方案, 通过配置位置将组件渲染在界面上.
`;
