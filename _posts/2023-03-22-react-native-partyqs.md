---
layout: post
title: "A brief history of Party Qs"
---

[Party Qs][partyqs.com]{:target="_blank"} is one of the top questions app for iOS and Android, with over
2,000 curated questions and 250,000 total downloads. It's a side-project that I've worked on with
[Dave Schools][dave]{:target="_blank"} since the summer of 2016.

Its first line of code was written July 15, 2016 (thanks source control!). And now, nearly seven years later,
we're live on the [world wide web][app.partyqs.com]{:target="_blank"}!

{% include image.html alt="Party Qs - First Commit"
   src="https://user-images.githubusercontent.com/5856011/226977818-046ad4e8-3866-431a-bfa5-6fec9c7bd468.png" %}

Prior to Party Qs, I dabbled in native app development by publishing (or failing to publish) various
mobile apps (see [Sneeki][sneeki], [Offliner][offliner], [Flippit][flippit], and [MySecretary][mysecretary]). Those
apps (other than Sneeki) were only written for iOS. However, Sneeki was my most successful app, so I wrote a dedicated
Android app for it.

Having two separate code bases for the same app proved to be challenging. I found myself reimplementing features on
Android that I had already added to iOS (or vice-versa) as well as having twice the number of bugs.

When Facebook announced React Native in 2015, I knew that I had to try it out. In the summer of 2016, I accepted an offer
to start working for WillowTree apps (an agency in Charlottesville, VA) and was told that I'd be using React.

Having never used React (at my previous jobs I had used Angular 1 & 2) and wanting to build a questions app with Dave, it
felt like the perfect opportunity to give React Native a shot.






- Migrating from React Native to Expo
  - Testing w/ detox
- Adding React Native Web support
- Benefits of testing

[app.partyqs.com]: https://app.partyqs.com
[partyqs.com]: https://www.partyqs.com
[dave]: https://twitter.com/daveschoools
[sneeki]: https://deh.li/2014/12/31/sneeki.html
[offliner]: https://deh.li/2014/06/30/offliner.html
[flippit]: https://deh.li/2014/06/03/flippit.html
[mysecretary]: https://deh.li/2014/05/04/mysecretary