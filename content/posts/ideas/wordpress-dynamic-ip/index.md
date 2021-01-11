---
title: Dynamic Wordpress siteurl
date: "2021-01-10"
tags: ["PHP", "Wordpress"]
---

Virtual machines (VMs) are a major tool in the modern development game. I wanted to start using Vagrant for managing my Wordpress development VMs. However, I ran into a problem with the dynamic IP addresses that Vagrant uses by default. Your Wordpress website relies on a static URL, which is the servers IP if you don't have a domain setup. Putting a dynamic IP and a static URL together spells a lot of extra work every time the IP address changes. This would mean either editing the database, or the Wordpress configuration by hand.

One option would be to set up a static IP address for the VM itself. This is a solid option if you are working in a single network that doesn't change, for example at home. If however you need to move to a different network to continue working on the site, like going from your home to your workplace, this option is not perfect. Your static IP might not work anymore because of conflicting network configurations like different IP ranges, or the IP might already be reserved for other devices.

### The Dynamic IP configuration

To fix this problem, I started searching for a way to make the URL of Wordpress dynamic. You could make the URL `http://localhost`, but then you run into problems accessing it from the servers network facing IP, which would let you for example view the site with your mobile device.

I stumbled upon [this snippet](https://wordpress.stackexchange.com/questions/179559/relative-or-dynamic-site-url-possible) that you can add to your `wp-config.php`:

```php
// Get server ip address and folder path
$currenthost = 'http://'.$_SERVER['SERVER_ADDR'];
$currentpath = preg_replace('@/+$@','',dirname($_SERVER['SCRIPT_NAME']));
$currentpath = preg_replace('/\/wp.+/','',$currentpath);
$siteurl = $currenthost.$currentpath;

// Define them to be used in Wordpress
define('WP_HOME',$siteurl);
define('WP_SITEURL',$siteurl);
define('WP_CONTENT_URL',$siteurl.'/wp-content');
define('WP_PLUGIN_URL',$siteurl.'/wp-content/plugins');
define('DOMAIN_CURRENT_SITE',$siteurl);
@define('ADMIN_COOKIE_PATH', './');
```

It uses PHP's functionality to get server and execution environment information with `$_SERVER['SERVER_ADDR']`, like for example the server's IP address.
Then with `$_SERVER['SCRIPT_NAME']` we get the current script's full path and filename.
Some regex is used to clean up the script's path for use in the URL.

Then we can add the cleaned IP to Wordpress's constants, that handle the site URL in the wp-config file.

And thus we have setup Wordpress to use a dynamic server IP address!

I have implemented this snippet into this [automation tool for making new Vagrant VMs](/blog/projects/vagrant-cli-tool/), which I use for Wordpress development.
