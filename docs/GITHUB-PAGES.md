# Публикация на GitHub Pages

Сайт собирается в статический экспорт (папка `out`) и выкладывается через GitHub Actions.

## Что уже настроено

1. **next.config.mjs** — включён `output: 'export'` и `basePath` для адреса вида `https://<user>.github.io/<repo>/`.
2. **Workflow** `.github/workflows/deploy-pages.yml` — при push в ветку `main` запускается сборка и деплой.

## Шаги в репозитории на GitHub

1. Откройте репозиторий → **Settings** → **Pages** (в блоке "Code and automation").
2. В разделе **Build and deployment** → **Source** выберите **GitHub Actions**.
3. Запушьте ветку `main` (или запустите workflow вручную: **Actions** → **Deploy to GitHub Pages** → **Run workflow**).

После успешного запуска сайт будет доступен по адресу:

- **Project site:** `https://<ваш-username>.github.io/<имя-репозитория>/`

Если репозиторий называется, например, `Java-Interview-Landing-Page`, то URL будет:  
`https://<username>.github.io/Java-Interview-Landing-Page/`.

## Если основная ветка не `main`

В файле `.github/workflows/deploy-pages.yml` в блоке `on.push.branches` замените `main` на нужную ветку (например, `master`).

## Локальная проверка сборки под GitHub Pages

Чтобы собрать проект так же, как для Pages (с тем же `basePath`):

```bash
GITHUB_PAGES_BASE_PATH=/имя-репозитория pnpm build
```

Просмотр результата (статичные файлы в `out/`):

```bash
npx serve out
```

Откройте в браузере `http://localhost:3000/имя-репозитория/`.
