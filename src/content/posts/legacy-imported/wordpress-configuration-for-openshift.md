---
title: "Wordpress configuration for OpenShift"
description: "If you are trying to upload a WordPress site to OpenShift you will have to make the following adjustments to your wp-config.php file: // ** MySQL settings - You can get this info f"
publishedAt: 2016-05-16
updatedAt: 2016-05-16
tags:
  - cloud
  - devops
  - linux
  - mysql
  - openshift
  - tech
  - wordpress
legacySourceUrl: https://mkreder.com/2016/05/16/wordpress-configuration-for-openshift/
---
<code></code>If you are trying to upload a WordPress site to OpenShift you will have to make the following adjustments to your wp-config.php file:

<code>// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME',$_ENV['OPENSHIFT_GEAR_NAME']);</code>

<code><code></code></code>

/** MySQL database username */
define('DB_USER', $_ENV['OPENSHIFT_MYSQL_DB_USERNAME']);

<code><code></code></code>

/** MySQL database password */
define('DB_PASSWORD', $_ENV['OPENSHIFT_MYSQL_DB_PASSWORD']);

<code>
</code>

<code>/** MySQL hostname */
define('DB_HOST', $_ENV['OPENSHIFT_MYSQL_DB_HOST'] . ':' . $_ENV['OPENSHIFT_MYSQL_DB_PORT']);</code>

This will help WordPress to use the environment variables that OpenShift setup to connect to MySQL.
