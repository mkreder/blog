---
title: "VERR_SUPLIB_OWNER_NOT_ROOT on VirtualBoxV"
description: "A couple of days ago I had a problem with VirtualBox, I couldn't start one of my VMs because it was displaying an error message saying: \"VERR_SUPLIB_OWNER_NOT_ROOT\" Searching on th"
publishedAt: 2012-08-20
updatedAt: 2012-08-20
tags:
  - fedora
  - permisos
  - permission
  - tech
  - virt
  - virtualbox
legacySourceUrl: https://mkreder.com/2012/08/20/verr_suplib_owner_not_root/
---
<!--:en-->A couple of days ago I had a problem with VirtualBox, I couldn't start one of my VMs because it was displaying an error message saying: "VERR_SUPLIB_OWNER_NOT_ROOT"
Searching on the internet I found this <a title="bug" href="https://www.virtualbox.org/ticket/7889">bug</a>. and they suggested to run:

<code>chown -R root:root /usr/lib/virtualbox
chmod 4711 /usr/lib/virtualbox/VirtualBox</code>

This didn't fix my issue, so I started to dig deeply into the issue and I found a log file on ~/.VirtualBox/Machines/VM/Logs/VBox.log with the following message:
<code>
00:00:00.448 pdmR3LoadR0U: pszName="VMMR0.r0" rc=VERR_SUPLIB_OWNER_NOT_ROOT szErr="The owner is not root: '/usr'"</code>

I took a quick look at /usr permissions and I found that for some weird reason, it had uid:gid 500:500
<code># ls -ld /usr
drwxrwxr-x. 13 500 500 4096 Aug  3  2006 /usr</code>

<strong>Solution:</strong>
<code>chown root:root /usr</code>

<strong>Español</strong>

<!--:--><!--:es-->Hace unos días me tope con un problema, VirtualBox no podía arrancar mi maquina virtual dando el error "VERR_SUPLIB_OWNER_NOT_ROOT"
Buscando en internet encontré este <a title="bug" href="https://www.virtualbox.org/ticket/7889">bug</a>. en donde sugerían hacer:

<code>chown -R root:root /usr/lib/virtualbox
chmod 4711 /usr/lib/virtualbox/VirtualBox</code>

Esto no soluciono mi problema, así que mirando el log en ~/.VirtualBox/Machines/VM/Logs/VBox.log descubrí una pista:
<code>
00:00:00.448 pdmR3LoadR0U: pszName="VMMR0.r0" rc=VERR_SUPLIB_OWNER_NOT_ROOT szErr="The owner is not root: '/usr'"</code>

Chequeando los permisos de /usr vi que por alguna extraña razón el dueño era el uid:gid 500:500
<code># ls -ld /usr
drwxrwxr-x. 13 500 500 4096 Aug  3  2006 /usr</code>

<strong>Solución:</strong>
<code>chown root:root /usr</code><!--:-->
