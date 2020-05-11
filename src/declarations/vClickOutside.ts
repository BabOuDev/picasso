declare module "v-click-outside" {
  function func(): void;
  namespace func {} // This is a hack to allow ES6 wildcard imports
  export = func;
}
