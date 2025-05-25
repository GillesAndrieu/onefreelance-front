#!/bin/sh
for i in $(env | grep VITE_)
do
    key=$(echo $i | cut -d '=' -f 1)
    value=$(echo $i | cut -d '=' -f 2-)
    echo $key=$value

    # sed All files
    find /usr/share/nginx/html -type f -name '*.js' -exec sed -i "s|ENV_${key}|${value}|g" '{}' +
done
echo 'done'