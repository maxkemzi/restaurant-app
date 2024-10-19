#!/bin/sh

# Flag to track missing variables
missing_vars=false

# Function to check if an environment variable is set
check_var() {
	var_name=$1
	var_value=$(eval echo "\$$var_name")
	if [ -z "$var_value" ]; then
		echo "Warning: Environment variable $var_name is required."
		missing_vars=true
	fi
}

# Check required environment variables
check_var "DB_PRISMA_URL"

# If any required environment variables are missing, exit with an error
if [ "$missing_vars" = true ]; then
	echo "Error: One or more required environment variables are missing."
	exit 1
fi

npm run db:deploy

npm run db:seed

npm run build

chown -R nextjs:nodejs .next

cp -a ./.next/standalone/. ./

exec su-exec nextjs "$@"
