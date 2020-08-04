## Meson Grid

> Simplified React Grid based on JSON configurations.

http://fe.jimu.io/meson-grid/#/

### Usage

![](https://img.shields.io/npm/v/@jimengio/meson-grid.svg?style=flat-square)

```bash
yarn add @jimengio/meson-grid
```

```tsx
import { MesonGrid } from "@jimengio/meson-grid";

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
/>;
```

### Workflow

https://github.com/jimengio/ts-workflow

### License

MIT
