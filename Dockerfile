ARG SOURCE_DATE_EPOCH=0

FROM node:26.5.0-alpine@sha256:e88a35be04478413b7c71c455cd9865de9b9360e1f43456be5951032d7ac1a66 AS build-stage

ARG SOURCE_DATE_EPOCH

WORKDIR /app

ENV CYPRESS_INSTALL_BINARY=0 \
    PUPPETEER_SKIP_DOWNLOAD=true

RUN npm install --global npm@12.0.2 \
    && test "$(node --version)" = "v24.18.1" \
    && test "$(npm --version)" = "12.0.2"

COPY .npmrc package.json package-lock.json ./
COPY front-end/package.json ./front-end/package.json
RUN npm ci --include=optional --strict-allow-scripts

ARG MATH_RELEASE_VERSION
ARG SOURCE_REVISION
ENV MATH_RELEASE_VERSION=$MATH_RELEASE_VERSION
ENV SOURCE_REVISION=$SOURCE_REVISION

COPY . .
RUN node -e ' \
      const [declaredVersion, revision] = process.argv.slice(1); \
      const packageVersion = require("./package.json").version; \
      if (declaredVersion.replace(/^v/, "") !== packageVersion \
        || !/^[0-9a-f]{40}$/.test(revision)) process.exit(1); \
    ' "$MATH_RELEASE_VERSION" "$SOURCE_REVISION" \
    && classroom_usage_enabled="$(node -p \
      "require('./front-end/src/config/classroom-usage.json').classroomUsageEnabled")" \
    && case "$classroom_usage_enabled" in \
      true) usage_proxy_mode=enabled ;; \
      false) usage_proxy_mode=disabled ;; \
      *) \
        echo "classroomUsageEnabled must be true or false." >&2; \
        exit 1 \
        ;; \
    esac \
    && cp \
      "nginx/classroom-usage-${usage_proxy_mode}.inc" \
      /tmp/classroom-usage.inc \
    && npm run -w front-end build

FROM nginxinc/nginx-unprivileged:stable-alpine@sha256:44e36330f74d4f3a1d4e222acca9e23b401fb87811a7597024502bb759c4dd49 AS production-stage

RUN test -s /etc/ssl/certs/ca-certificates.crt

COPY --from=build-stage /app/front-end/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /tmp/classroom-usage.inc /etc/nginx/conf.d/classroom-usage.inc

USER 101

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD wget --quiet --spider http://127.0.0.1:8080/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
