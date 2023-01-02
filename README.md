# DMARC Report Collector

Cloudflare Email Worker that receives DMARC report emails and agregates them.

This is currently an incomplete work in progress.

# How to Deploy

```sh
wrangler publish --var FALLTHROUGH_ADDR:fallthrough@example.com
```

Then add an email Worker route to `dmarc_report_collector`.

# Disclaimer

This project is not affiliated with or endorsed by Cloudflare.  I am employed by Cloudflare, but this project is being
developed on my personal time.
