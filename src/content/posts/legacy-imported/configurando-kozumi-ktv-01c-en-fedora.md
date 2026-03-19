---
title: "How to set up kozumi ktv-01c in Fedora"
description: "In order to setup this card, you have to add these parameters to /etc/modprobe.d/bttv.conf cat &lt;&lt; EOF &gt; /etc/modprobe.d/bttv.conf alias char-major-81 videodev alias char-m"
publishedAt: 2011-06-03
updatedAt: 2011-06-03
tags:
  - fedora
  - tech
legacySourceUrl: https://mkreder.com/2011/06/03/configurando-kozumi-ktv-01c-en-fedora/
---
![](/images/legacy/2021/07/screenshot-tvtime-38-how-are-you.png)

<p>In order to setup this card, you have to add these parameters to /etc/modprobe.d/bttv.conf</p>

<p><code>cat &lt;&lt; EOF &gt; /etc/modprobe.d/bttv.conf<br>
alias char-major-81 videodev<br>
alias char-major-81-0 bttv<br>
options bttv pll=1 card=120 radio=1 tuner=38 remote=1 bttv_verbose=1 gbuffers=4<br>
EOF</code></p>

<p>Then, reinitialize the appropriate module:</p>

<p><code># rmmod bttv; modprobe bttv</code></p>

<p>Install tvtime that is my recommended program to watch the TV.</p>

<p><code># yum install tvtime</code></p>

<p>Configure tvtime with your norm (in my case PAL-Nc) and scan for channels.</p>

<p><code>$ tvtime-configure -n PAL-Nc<br>
$ tvtime-scanner<br>
</code></p>

<p>Run tvtime from your GNOME/KDE menu or running 'tvtime' .<br>For others linux distributions, like ubuntu the procedure may be similar.</p>


<p><strong>Español</strong></p>

<p>Para configurar esta capturadora, primero tenemos que configurar los parámetros en /etc/modprobe.d/bttv.conf</p>

<p><code>cat &lt;&lt; EOF &gt; /etc/modprobe.d/bttv.conf<br>
alias char-major-81 videodev<br>
alias char-major-81-0 bttv<br>
options bttv pll=1 card=120 radio=1 tuner=38 remote=1 bttv_verbose=1 gbuffers=4<br>
EOF</code></p>

<p>Luego, recargamos el modulo:</p>

<p><code># rmmod bttv; modprobe bttv</code></p>

<p>Instalamos TVtime, que es mi programa preferido para ver TV en la PC.</p>

<p><code># yum install tvtime</code></p>

<p>Configuramos tvtime con la norma correspondiente para nuestro país. Argentina es PAL-Nc</p>

<p><code>$ tvtime-configure -n PAL-Nc<br>
$ tvtime-scanner<br>
</code></p>

<p>Listo! ahora podemos correr tvtime desde una consola o desde el menú de GNOME/KDE.<br>Para otras distribuciones de Linux, como Ubuntu, el procedimiento debería ser similar.</p>
