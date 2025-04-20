# Cinelog

# Deploying to Supabase Self Hosted
1. Use the Supabase CLI to push database changes: `pnpm dlx supabase@beta db push --db-url DB_URL_GOES_HERE`
2. If you have updated the config.toml, you will need to establish how to propogate that change to the containers. It is usually through environment variables. [This page](https://supabase.com/docs/guides/self-hosting) in the docs explains the config appraoch for a number of self hosted elements, like auth. NOTE: You may need to update the docker-compose.yml to add the environment variables to the relevant container


