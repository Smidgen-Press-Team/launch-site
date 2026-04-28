build:
	pnpm build

deploy:
	pnpm dlx wrangler pages deploy ./dist --project-name smidgen-launch-site

release: build deploy
