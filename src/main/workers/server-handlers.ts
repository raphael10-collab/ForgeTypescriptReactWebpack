// https://github.com/thanhlmm/electron-multiple-tabs/blob/main/server/src/workers/server-handlers.ts

const handlers: Record<string, Function> = {};

// NOTICE: Function in services MUST be ASYNC
handlers["greeting"] = async () => {
  return 'Hello from the other side!';
};

export default handlers;
