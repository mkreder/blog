---
title: "ERROR: Invalid OpenStack Nova credentials"
description: "Encontré un problema tratando de instalar OpenStack en Fedora 19 con esta guía # nova --debug flavor-list REQ: curl -i http://127.0.0.1:5000/v2.0/tokens -X POST -H \"Content-Type: a"
publishedAt: 2013-10-27
updatedAt: 2013-10-27
tags:
  - fedora
  - openstack
  - tech
legacySourceUrl: https://mkreder.com/2013/10/27/error-openstack-nova-credentials/
---
Encontré un problema tratando de instalar OpenStack en Fedora 19 <a href="http://fedoraproject.org/wiki/Getting_started_with_OpenStack_on_Fedora_18">con esta guía</a>

<code># nova --debug flavor-list
REQ: curl -i http://127.0.0.1:5000/v2.0/tokens -X POST -H "Content-Type: application/json" -H "Accept: application/json" -H "User-Agent: python-novaclient" -d '{"auth": {"tenantName": "admin", "passwordCredentials": {"username": "admin", "password": "verybadpass"}}}'</code>

<code><code></code></code>

INFO (connectionpool:236) Starting new HTTP connection (1): 127.0.0.1
DEBUG (connectionpool:330) "POST /v2.0/tokens HTTP/1.1" 401 116
RESP: [401] CaseInsensitiveDict({'date': 'Fri, 11 Oct 2013 23:24:41 GMT', 'vary': 'X-Auth-Token', 'content-length': '116', 'content-type': 'application/json'})
RESP BODY: {"error": {"message": "The request you have made requires authentication.", "code": 401, "title": "Not Authorized"}}

<code>
</code>

<code>DEBUG (shell:768) Invalid OpenStack Nova credentials.
Traceback (most recent call last):
File "/usr/lib/python2.7/site-packages/novaclient/shell.py", line 765, in main
OpenStackComputeShell().main(map(strutils.safe_decode, sys.argv[1:]))
File "/usr/lib/python2.7/site-packages/novaclient/shell.py", line 697, in main
raise exc.CommandError("Invalid OpenStack Nova credentials.")
CommandError: Invalid OpenStack Nova credentials.
ERROR: Invalid OpenStack Nova credentials.</code>

Mirando el archivo .keystorerc, parecía estar bien.

<code>[root@localhost ~]# cat .keystonerc
export ADMIN_TOKEN=49ac57278d318dc7bb61
export OS_SERVICE_TOKEN=49ac57278d318dc7bb61
export OS_USERNAME=admin
export OS_PASSWORD=verybadpass
export OS_TENANT_NAME=admin
export OS_AUTH_URL=http://127.0.0.1:5000/v2.0/
export SERVICE_ENDPOINT=http://127.0.0.1:35357/v2.0/
export SERVICE_TOKEN=$ADMIN_TOKEN</code>

La solución fue hacer que el usuario, rol e inquilino estén asociados.
1. Obtener el ID para el usuario admin:

<code>[root@localhost ~]# keystone user-list
WARNING: Bypassing authentication using a token &amp; endpoint (authentication credentials are being ignored).
+----------------------------------+--------+---------+-------+
|                id                |  name  | enabled | email |
+----------------------------------+--------+---------+-------+
| <strong>4738e8d8819a47a5b0cd7b72db3f3fa6</strong> | admin  |   True  |       |
| 157da897546e4ac8a98eaf6240683457 |  ec2   |   True  |       |
| 3819652ea963416a99aa6bc6dd1cd83c | glance |   True  |       |
| 12c7844b7dc24aa3a7e704b49e026f33 |  nova  |   True  |       |
| 8313970d7d524ef59983a062711916e8 | swift  |   True  |       |
+----------------------------------+--------+---------+-------+
</code>

2. Obtener el ID inquilino para admin, si no existe, lo creamos:

<code>[root@localhost ~]# keystone tenant-list
WARNING: Bypassing authentication using a token &amp; endpoint (authentication credentials are being ignored).
+----------------------------------+---------+---------+
|                id                |   name  | enabled |
+----------------------------------+---------+---------+
| afd9af7cd2604311be27646b4111f8d4 |   demo  |   True  |
| 9c85743eee994e28af10ea7b9d215af0 | service |   True  |
+----------------------------------+---------+---------+</code>

<code><code></code></code>

[root@localhost ~]# keystone tenant-create --name admin
WARNING: Bypassing authentication using a token &amp; endpoint (authentication credentials are being ignored).
+-------------+----------------------------------+
| Property | Value |
+-------------+----------------------------------+
| description | |
| enabled | True |
| id | <strong>4aec780fe3374e46b4cea0de602c19c5</strong> |
| name | admin |
+-------------+----------------------------------+

<code>
</code>

<code></code>

3. Obetener el ID del rol:

<code>[root@localhost ~]# keystone role-list
WARNING: Bypassing authentication using a token &amp; endpoint (authentication credentials are being ignored).
+----------------------------------+----------+
|                id                |   name   |
+----------------------------------+----------+
| 9fe2ff9ee4384b1894a90878d3e92bab | _member_ |
| <strong>9b4b3ec7153b4b48bf381db829108646</strong> |  admin   |
+----------------------------------+----------+</code>

Por ultimo, los asociamos:

<code>
[root@localhost ~]# keystone user-role-add --user 4738e8d8819a47a5b0cd7b72db3f3fa6 --role 9b4b3ec7153b4b48bf381db829108646[root@localhost ~]# keystone user-role-add --user 4738e8d8819a47a5b0cd7b72db3f3fa6 --role 9b4b3ec7153b4b48bf381db829108646 --tenant-id 4aec780fe3374e46b4cea0de602c19c5</code>

