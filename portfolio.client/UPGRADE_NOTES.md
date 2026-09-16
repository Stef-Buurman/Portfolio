# Angular 22 upgrade notes

This project has been aligned to Angular 22.1.6.

## Required local tooling

Angular 22 requires a supported Node.js version. Use Node 22.22.3+ (or another version allowed by Angular 22).
The project contains `.nvmrc` with `22.22.3`.

## Clean install after this upgrade

Because the previous install mixed Angular 19/20/21/22 packages, do not reuse the old `node_modules`.

```powershell
cd C:\Users\Stef\source\repos\Portfolio
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force portfolio.client\node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue
npm install
npm run client:build
npm run client:test
npm audit
```

Do **not** use `npm audit fix --force` blindly. A forced fix can jump major versions and break Angular compatibility.

## Typed API runtime

All active frontend HTTP traffic now goes through `TypedApiService`, which uses
`typedapi-client-helpers` and its Fetch runtime. `AuthorizationService` remains the
application-facing authorization adapter so existing components do not need to know
about transport details.

`npm run generate:api` is configured for a future generated-client workflow. When the
backend serves a TypedApi-compatible OpenAPI document, generated endpoint functions
can replace the thin handwritten endpoint methods without changing the rest of the UI.

## Package cleanup

Removed from the client dependency list:
- `jest-editor-support`
- `run-script-os`
- Jest/Mocha type packages that were not used
- direct Sass dependency (Angular build tooling provides the supported Sass toolchain)

Aligned:
- Angular framework packages: 22.1.6
- Angular Material/CDK: 22.1.6
- Angular CLI/build tooling: 22.1.6
- TypeScript: 6.0.x
- ngx-toastr: 20.0.5
