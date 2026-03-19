---
title: "Fedora 21 LXDE and MATE versions for HummingBoard"
description: "I have created 2 Fedora 21 images for the HummingBoard and Cubox-i. http://vps1.mkreder.com/Fedora-Mate-armhfp-21-5-sda.raw.xz MATE http://vps1.mkreder.com/Fedora-LXDE-armhfp-21-5-"
publishedAt: 2015-02-21
updatedAt: 2015-02-21
tags:
  - cuboxi
  - fedora
  - hummingboard
legacySourceUrl: https://mkreder.com/2015/02/21/fedora-21-versiones-lxde-y-mate-para-hummingboard/
---
<!--:en-->I have created 2 Fedora 21 images for the HummingBoard and Cubox-i.

<a href="http://vps1.mkreder.com/Fedora-Mate-armhfp-21-5-sda.raw.xz">http://vps1.mkreder.com/Fedora-Mate-armhfp-21-5-sda.raw.xz</a>
MATE

<a href="http://vps1.mkreder.com/Fedora-LXDE-armhfp-21-5-sda.raw.xz">http://vps1.mkreder.com/Fedora-LXDE-armhfp-21-5-sda.raw.xz</a>
LXDE

I will create a XFCE based image too, soon.
In order to extend the root filesystem on this image, you need to run:

<code>fdisk /dev/location-of-your-fedora-arm-media &lt;&lt; EOF
d
3
n
p

2001954

w
EOF
partprobe /dev/location-of-your-fedora-arm-media
e2fsck -f /dev/location-of-your-fedora-arm-media3
resize2fs /dev/location-of-your-fedora-arm-media3</code>

More information about Fedora on these boards can be found on this <a href="https://github.com/jmontleon/fedora-cubox-i_hb/blob/master/README.md">github page</a><!--:-->
