/**
 * This is the entry point for developing and debugging.
 * This file is not bundled with the block during the build process.
 */
import React from "react";
import ReactDOM from "react-dom";

// eslint-disable-next-line import/no-extraneous-dependencies -- TODO update config properly
import { MockBlockDock } from "mock-block-dock";

import Component from "./index";

const node = document.getElementById("app");

const emojiName = (new URL(location)).searchParams.get("emojiName") || "sweat_smile"

const App = () => (
  <MockBlockDock>
    <Component entityId="test-block-1" emojiName={emojiName} />
  </MockBlockDock>
);

ReactDOM.render(<App />, node);
