source 'https://rubygems.org'

require 'json'
require 'net/http'

versions = JSON.parse(
  Net::HTTP.get(URI('https://pages.github.com/versions.json'))
)

gem 'github-pages', versions['github-pages']

group :jekyll_plugins do
  gem 'octopress-minify-html'
  gem 'octopress-paginate'
  gem 'webrick'
end

# bundle update
# bundle exec jekyll serve
