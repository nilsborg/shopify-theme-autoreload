# shopify-theme-autoreload

## What is this?

Uses [gulp](http://gulpjs.com) to check for file changes in your local theme directory, uploads the changed files with [shopify's theme gem](https://github.com/Shopify/shopify_theme) to your shopify shop and reloads all browsers connected to browser sync.

![demo](https://dl.dropboxusercontent.com/u/1584261/reload-example.gif)

## Requirements

This thing needs [npm](https://www.npmjs.com) and [shopify_theme](https://github.com/Shopify/shopify_theme) installed on your machine.

## Installation

Clone `package.json` and `gulpfile.js` into your shopify theme root and run:
`npm install`

## How to use this thing

1. Go to you shopify admin panel > themes and click the preview icon for your current theme.
2. Copy that entire preview url from the address bar
3. Navigate to your project directory and run `gulp --url "https://your-shop.myshopify.com/?key=xxx"`
4. Chrome pops up showing your store through the localhost proxy 
5. Change files in your code editor, wait for gulp do it's thing (wait for the files to upload) and watch your browser(s) reload after everything's done

Woop! 

## Side notes & Limitations

This is the product of an afternoon of hacking. By all means, if you find stuff that can be better: put down a pull request or PM me.

I also wanted to use browser sync's css injection feature which I couldn't figure out how to do currently because shopify stores assets on a cdn and the frontend loads those assets from that cdn url, which in turn leaves browser sync clueless of which resource to inject over.
