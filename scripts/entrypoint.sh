#!/usr/bin/env bash
set -Ex

function apply_path {
  envs="${!NEXT_@}"

  for matched_env in $envs; do
    test -n "${!matched_env}" && find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i  "s#APP_$matched_env#${!matched_env}#g"
  done
}

apply_path
echo "Starting Nextjs"
exec "$@"