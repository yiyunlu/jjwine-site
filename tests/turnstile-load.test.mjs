import assert from "node:assert/strict";
import test from "node:test";

function installFakeDom() {
  const scripts = [];
  const createScript = () => {
    const listeners = {};
    let fired = false;
    const script = {
      dataset: {},
      addEventListener(type, fn) { (listeners[type] ??= []).push(fn); },
      dispatch(type) {
        if (fired) return;
        fired = true;
        for (const fn of listeners[type] ?? []) fn();
      },
      remove() {
        const i = scripts.indexOf(script);
        if (i >= 0) scripts.splice(i, 1);
      },
    };
    return script;
  };
  globalThis.window = {};
  globalThis.document = {
    createElement: createScript,
    head: { appendChild: (script) => { scripts.push(script); } },
    querySelector: (selector) => {
      assert.equal(selector, "script[data-turnstile]");
      return scripts.find((script) => "turnstile" in script.dataset) ?? null;
    },
  };
  return scripts;
}

const within = (promise, ms = 500) =>
  Promise.race([promise, new Promise((_, reject) => setTimeout(() => reject(new Error("timed out: promise never settled")), ms))]);

let instance = 0;
const freshLoader = async () => (await import(`../app/turnstile.ts?run=${instance++}`)).loadTurnstile;

test("a script error rejects, and the next call retries with a new script", async () => {
  const scripts = installFakeDom();
  const loadTurnstile = await freshLoader();
  const first = loadTurnstile();
  assert.equal(scripts.length, 1);
  scripts[0].dispatch("error");
  await assert.rejects(within(first), { message: "turnstile" });

  const second = loadTurnstile();
  assert.equal(scripts.length, 1, "exactly one script node is live for the retry");
  const api = { render() { return "id"; }, reset() {}, remove() {} };
  globalThis.window.turnstile = api;
  scripts[0].dispatch("load");
  assert.equal(await within(second), api);
});

test("a load without window.turnstile rejects, and the next call retries", async () => {
  const scripts = installFakeDom();
  const loadTurnstile = await freshLoader();
  const first = loadTurnstile();
  scripts[0].dispatch("load");
  await assert.rejects(within(first), { message: "turnstile" });

  const second = loadTurnstile();
  assert.equal(scripts.length, 1, "exactly one script node is live for the retry");
  const api = { render() { return "id"; }, reset() {}, remove() {} };
  globalThis.window.turnstile = api;
  scripts[0].dispatch("load");
  assert.equal(await within(second), api);
});
