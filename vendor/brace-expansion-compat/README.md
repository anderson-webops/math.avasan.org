# Layout brace-expansion compatibility

`vite-plugin-vue-layouts-next@3.3.1` imports the default export from
`brace-expansion@^3.0.9`. That major is reported vulnerable, while the patched
5.x major exports `expand` by name. This local package supplies only the legacy
default export, delegating all expansion to signed `brace-expansion@5.0.12`.
The root override keeps one compatible module interface for Layouts and
other build tools. Remove it when the plugin supports the patched major directly.
