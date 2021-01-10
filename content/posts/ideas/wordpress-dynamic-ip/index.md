---
title: Dynamic Wordpress IP
date: "2021-01-10"
tags: ["PHP", "Wordpress"]
---

I was going to start using Vagrant as my development environment for work with Wordpress. I ran into issues with dynamic IP addresses, as this would require a reset of Wordpresse's settings everytime the virtual machine gets a new IP. Which meant either editing the database, or the config by hand. For some reason, Vagrant didn't like running on a subnet with a static IP either, so the only option was to have a dynamic IP.

I have also developed an [automation tool for spawning new Vagrant VMs](/blog/projects/vagrant-cli-tool/) for Wordpress development.

I stumbled upon [this snippet](https://wordpress.stackexchange.com/questions/179559/relative-or-dynamic-site-url-possible) that you can add to your wp-config.php:
```php
// Get server ip address and folder path
$currenthost = 'http://'.$_SERVER['SERVER_ADDR'];
$currentpath = preg_replace('@/+$@','',dirname($_SERVER['SCRIPT_NAME']));
$currentpath = preg_replace('/\/wp.+/','',$currentpath);
$siteurl = $currenthost.$currentpath;

// Define them to be used on wordpress
define('WP_HOME',$siteurl);
define('WP_SITEURL',$siteurl);
define('WP_CONTENT_URL',$siteurl.'/wp-content');
define('WP_PLUGIN_URL',$siteurl.'/wp-content/plugins');
define('DOMAIN_CURRENT_SITE',$siteurl);
@define('ADMIN_COOKIE_PATH', './');
```

With this piece of code, Wordpress will fetch the IP address of the server and apply that to the wordpress URL configurations. This allows for us to use dynamic IP addresses in Vagrant. This also helps with moving the whole Wordpress installation between multiple development machines, that might have different IP addresses.