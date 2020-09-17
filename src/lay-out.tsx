import React, { CSSProperties, ReactNode } from "react";
import produce from "immer";
import { center, column, columnParted, expand, row, rowCenter, rowMiddle, rowParted, Space } from "@jimengio/flex-styles";
import { css, cx } from "emotion";

let addGapIter = (acc: any[], n: number, f: (x: number) => any, xs: any[]): any[] => {
  if (xs.length === 0) {
    return acc;
  } else {
    let nextAcc = acc.length === 0 ? [xs[0]] : acc.concat([f(n), xs[0]]);
    return addGapIter(nextAcc, n + 1, f, xs.slice(1));
  }
};

let addGap = (f: (x: number) => any, xs: any[]) => {
  return addGapIter([], 0, f, xs);
};

let genGapFn = (rule: FlexRule | ListRule) => {
  return (n: number) => {
    if (["row", "row-parted", "row-middle", "row-center"].includes(rule.layout)) {
      return <Space width={rule.gap} />;
    }
    if (rule.layout === "flow") {
      return <Space width={rule.gap || rule.gaps[0]} />;
    }
    return "TODO GAP";
  };
};

let styleNoMatch = css`
  outline: 1px solid red;
`;

type LayoutNames = "column" | "row" | "row-parted" | "column-parted" | "center" | "row-center" | "column-center" | "row-middle" | "flow";

let getLayoutClassName = (layoutName: LayoutNames): string => {
  switch (layoutName) {
    case "row":
      return row;
    case "column":
      return column;
    case "center":
      return center;
    case "row-middle":
      return rowMiddle;
    case "row-center":
      return rowCenter;
    case "row-parted":
      return rowParted;
    case "column-parted":
      return columnParted;
    case "flow":
      return styleEmpty;
    default:
      return styleNoMatch;
  }
};

let styleEmpty = css``;

interface FlexRule {
  type: "flex";
  layout: LayoutNames;
  className?: string;
  style?: CSSProperties;
  gap?: number;
  gaps?: [number, number];
  items: (FlexRule | ItemRule)[];
}

interface ItemRule {
  type: "item";
  className?: string;
  fill: any;
}

interface ListRule {
  type: "list";
  layout: LayoutNames;
  size: number;
  className?: string;
  style?: CSSProperties;
  gap?: number;
  gaps?: [number, number];
}

let renderFillItem = (rule: ItemRule, childMap: ChildrenMap, options: object) => {
  let item = childMap[rule.fill];
  return item(css(flex, rule.className));
};

let flex = css`
  flex: 1;
`;

let range = (x: number) => {
  return Array.from({ length: 20 }, (x, i) => i);
};

type ItemRenderer = (idx: number, className: string, options: object) => ReactNode;

let renderLayoutList = (rule: ListRule, itemRenderer: ItemRenderer, options: object) => {
  return (
    <div className={cx(getLayoutClassName(rule.layout), rule.className)}>
      {addGap(
        genGapFn(rule),
        range(rule.size).map((idx) => {
          let customClassName = flex; // TODO
          return itemRenderer(idx, customClassName, options);
        })
      )}
    </div>
  );
};

type ChildrenMap = Record<string, (className: string) => ReactNode>;

let renderLayoutFlex = (rule: FlexRule, childMap: ChildrenMap, options: object) => {
  return (
    <div className={cx(getLayoutClassName(rule.layout), rule.className)}>
      {addGap(
        genGapFn(rule),
        rule.items.map((item) => {
          let customClassName = flex; // TODO
          let newItem = produce(item, (draft) => {
            draft.className = css(draft.className, customClassName);
          });
          return layOut(newItem, childMap, options);
        })
      )}
    </div>
  );
};

let layOut = (rule: FlexRule | ItemRule | ListRule, childMap: ChildrenMap | ItemRenderer, options: object = {}) => {
  if (rule.type === "flex") {
    return renderLayoutFlex(rule as FlexRule, childMap as ChildrenMap, {});
  }
  if (rule.type === "list") {
    return renderLayoutList(rule as ListRule, childMap as ItemRenderer, options);
  }

  if (rule.type === "item") {
    return renderFillItem(rule, childMap as ChildrenMap, options);
  }

  return <div>TODO unknown rule: {JSON.stringify(rule)}</div>;
};
