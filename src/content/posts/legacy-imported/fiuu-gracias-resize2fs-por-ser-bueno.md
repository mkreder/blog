---
title: "phew.. thanks resize2fs for being cool"
description: "Yesterday while shrinking a filesystem my computer got stock due a hardware failure: [root@mirror /]# resize2fs -p /dev/mapper/vg_mirror-LogVol03 410G resize2fs 1.41.14 (22-Dec-201"
publishedAt: 2011-06-19
updatedAt: 2011-06-20
tags:
  - corrupcion
  - fedora
  - resize2fs
  - tech
legacySourceUrl: https://mkreder.com/2011/06/19/fiuu-gracias-resize2fs-por-ser-bueno/
---
<!--:en-->Yesterday while shrinking a filesystem my computer got stock due a hardware failure:

<code>
[root@mirror /]# resize2fs -p /dev/mapper/vg_mirror-LogVol03 410G
resize2fs 1.41.14 (22-Dec-2010)
Resizing the filesystem on /dev/mapper/vg_mirror-LogVol03 to 107479040 (4k) blocks.
Begin pass 2 (max = 15391251)
Relocating blocks XXXXXXXXXXXXXXXXXXXXXX------------------
</code>

Booted from a DVD in the rescue environment, mounted the filesystem and everything was OK. The size was still the original. I performed an e2fsck and then tried again. Apparently, the "Relocating blocks" part doesn't cause any corruption if interrupted :D

<strong>Spanish</strong>

<!--:--><!--:es-->Ayer mientras achicaba un filesystem mi computadora se freezo por un problema de hardware:

<code>
[root@mirror /]# resize2fs -p /dev/mapper/vg_mirror-LogVol03 410G
resize2fs 1.41.14 (22-Dec-2010)
Resizing the filesystem on /dev/mapper/vg_mirror-LogVol03 to 107479040 (4k) blocks.
Begin pass 2 (max = 15391251)
Relocating blocks XXXXXXXXXXXXXXXXXXXXXX------------------
</code>

Bootie desde un DVD, en modo rescate, monte el filesystem y todo estaba bien. El tamaño del filesystem todavía era el original. Realice un e2fsck y después probé de nuevo con el resize2fs. Aparentemente la parte de "Relocating blocks" no hace ningún daño si se interrumpe :D<!--:-->
