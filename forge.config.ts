import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
import { MakerDeb } from "@electron-forge/maker-deb";
import { MakerRpm } from "@electron-forge/maker-rpm";
import { WebpackPlugin } from "@electron-forge/plugin-webpack";

import { mainConfig } from "./webpack.main.config";
import { rendererConfig } from "./webpack.renderer.config";

const config: ForgeConfig = {
  packagerConfig: {
    appBundleId: "com.github.jiafeitech.jiaweb",
    executableName: "jiaweb",
    name: "JIΛweb",
    icon: "./images/icons/icon",
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({}),
    new MakerZIP({}, ["darwin"]),
    new MakerRpm({
      options: {
        icon: "./images/icons/512x512.png",
      },
    }),
    new MakerDeb({
      options: {
        icon: "./images/icons/512x512.png",
      },
    }),
  ],
  plugins: [
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: "./src/renderer/index.html",
            js: "./src/renderer/main.tsx",
            name: "main_window",
            preload: {
              js: "./src/preload/preload.ts",
            },
          },
        ],
      },
    }),
  ],
};

export default config;
