---
title: "TP-Link TL-WN725N version 2 on Raspberry Pi"
description: "El TP-Link TL-WN725N es un dispositivo USB Wifi que sirve para cualquier tipo de computadora. La versión 1 de este producto funciona con el kernel 3.6 de la Raspberry Pi sin proble"
publishedAt: 2013-09-25
updatedAt: 2013-09-25
tags:
  - fedora
  - pi
  - pidora
  - tech
  - tl-wn725n
  - tplink
legacySourceUrl: https://mkreder.com/2013/09/25/tl-wn725n/
---
El TP-Link TL-WN725N es un dispositivo USB Wifi que sirve para cualquier tipo de computadora. La versión 1 de este producto funciona con el kernel 3.6 de la Raspberry Pi sin problemas. Sin embargo, la versión 2 no. Para hacerla funcionar en Pidora, hay <a href="https://github.com/liwei/rpi-rtl8188eu">compilar el modulo</a> en el ultimo <a href="http://koji.pidora.ca/koji/packageinfo?packageID=11981">kernel</a> o simplemente pueden bajar el que yo compile:

*Note: The files hosted on mkreder.com are no longer available.*

<code>wget http://mkreder.com/files/8188eu.ko.gz
gzip -d 8188eu.ko.gz
install -p -m 644 8188eu.ko /lib/modules/`uname -r`/kernel/drivers/net/wireless
depmod -a
modprobe 8188eu</code>

MD5Sum: 7836769f630f521f6e062a6cca889d07

He contactado al equipo de #pidora en Freenode para pedir que lo agreguen al Remix.

<strong>English</strong>

The TP-Link TL-WN725N is a small USB Wifi adapter that can be used on any type of computer. The version 1 of this product works out of the box with the 3.6 Raspberry Pi kernel but the version 2 does not. In order to make it work on Pidora you need to <a href="https://github.com/liwei/rpi-rtl8188eu">build the module</a> with the latest <a href="http://koji.pidora.ca/koji/packageinfo?packageID=11981">Pidora kernel</a> or you can just download the module I built:

*Note: The files hosted on mkreder.com are no longer available.*

<code>wget http://mkreder.com/files/8188eu.ko.gz
gzip -d 8188eu.ko.gz
install -p -m 644 8188eu.ko /lib/modules/`uname -r`/kernel/drivers/net/wireless
depmod -a
modprobe 8188eu</code>

MD5Sum: 7836769f630f521f6e062a6cca889d07

I also contacted the #Pidora maintainers on Freenode to request if they can add it to the Remix. 