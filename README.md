# Hacker News Slash Command for Mixmax

This is an open source Hacker News search Slash Command for Mixmax. It is using the Hacker News search API to generate article suggestions and then implementing the HTML into the email

## Running locally

1. Install using `npm install`
2. Run using `npm start`

To simulate locally how Mixmax calls the typeahead URL (to return a JSON list of typeahead results), run:

```
curl https://localhost:9145/typeahead?text=cats --insecure
```

To simulate locally how Mixmax calls the resolver URL (to return HTML that goes into the email), run:

```
curl https://localhost:9145/resolver?text=cats --insecure
```

## Why do we run it in https locally?

Mixmax slash command APIs are required to be served over https. This is because they are queried directly from the Mixmax client in the browser (using AJAX) that's running on an https domain. Browsers forbid AJAX requests from https domains to call http APIs, for security. So we must run an https server with a locally-signed certificate.

See [here](http://developer.mixmax.com/docs/integration-api-appendix#local-development-error-neterr_insecure_response) for how to fix the **ERR_INSECURE_RESPONSE** error that you might get in Chrome.

## Adding this command to your Developer Mixmax account

Open up the [Mixmax Developer Dashboard](https://app.mixmax.com/dashboard/settings/developer) and click Add Slash Command.
Enter the following inputs:

- Name: Hacker News Search
- Command: hackernews
- Parameter placeholder: [Search]
- Typeahead API URL: https://localhost:9145/typeahead
- Resolver API URL: https://localhost:9145/resolver
