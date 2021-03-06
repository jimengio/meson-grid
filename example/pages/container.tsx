import React, { FC } from "react";
import { css, cx } from "emotion";
import { fullscreen, row, expand } from "@jimengio/flex-styles";

import { HashRedirect, findRouteTarget } from "@jimengio/ruled-router/lib/dom";
import { genRouter, GenRouterTypeMain } from "controller/generated-router";
import { ISidebarEntry, DocSidebar } from "@jimengio/doc-frame";
import PageBasic from "./basic";
import PageCalculateStyle from "./calculate-style";

let items: ISidebarEntry[] = [
  {
    title: "Basic",
    path: genRouter.$.name,
  },
  {
    title: "Calculate Styles",
    path: genRouter.calculateStyle.name,
  },
];

const renderChildPage = (routerTree: GenRouterTypeMain) => {
  switch (routerTree?.name) {
    case "home":
      return <PageBasic />;
    case "calculate-style":
      return <PageCalculateStyle />;
    default:
      return <HashRedirect to={genRouter.$.path()} noDelay />;
  }

  return <div>NOTHING</div>;
};

let onSwitchPage = (path: string) => {
  let target = findRouteTarget(genRouter, path);
  if (target != null) {
    target.go();
  }
};

let Container: FC<{ router: GenRouterTypeMain }> = React.memo((props) => {
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div className={cx(fullscreen, row, styleContainer)}>
      <DocSidebar
        title="Meson Grid"
        currentPath={props.router.name}
        onSwitch={(item) => {
          onSwitchPage(item.path);
        }}
        items={items}
      />
      <div className={cx(expand, styleBody)}>{renderChildPage(props.router)}</div>
    </div>
  );
});

export default Container;

const styleContainer = css``;

let styleBody = css`
  padding: 16px;
`;
