---
layout: post
title: Shadow CLJS + Webpack
preview: "foo"
---

In this post, I'll share how I've gotten [`shadow-cljs`][shadow]
working alongside [Webpack][webpack] using the [`:esm`][shadow-esm]
target. This allows for Webpack's tree-shaking of JavaScript dependencies
while still having all the benefits of `shadow-cljs`.

For [Vistaly.com][vistaly] (a product-strategy startup I'm co-founding),
we were using large JavaScript libraries (such as [AWS Amplify][amplify])
and because of this, we had a very large bundle size.

Before the switch, our bundle size was 11MB uncompressed 🐢. CloudFront
only compresses files under 10MB ([source][cloudfront]), which meant
our users had to wait to download the full 11MB before their app would load.

By switching to ESM + Webpack, our bundle size decreased to 3.7MB uncompressed /
0.81MB compressed (via Brotli compression). To end-users, there was a
93% decrease in the quantity of data that had to be downloaded 🐇.

There were minimal changes needed for this (it was mostly trial and error to get
the pieces working well together). First I updated `shadow-cljs.edn`. By
specifying `:js-provider :import`, I'm having `shadow-cljs` leave the
bundling of JS dependencies to Webpack.

{% highlight clojure %}
;; shadow-cljs.edn
{:builds
 {:web-advanced
  {:closure-defines {goog.DEBUG false}
   :compiler-options {:infer-externs :auto
                      :optimizations :advanced}
   :output-dir ".shadow-cljs"
   :target :esm
   :js-options {:js-provider :import}
   :modules {:main {:init-fn com.vistaly.web.core/init!}}}

  :web-dev
  {:closure-defines {goog.DEBUG true}
   :compiler-options {:infer-externs :auto}
   :devtools {:watch-dir "resources/public"}
   :output-dir ".shadow-cljs"
   :target :esm
   :js-options {:js-provider :import}
   :modules {:main {:init-fn com.vistaly.web.core/init!}}}}}
{% endhighlight %}

Secondly, I created a `webpack.config.js` file. Moving forward,
the local running server will be Webpack's dev server. Hot reloading
will still be done by `shadow-cljs`. I also added `source-map-loader` so
that you can view ClojureScript source-maps from within your browser.

{% highlight javascript %}
const path = require("path");
const directory = path.resolve(__dirname, "resources/public");
const { DEV_MODE } = process.env;

module.exports = {
  devtool: DEV_MODE && "eval-cheap-module-source-map",
  devServer: {
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    historyApiFallback: true,
    hot: false,
    liveReload: false, // rely on shadow's reloading
    static: { directory },
    port: 9000,
  },
  entry: "./.shadow-cljs/main.js",
  mode: DEV_MODE ? "development" : "production",
  module: DEV_MODE && {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        include: [path.resolve(__dirname, ".shadow-cljs")],
        use: ["source-map-loader"],
      },
    ],
  },
  output: {
    filename: "./js/main.js",
    path: directory,
  },
};
{% endhighlight %}

Lastly, I had to update our [babashka][bb] scripts to reflect the changes.

The `dev` command changed to utilize `npx webpack serve` along with `DEV_MODE=true`,
while the `release` command changed to utilize `npx webpack`.

Hope that helped! if anything wasn't clear or you're interested in [Vistaly][vistaly],
you can find me on the Clojurians Slack channel (`@dehli`). Talk soon! 👋

[amplify]:    https://docs.amplify.aws/guides/q/platform/js/
[bb]:         https://github.com/babashka/babashka
[cloudfront]: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/ServingCompressedFiles.html
[shadow]:     https://github.com/thheller/shadow-cljs
[shadow-esm]: https://shadow-cljs.github.io/docs/UsersGuide.html#target-esm
[vistaly]:    https://www.vistaly.com
[webpack]:    https://webpack.js.org/