Después de esto, el error de las credenciales desapareció. De todos modos, encontré otro error que decía que Nova no era capaz de firmar el token de autenticación.

Finalmente instale OpenStack utilizando <a href="http://openstack.redhat.com/Quickstart">RDO</a>. Este método es mucho mas sencillo.

<strong>English</strong>

I faced a problem while trying to configure OpenStack on Fedora 19 following <a href="http://fedoraproject.org/wiki/Getting_started_with_OpenStack_on_Fedora_18">this guide</a>

<code># nova --debug flavor-list
REQ: curl -i http://127.0.0.1:5000/v2.0/tokens -X POST -H "Content-Type: application/json" -H "Accept: application/json" -H "User-Agent: python-novaclient" -d '{"auth": {"tenantName": "admin", "passwordCredentials": {"username": "admin", "password": "verybadpass"}}}'</code>

<code><code></code></code>

INFO (connectionpool:236) Starting new HTTP connection (1): 127.0.0.1
DEBUG (connectionpool:330) "POST /v2.0/tokens HTTP/1.1" 401 116
RESP: [401] CaseInsensitiveDict({'date': 'Fri, 11 Oct 2013 23:24:41 GMT', 'vary': 'X-Auth-Token', 'content-length': '116', 'content-type': 'application/json'})
RESP BODY: {"error": {"message": "The request you have made requires authentication.", "code": 401, "title": "Not Authorized"}}

<code>
</code>

<code>DEBUG (shell:768) Invalid OpenStack Nova credentials.
Traceback (most recent call last):
File "/usr/lib/python2.7/site-packages/novaclient/shell.py", line 765, in main
OpenStackComputeShell().main(map(strutils.safe_decode, sys.argv[1:]))
File "/usr/lib/python2.7/site-packages/novaclient/shell.py", line 697, in main
raise exc.CommandError("Invalid OpenStack Nova credentials.")
CommandError: Invalid OpenStack Nova credentials.
ERROR: Invalid OpenStack Nova credentials.</code>

Checking my .keystorerc file it looked good.

<code>[root@localhost ~]# cat .keystonerc
export ADMIN_TOKEN=49ac57278d318dc7bb61
export OS_SERVICE_TOKEN=49ac57278d318dc7bb61
export OS_USERNAME=admin
export OS_PASSWORD=verybadpass
export OS_TENANT_NAME=admin
export OS_AUTH_URL=http://127.0.0.1:5000/v2.0/
export SERVICE_ENDPOINT=http://127.0.0.1:35357/v2.0/
export SERVICE_TOKEN=$ADMIN_TOKEN</code>

The solution was to make sure that the user, role and tenant are associated.
1. Get the ID from the admin user:

<code>[root@localhost ~]# keystone user-list
WARNING: Bypassing authentication using a token &amp; endpoint (authentication credentials are being ignored).
+----------------------------------+--------+---------+-------+
|                id                |  name  | enabled | email |
+----------------------------------+--------+---------+-------+
| <strong>4738e8d8819a47a5b0cd7b72db3f3fa6</strong> | admin  |   True  |       |
| 157da897546e4ac8a98eaf6240683457 |  ec2   |   True  |       |
| 3819652ea963416a99aa6bc6dd1cd83c | glance |   True  |       |
| 12c7844b7dc24aa3a7e704b49e026f33 |  nova  |   True  |       |
| 8313970d7d524ef59983a062711916e8 | swift  |   True  |       |
+----------------------------------+--------+---------+-------+
</code>

2. Get the tenant admin id, if not there, create it:

<code>[root@localhost ~]# keystone tenant-list
WARNING: Bypassing authentication using a token &amp; endpoint (authentication credentials are being ignored).
+----------------------------------+---------+---------+
|                id                |   name  | enabled |
+----------------------------------+---------+---------+
| afd9af7cd2604311be27646b4111f8d4 |   demo  |   True  |
| 9c85743eee994e28af10ea7b9d215af0 | service |   True  |
+----------------------------------+---------+---------+</code>

<code><code></code></code>

[root@localhost ~]# keystone tenant-create --name admin
WARNING: Bypassing authentication using a token &amp; endpoint (authentication credentials are being ignored).
+-------------+----------------------------------+
| Property | Value |
+-------------+----------------------------------+
| description | |
| enabled | True |
| id | <strong>4aec780fe3374e46b4cea0de602c19c5</strong> |
| name | admin |
+-------------+----------------------------------+

<code>
</code>

<code></code>

3. Get the role id:

<code>[root@localhost ~]# keystone role-list
WARNING: Bypassing authentication using a token &amp; endpoint (authentication credentials are being ignored).
+----------------------------------+----------+
|                id                |   name   |
+----------------------------------+----------+
| 9fe2ff9ee4384b1894a90878d3e92bab | _member_ |
| <strong>9b4b3ec7153b4b48bf381db829108646</strong> |  admin   |
+----------------------------------+----------+</code>

Associate them all together.
<code>
[root@localhost ~]# keystone user-role-add --user 4738e8d8819a47a5b0cd7b72db3f3fa6 --role 9b4b3ec7153b4b48bf381db829108646[root@localhost ~]# keystone user-role-add --user 4738e8d8819a47a5b0cd7b72db3f3fa6 --role 9b4b3ec7153b4b48bf381db829108646 --tenant-id 4aec780fe3374e46b4cea0de602c19c5</code>

After this, the credentials error disappeared. However, I faced a new error message saying that Nova wasn't able to sign the token.

I've finally installed OpenStack trough <a href="http://openstack.redhat.com/Quickstart">RDO</a>. This method is simpler. 