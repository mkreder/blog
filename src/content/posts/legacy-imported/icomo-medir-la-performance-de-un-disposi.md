---
title: "¿Como medir la performance de un dispositivo de bloques?"
description: "Como podemos medir la performance de un dispositivo de bloques, sda sdb, un pen drive, un disco duro interno, etc. Podemos utilizar hdparm: En un disco interno por ejemplo ubtendre"
publishedAt: 2008-12-20
updatedAt: 2008-12-20
tags:
  - blocks
  - bloques
  - hdparm
  - sda
  - technical
legacySourceUrl: https://mkreder.com/2008/12/20/icomo-medir-la-performance-de-un-disposi/
---
Como podemos medir la performance de un dispositivo de bloques, sda sdb, un pen drive, un disco duro interno, etc.

Podemos utilizar hdparm:

En un disco interno por ejemplo ubtendremos:

<code>/dev/sda:
 Timing buffered disk reads:  110 MB in  3.07 seconds =  35.85 MB/sec</code>

También podemos usar "hdparm -i" Para obtener más información:
<code>
/dev/sda:

 Model=ST91208345R                             , FwRev=3.CLF   , SerialNo=            R34542H
 Config={ HardSect NotMFM HdSw&gt;15uSec Fixed DTR&gt;10Mbs RotSpdTol&gt;.5% }
 RawCHS=16383/16/63, TrkSize=0, SectSize=0, ECCbytes=4
 BuffType=unknown, BuffSize=8192kB, MaxMultSect=16, MultSect=?16?
 CurCHS=16383/16/63, CurSects=16514064, LBA=yes, LBAsects=234441648
 IORDY=on/off, tPIO={min:240,w/IORDY:120}, tDMA={min:120,rec:120}
 PIO modes:  pio0 pio1 pio2 pio3 pio4 
 DMA modes:  mdma0 mdma1 mdma2 
 UDMA modes: udma0 udma1 udma2 udma3 udma4 *udma5 
 AdvancedPM=yes: unknown setting WriteCache=enabled
 Drive conforms to: Unspecified:  ATA/ATAPI-1,2,3,4,5,6,7

 * signifies the current active mode</code>

Espero que les haya servido!
Cualquier pregunta dejen comentarios

Saludos
D.
