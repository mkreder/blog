---
title: "Huawei E1692/E1756 para Personal en Fedora 12"
description: "Esta pequeña guiá muestra como utilizar el Modem Huawei E1692/E1756 para Personal, en Fedora 12. Como este modem también es un pendrive tenemos que hacer que el dispositivo sea det"
publishedAt: 2010-04-06
updatedAt: 2010-04-06
tags:
  - 3g
  - e1692
  - e1756
  - fedora
  - huawei
  - modem
  - technical
legacySourceUrl: https://mkreder.com/2010/04/06/huawei-e1692e1756-para-personal-en-fedora-12/
---
Esta pequeña guiá muestra como utilizar el Modem Huawei E1692/E1756 para Personal, en Fedora 12.

Como este modem también es un pendrive tenemos que hacer que el dispositivo sea detectado como un modem, para eso instalamos usb_modeswitch.

<code>yum install usb_modeswitch</code>

luego debemos agregar al final del archivo /etc/usb_modeswitch.conf, las siguientes lineas:

<code>gedit /etc/usb_modeswitch.conf</code>

<code>###############################
# Huawei E1692/E1756
DefaultVendor= 0x12d1
DefaultProduct= 0x1446

TargetVendor= 0x12d1
TargetProduct= 0x140c

MessageContent="55534243000000000000000000000011060000000000000000000000000000"

CheckSuccess=5
###########################</code>

Debemos agregar a udev la regla para ejecutar usb_modeswitch cuando el modem es detectado

<code>gedit /etc/udev/rules.d/15-hauwei.rules</code>

<code>##
SUBSYSTEM=="block", 
ACTION=="add", 
SYSFS{idVendor}=="12d1", 
SYSFS{idProduct}=="1446", 
OPTIONS="ignore_device"

SUBSYSTEM=="usb", SYSFS{idProduct}=="1446", SYSFS{idVendor}=="12d1", RUN+="/usr/bin/usb_modeswitch"
##</code>

Una vez terminado este paso podemos conectar nuestro modem y empezar a <a href="http://fedoraproject.org/wiki/Features/MoreNetworkManagerMobileBroadband">configurarlo</a> en NetworkManager.
