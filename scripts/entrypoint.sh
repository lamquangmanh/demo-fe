#!/bin/bash
set -e

echo "[entrypoint] Building Next.js app at runtime with injected envs..."
echo "NEXT_PUBLIC_GRAPHQL_ENDPOINT = $NEXT_PUBLIC_GRAPHQL_ENDPOINT"

# Build app with current env (injected by K8s)
yarn build

echo "[entrypoint] Starting app..."
exec npm run start


#!/usr/bin/env bash
# set -Ex

# function apply_path {
#   envs="${!NEXT_@}"

#   for matched_env in $envs; do
#     test -n "${!matched_env}" && find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i  "s#$matched_env#${!matched_env}#g"
#   done
# }

# apply_path

# # Build Next.js app at runtime using the injected env vars
# yarn build

# echo "Starting Nextjs"
# exec "$@"

# --------------------------