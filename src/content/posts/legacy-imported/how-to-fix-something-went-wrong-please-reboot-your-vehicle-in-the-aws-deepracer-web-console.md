---
title: "How to fix \"Something went wrong. Please reboot your vehicle\" in the AWS Deepracer Web Console"
description: "If you are seeing an error like this while trying to connect to your car's console you need to perform the following actions: Connect your AWS DeepRacer vehicle to a monitor. You'l"
publishedAt: 2021-07-13
updatedAt: 2021-07-13
tags:
  - aws
  - deepracer
  - hardware
  - ubuntu
legacySourceUrl: https://mkreder.com/2021/07/13/how-to-fix-something-went-wrong-please-reboot-your-vehicle-in-the-aws-deepracer-web-console/
---
<!-- wp:image {"id":1435,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="/images/legacy/2021/07/image.png?w=1024" alt="" class="wp-image-1435" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>If you are seeing an error like this while trying to connect to your car's console you need to perform the following actions:</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><li>Connect your AWS DeepRacer vehicle to a monitor. You'll need an HDMI-to-HDMI, HDMI-to-DVI, or similar cable. Insert a compatable end of the cable into the HDMI port on the vehicle's chassis and plug the other end into a supported display port on the monitor.</li><li>Connect a USB keyboard and mouse. There are three AWS DeepRacer compute module USB ports in the front of the vehicle, on either side of, and including the port the camera is plugged into. A fourth USB port is found at the back of the vehicle. From above, the USB port is located in the space between the compute battery and the LED tail light.</li><li>Turn on your DeepRacer and wait until the Login screen appears. Once it appears, login using username and password "deepracer".</li><li>Open a terminal and run:</li></ol>
<!-- /wp:list -->

<!-- wp:code -->
<pre class="wp-block-code"><code>sudo apt-get update
sudo apt remove aws-deepracer-core
sudo apt-get upgrade # I believe this step might not be necessary but it's what I have done while troubleshooting my car
sudo apt install aws-deepracer-core aws-deepracer-intel-dldt aws-deepracer-pyudev aws-deepracer-sample-models aws-deepracer-util aws-deepracer-webserver
sudo reboot</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Once your Car booted you should be able to use the Web Console again.</p>
<!-- /wp:paragraph -->
