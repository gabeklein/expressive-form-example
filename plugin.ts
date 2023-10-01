import babel from '@babel/core';
import { Options as TransformOptions } from '@expressive/babel-preset-react';
import path from 'path';
import { Plugin } from 'rollup';
import { ViteDevServer } from 'vite';

const CWD = process.cwd();
const PREFIX = "\0virtual:";
const relative = path.relative.bind(null, CWD);

/**
 * Rollup plugin but also may be used in
 * [Vite](https://vitejs.dev/guide/api-plugin.html#rollup-plugin-compatibility).
 * 
 * Vite support includes support for hot module reloading.
 */
interface PluginCompat extends Plugin {
  name: string;
  enforce?: "pre" | "post";
  configureServer?(server: any): void;
  handleHotUpdate?(ctx: any): void;
}

export interface Options extends TransformOptions {
  test?: RegExp | ((uri: string, code: string) => boolean);
}

function jsxPlugin(options?: Options): PluginCompat {
  let test = options && options.test;

  if(!test)
    test = (id: string) => id.endsWith(".jsx");
  else if(test instanceof RegExp){
    const regex = test;
    test = (id: string) => regex.test(id);
  }

  const shouldTransform = test;
  const CACHE = new Map<string, TransformResult>();

  /**
   * In the event a vite development server is running, we
   * can use it to reload the module when the CSS changes.
   */
  let server: ViteDevServer

  return {
    name: "expressive-jsx",
    enforce: "pre",
    configureServer(_server){
      server = _server;
    },
    resolveId(id, importer){
      if(id === "__EXPRESSIVE_CSS__")
        return '\0virtual:' + relative(importer) + ".css";
    },
    load(id: string) {
      if(id.startsWith(PREFIX))
        return CACHE.get(id.slice(9, -4))!.css;
    },
    async transform(source, id){
      if(/node_modules/.test(id) || !shouldTransform(id, source))
        return;

      id = relative(id);

      const cached = CACHE.get(id);
      const result = await transform(id, source, options);

      if(server){
        const { css } = result;

        if(cached && css !== cached.css){
          const module = server.moduleGraph.getModuleById("\0virtual:" + id + ".css");
  
          if(module)
            server.reloadModule(module);
        }
      }
  
      CACHE.set(id, result);

      return result;
    }
  }
}

export default jsxPlugin;

interface TransformResult {
  code: string;
  map: any;
  css: string;
}

async function transform(id: string, input: string, options?: Options){
  let css = "";

  const result = await babel.transformAsync(input, {
    root: CWD,
    filename: id,
    sourceFileName: id.split("?")[0],
    sourceMaps: true,
    parserOpts: {
      sourceType: "module",
      allowAwaitOutsideFunction: true
    },
    generatorOpts: {
      decoratorsBeforeExport: true
    },
    presets: [
      ["@expressive/babel-preset-react", {
        output: "jsx",
        cssModule: false,
        printStyle: "pretty",
        ...options,
        extractCss(text: string){
          css = text;
        }
      }]
    ]
  });

  if(!result)
    throw new Error("No result");

  const code = result.code + `\nimport "__EXPRESSIVE_CSS__";`;

  return <TransformResult> {
    code,
    css,
    map: result.map
  }
}