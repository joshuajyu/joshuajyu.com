# Hello!

## [^1] Welcome

This is the GitHub repository for my <a href="https://joshuajyu.com" target="_blank">personal webpage</a>. It started off as just a static GitHub pages deployment with a little bit of HTML and CSS, but is now a <a href="https://nextjs.org" target="_blank">Next.js</a> app. The development of this website is essentially my excuse to spend time learning about the latest in web development.

## [^2] Deployment

The application is fully <a href="https://www.docker.com" target="_blank">Docker</a>-ized with an <a href="https://github.com/nginx-proxy/nginx-proxy" target="_blank">nginx</a> reverse proxy in front of it, secured with <a href="https://github.com/nginx-proxy/acme-companion" target="_blank">Let's Encrypt</a>. These (the application, reverse proxy, and nginx-letsencrypt) containers are orchestrated together with <a href="https://docs.docker.com/compose/" target="_blank">Docker Compose</a>.

I use <a href="https://www.cloudflare.com/en-ca/" target="_blank">Cloudflare</a> as a DNS provider and domain name registry, and I also use their proxy service for DDOS protection.

The entire web application is hosted on a Amazon EC2 `t4g.nano` instance running Debian, which costs around $2 CAD a month.

## [^3] Changelog

| Date Modified | Description                                             |
| ------------- | ------------------------------------------------------- |
| Jun 6 2024    | Created this repository.<br> Hello World!               |
| Jun 8 2024    | Updated index.html                                      |
| Sep 15 2024   | Updated index.html, CSS overhaul, general improvements  |
| Sep 21 2024   | Updated index.html, CSS adjustments, added boilerplates |
| Oct 3 2024    | Added contact info and home page                        |
| Dec 21 2024   | Ported application to Next.js                           |
| Tomorrow      | Who knows?                                              |

## [^4] Technologies Used

These are some of the more important technologies I used to make/deploy the website.

| Technologies                                                                               | Usage                                                                       |
| :----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| <a href="https://pnpm.io" target="_blank">pnpm</a>                                         | Package manager                                                             |
| <a href="https://nextjs.org" target="_blank">Next.js w/ TypeScript</a>                     | React-based full-stack framework which the website is built in              |
| <a href="https://ui.shadcn.com" target="_blank">shadcn/ui</a>                              | React UI library based on Radix UI                                          |
| <a href="https://www.cloudflare.com/en-ca/" target="_blank">Cloudflare</a>                 | DNS provider and domain registry; proxy for DDOS protection                 |
| <a href="https://aws.amazon.com/ec2/" target="_blank">Amazon EC2</a>                       | Amazon's elastic cloud compute to host web server                           |
| <a href="https://www.docker.com" target="_blank">Docker</a>                                | Containerization platform                                                   |
| <a href="https://docs.docker.com/compose/" target="_blank">Docker Compose</a>              | Multicontainer support                                                      |
| <a href="https://github.com/nginx-proxy/nginx-proxy" target="_blank">nginx-proxy</a>       | Docker container to automate nginx reverse proxy                            |
| <a href="https://github.com/nginx-proxy/acme-companion" target="_blank">acme-companion</a> | Docker container to automate creation/renewal of Let's Encrypt certificates |
| <a href="https://letsencrypt.org" target="_blank">Let's Encrypt</a>                        | Certificate authority for TLS certificates                                  |
| <a href="https://favicon.io" target="_blank">favicon.io</a>                                | Generate favicons                                                           |

## [^5] Resources I Used

Outside of the documentation for the things listed above[^4], I found these resources helpful:

| Resource                                                                        | Description                   |
| ------------------------------------------------------------------------------- | ----------------------------- |
| <a href="https://developer.mozilla.org/en-US/" target="_blank">MDN Web Docs</a> | The best.                     |
| <a href="https://stackoverflow.com" target="_blank">Stack Overflow</a>          | Good for any questions I had. |

<hr>

## Footnotes

[^1]: This section last updated Dec 21 2024.
[^2]: This section last updated Dec 21 2024.
[^3]: This section last updated Dec 21 2024.
[^4]: This section last updated Dec 21 2024.
[^5]: This section last updated Dec 21 2024.
