import queryString from "query-string";

type Id = string;

function switchPath(x: string) {
  location.hash = `#${x}`;
}

function qsStringify(queries: { [k: string]: any }) {
  return queryString.stringify(queries, { arrayFormat: "bracket" });
}

// generated

// Generated with router-code-generator@0.2.7

export let genRouter = {
  calculateStyle: {
    name: "calculate-style",
    raw: "calculate-style",
    path: () => `/calculate-style`,
    go: () => switchPath(`/calculate-style`),
  },
  $: {
    name: "home",
    raw: "",
    path: () => `/`,
    go: () => switchPath(`/`),
  },
};

/** Deprecating, use GenRouterTypeTree["next"] instead */
export type GenRouterTypeMain = GenRouterTypeTree["next"];

export interface GenRouterTypeTree {
  next: GenRouterTypeTree["calculateStyle"] | GenRouterTypeTree["$"];
  calculateStyle: {
    name: "calculate-style";
    params: {};
    query: {};
    next: null;
  };
  $: {
    name: "home";
    params: {};
    query: {};
    next: null;
  };
}
