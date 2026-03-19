---
title: "pack de idioma castellano utf-8 corregido para b2evolution"
description: "Me tome un rato para corregir el pack de idioma castellano para b2evolution, tenía un problema para tomar los acentos en el tema, por ejemplo podíamos encontrar algo así como \"Cate"
publishedAt: 2010-02-21
updatedAt: 2010-02-21
tags:
  - castellano
  - espanol
  - pack
  - spanish
  - technical
  - utf-8
legacySourceUrl: https://mkreder.com/2010/02/21/pack-de-idioma-castellano-utf-8-corregido-para-b2evolution/
---
<p>Me tome un rato para corregir el pack de idioma castellano para b2evolution, tenía un problema para tomar los acentos en el tema, por ejemplo podíamos encontrar algo así como "CategorÃ­as" en vez de "Categorías", el problema se solucionaba según leí en el <a href="http://forums.b2evolution.net/viewtopic.php?p=61340&amp;sid=fc03f89f32d75f8b1d7c9aac071f08c7">foro</a> de b2evolution remplazando en el archivo _global.php los siguientes caracteres:</p>
<p><span class="postbody"><code>á =&gt; &amp;aacute; <br /> é =&gt; &amp;eacute; <br /> í =&gt; &amp;iacute; <br /> ó =&gt; &amp;oacute; <br /> ú =&gt; &amp;uacute; <br /> ü =&gt; &amp;uuml; <br /> ñ =&gt; &amp;ntilde; <br /> Á =&gt; &amp;Aacute; <br /> É =&gt; &amp;Eacute; <br /> Í =&gt; &amp;Iacute; <br /> Ó =&gt; &amp;Oacute; <br /> Ú =&gt; &amp;Uacute; <br /> Ü =&gt; &amp;Uuml; <br /> Ñ =&gt; &amp;Ntilde; <br /> ¡(admiración) =&gt; &amp;iexcl; <br /> ¿ =&gt; &amp;iquest; <br /> " =&gt; &amp;quot;</code></span></p>
<p>Después de modificarlo lo comprimí, pueden descargalo <a href="/media/blogs/MatiasKreder/es_ES.tar.gz">aquí</a>.</p>
