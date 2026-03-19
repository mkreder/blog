---
title: "Make a dump of your MySQL DB on OpenShift"
description: "If you want to make a backup of your database or just want to create a dump to migrate your db to another provider, you need to do these steps: 1. Connect to your running applicati"
publishedAt: 2016-05-23
updatedAt: 2016-05-23
tags:
  - cloud
  - linux
  - mysql
  - openshift
  - tech
legacySourceUrl: https://mkreder.com/2016/05/23/dump-mysql-openshift/
---
If you want to make a backup of your database or just want to create a dump to migrate your db to another provider, you need to do these steps:

1. Connect to your running application trough SSH. To do that you need to click this link on OpenShift and run the displayed command.

<a href="http://mkreder.com/wp-content/uploads/2016/05/Screen-Shot-2016-05-16-at-11.56.00-AM.png"><img class="alignnone size-medium wp-image-958" src="http://mkreder.com/wp-content/uploads/2016/05/Screen-Shot-2016-05-16-at-11.56.00-AM-300x134.png" alt="Screen Shot 2016-05-16 at 11.56.00 AM" width="300" height="134" /></a>

2. Create the dump using this command:

<code>mysqldump -u $OPENSHIFT_MYSQL_DB_USERNAME -h $OPENSHIFT_MYSQL_DB_HOST --password=$OPENSHIFT_MYSQL_DB_PASSWORD $OPENSHIFT_GEAR_NAME &gt; dump.sql
gzip dump.sql</code>

3. After that you can scp the dump to any location you want.
