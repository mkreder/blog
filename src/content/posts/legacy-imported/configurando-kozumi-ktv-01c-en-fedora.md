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
<!-- wp:image {"id":1380,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="/images/legacy/2021/07/screenshot-tvtime-38-how-are-you.png?w=776" alt="" class="wp-image-1380" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>In order to setup this card, you have to add these parameters to /etc/modprobe.d/bttv.conf</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><code>cat &lt;&lt; EOF &gt; /etc/modprobe.d/bttv.conf<br>
alias char-major-81 videodev<br>
alias char-major-81-0 bttv<br>
options bttv pll=1 card=120 radio=1 tuner=38 remote=1 bttv_verbose=1 gbuffers=4<br>
EOF</code></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Then, reinitialize the appropriate module:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><code># rmmod bttv; modprobe bttv</code></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Install tvtime that is my recommended program to watch the TV.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><code># yum install tvtime</code></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Configure tvtime with your norm (in my case PAL-Nc) and scan for channels.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><code>$ tvtime-configure -n PAL-Nc<br>
$ tvtime-scanner<br>
</code></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Run tvtime from your GNOME/KDE menu or running 'tvtime' .<br>For others linux distributions, like ubuntu the procedure may be similar.<a href="http://mkreder.com/wp-content/uploads/2011/05/Screenshot-tvtime-38-how-are-you.png"></a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Español</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Para configurar esta capturadora, primero tenemos que configurar los parámetros en /etc/modprobe.d/bttv.conf</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><code>cat &lt;&lt; EOF &gt; /etc/modprobe.d/bttv.conf<br>
alias char-major-81 videodev<br>
alias char-major-81-0 bttv<br>
options bttv pll=1 card=120 radio=1 tuner=38 remote=1 bttv_verbose=1 gbuffers=4<br>
EOF</code></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Luego, recargamos el modulo:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><code># rmmod bttv; modprobe bttv</code></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Instalamos TVtime, que es mi programa preferido para ver TV en la PC.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><code># yum install tvtime</code></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Configuramos tvtime con la norma correspondiente para nuestro país. Argentina es PAL-Nc</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><code>$ tvtime-configure -n PAL-Nc<br>
$ tvtime-scanner<br>
</code></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Listo! ahora podemos correr tvtime desde una consola o desde el menú de GNOME/KDE.<br>Para otras distribuciones de Linux, como Ubuntu, el procedimiento debería ser similar.<!--:--></p>
<!-- /wp:paragraph -->
