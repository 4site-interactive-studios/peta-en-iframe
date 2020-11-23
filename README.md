# PETA Iframe Project

This project allows Seamless iFrame Embed for PETA.

## How to use

1. Add the `peta-iframe-child.js` (generated from the `child` folder) on your EN Donation and "Thank You" pages.
2. Add the `peta-iframe-parent.js` (generated from the `parent` folder) on the website page.
3. Add this shortcode to the page: `<span class="iframe-shortcode">[iframe url="{MY_DONATION_PAGE}"]</span>`. Replace the **{MY_DONATION_PAGE}** part with the URL of your Donation Page.

## Development

The folders `child` and `parent` are different projects. You need to follow the "Install" and "Deploy" steps on each one.

## Install Dependencies

1. `npm install`

## Deploy

1. `npm run build`

It's going to create a `dist` folder, where you can get the js file and publish it.
