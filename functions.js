/** Playgrounds SAM infrastructure stub; future Invite can relay pass/boom events. */
export default { async fetch(request) { return Response.json({ ok: true, name: "pg-hotpotato", path: new URL(request.url).pathname }); } };
/** Optional Playgrounds stub. */
export default {
  async fetch(request) {
    return Response.json({ ok: true, name: "pg-hotpotato", path: new URL(request.url).pathname });
  },
};
