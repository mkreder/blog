---
title: "A different way to connect to gtalk, Facebook chat, twitter, etc."
description: "Imagine that you are back in the past when the internet was just text and the only way to communicate with other people was IRC. Well, it's possible to connect to almost everything"
publishedAt: 2011-02-01
updatedAt: 2011-02-01
tags:
  - bitlbee
  - fedora
  - irc
  - irssi
  - tech
legacySourceUrl: https://mkreder.com/2011/02/01/a-una-forma-distinta-de-conectarse-a-gtalk-facebook-twitter-etc-por-irc/
---
<p>Imagine that you are back in the past when the internet was just text and the only way to communicate with other people was IRC.</p>
<p>Well, it's possible to connect to almost everything with bitlbee. I'm sure most of you already know probably about this, but I didn't know until yesterday and that's why I'm blogging about it.</p>
<p><strong>Installation</strong></p>
<p>As simple as:</p>
<p><code>yum -y install bitlbee<br />
</code></p>
<p><strong>Configuration</strong></p>
<p>Edit the file /etc/xinetd.d/bitlbee and change "disabled = yes" with "disabled = no"</p>
<p>Start xinetd</p>
<p><code>service xinetd start; chkconfig xinetd on<br />
</code></p>
<p><strong>First steps<br /></strong><br />Set up your favorite IRC client to connect to localhost:6667 , as bitlbee works a local IRC server in your computer,  you could easily try to connect to it with /server localhost, the persistent configuration to autoconnect will depend in your IRC client, I use a client-based old client, irssi. Once connected it will join you to a channel called &amp;bitlbee</p>
<p>Once on that channel you will have to start setuping your IM accounts, but first you may need to register to bitlbee as it  will store your credentials (I'm sorry, is the only way it works, but no worries it remains somewhere in your pc).</p>
<p>To register say in the &amp;bitlbee channel:</p>
<p><code>register PASSWORD<br />
</code><br />pick a password strong enough.</p>
<p>The next time you join this channel you will have to use:</p>
<p><code>identify PASSWORD<br />
</code><br />Now is time to start adding accounts:</p>
<p><em>Facebook</em></p>
<p><code>account add jabber youruser@chat.facebook.com yourpassword<br />
</code><br />Now you would need to set another thing to help bitlbee to bring the facebook nicknames in a friendly way.</p>
<p><code>account fb set nick_source full_name (BitlBee 3.0+)<br />
account set facebook/nick_source full_name (Older versions)</code></p>
<p><em>Gtalk</em></p>
<p>This is easy:</p>
<p><code>account jabber youruser@gmail.com yourpassword<br />
</code><br />The syntaxis is always the same "account [protocol] [user] [password]"</p>
<p><em>Twitter</em></p>
<p>Yes!, twitting from the IRC is really nice, the command would be:</p>
<p><code>account add twitter user password<br />
</code><br />it will first start a new query, giving you an URL, you have to click on that URL and it will give you a passcode, then you can put that passcode on that query and that's all, it will create a new IRC channel called #twiiter_youraccount and you can see twitter as it was a normal IRC channel:</p>
<p><em>Almost done<br /></em><br />After setting up everything you are ready to start, just run:</p>
<p><code>account on</code></p>
<p>Have fun!</p>
<p><strong>Español</strong></p>
<p>Imagínense que estan en el pasado, cuando Internet era solo texto y la unica forma de comunicarse con el mundo era IRC</p>
<p>Bueno, es posible conectarse a casi cualquier cosa con bitlbee. Quizas la mayoria ya lo conosca, pero yo no lo conocía asi que aprovecho para escribir.</p>
<p><strong>Instalación </strong></p>
<p>Tan simple como:</p>
<p><code>yum -y install bitlbee<br />
</code></p>
<p><strong>Configuración</strong></p>
<p>Hay que editar el archivo  /etc/xinetd.d/bitlbee y cambiar "disabled = yes" por "disabled = no"</p>
<p>Iniciamos xinetd</p>
<p><code>service xinetd start; chkconfig xinetd on<br />
</code></p>
<p><strong>Primeros pasos</strong></p>
<p>Configura tu cliente de IRC favorito para conectarse a localhost:6667 , como bitlbee funciona como un servidor de IRC local en tu PC, basta con conectarse usando /server localhost. La configuraion para autoconectarse cada vez que abrimos el cliente va a depender del mismo particularmente. Yo uso irssi.</p>
<p>Una vez conectados vamos a entrar a un canal llamado &amp;bitlbee</p>
<p>En este canal, vamos a empezar a configurar nuestras cuentas, pero primero, hay que registrarse con bitlbee, ya que el va a guardar nuestras passwords. (Es la unica forma de usarlo, de todos modos quedaran en nuestra PC)</p>
<p>Para registrarse hay que escribir en el canal $bitlbee</p>
<p><span style="font-family:Monaco, Consolas, 'Andale Mono', 'DejaVu Sans Mono', monospace;line-height:13px;">register PASSWORD</span></p>
<p>Elijan un password complejo.</p>
<p>Cada vez que entremos a este canal, vamos a tener que identificarnos con:</p>
<p><span style="font-family:Monaco, Consolas, 'Andale Mono', 'DejaVu Sans Mono', monospace;line-height:13px;">identify PASSWORD</span></p>
<p>Ahora si podemos empezar a agregar las cuentas</p>
<p><em>Facebook</em></p>
<p><code>account add jabber usuario@chat.facebook.com clave<br />
</code></p>
<p>También hay que configurar otra cosa más ya que sino bitlbee va a traer todos los nicks en un formato ilegible.<br /><code>account fb set nick_source full_name (BitlBee 3.0+)<br />
account set facebook/nick_source full_name (Older versions)</code></p>
<p><em>Gtalk</em></p>
<p>es facil:</p>
<p><code>account jabber usuario@gmail.com password<br />
</code><br />La sintaxis es siempre la misma "account [protocolo] [usuario] [password]"</p>
<p><em>Twitter</em></p>
<p>Twittear desde el IRC esta muy bueno, el comando sería:</p>
<p><code>account add twitter user password<br />
</code></p>
<p>Esto va a abrir un privado con una URL, tenemos que entrar a esa URL y después poner en el privado el passcode que nos devolvió twitter. Esto va a abrir un canal de IRC llamado #twitter_cuenta, y podemos empezar a usar twitter como si fuera un canal de IRC más.</p>
<p><em>Casi terminamos</em></p>
<p>Una vez que todas las cuentas están configuradas debemos correr:</p>
<p><code>account on</code></p>
<p>Diviértanse!</p>

![](/images/legacy/wp/screenshot-matias40flame-1-1.png)

![](/images/legacy/wp/screenshot-matias40flame-3-1.png)

![](/images/legacy/wp/screenshot-matias40flame-2.png)
