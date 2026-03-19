---
title: "trying to run old Red Hat version in KVM, failed"
description: "Some days ago I felt some nostalgic feelings and I tried to install a red hat 6.2 version into a fedora 14 host. The installation was painfully slow, but it was completed successfu"
publishedAt: 2011-01-30
updatedAt: 2011-01-30
tags:
  - fedora
  - kvm
  - linux
  - redhat
  - tech
legacySourceUrl: https://mkreder.com/2011/01/30/trying-to-run-old-red-hat-version-in-kvm-failed/
---
<p>Some days ago I felt some nostalgic feelings and I tried to install a red hat 6.2 version into a fedora 14 host.</p>
<p>The installation was painfully slow, but it was completed successfully anyway. The problem is that after booting the new (not really) redhat 6..2, I got a kernel panic with the following message:</p>
<p>"<em>Kernel</em> panic: <em>Kernel compiled</em> for Pentium+, <em>requires TSC"</em></p>
<p>after googling that, I found that one of the solutions would be recompile the old linux kernel with the option "Unsynced TSC support", I'm to lazy to do that just for fun, I would do it if I have no choice, but I have some doubts, why the kernel in the installation cd is not failing? and, is it because my computer has an AMD processor?</p>
<p><strong>Español</strong></p>
<p>Hace algunos días sentí un poco de nostalgia y trate de instalar redhat 6.2 en mi PC con fedora 14</p>
<p>La instalación fue bastante lenta, pero se completo sin mayores problemas. El problema es que después de bootear la nueva (chiste!) instalación, obtuve un kernel panic con el siguiente mensaje:</p>
<p><em>"Kernel panic: Kernel compiled for Pentium+, req</em><em>uires TSC"</em></p>
<p>Después de googlear un rato, encontré que una de las soluciones seria recompilar el kernel del viejo linux, con la opción, "Unsynced TSC Support", lo haría pero soy demasiado perezoso para hacer eso. Pero me quedan algunas dudas, porque el kernel del cd no fallo? este fallo es porque mi PC tiene procesador AMD? hmmm, no lo sé</p>

![](/images/legacy/wp/screenshot-rh62-virtual-machine-1.png)

![](/images/legacy/wp/screenshot-rh62-virtual-machine.png)
