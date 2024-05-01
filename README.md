# JustMyToots.com

This is a little website that works as an extension to Mastodon. It displays
the toots but not the boosts for a particular user. It helps people that want
to showcase their toots, for example when doing jokes, drawings, photos or any
other form of content people might want to look back through.

To create your own, simply add your user identifier to the main url like this:

https://justmytoots.com/@user@example.social

For example for me that would be:
https://justmytoots.com/@cookie_mumbles@ohai.social


## Local setup

This project is only a static website, but uses npm for some build logic. To
build the project, first install npm if you haven't already. Then clone the
repo and start a local server with the following command:

```
node app.js
```
You should now be able to access the locally hosted server at:
```
localhost:8008
```

Then you can request any mastodon user from your local machine like this:
`http://localhost:8008?acct=@user@example.social`. Notice the additional
property syntax `?acct=` that is different from the server, as the local server
does not respect the `.htaccess` rules atm.

## Contribution

If you'd like to contribute, just look through the
[Issues](https://github.com/cookiemumbles/justmytoots.com/issues/) I've already
created for something you could help with, or create a new Issue or DM me on
Mastodon if you have any good ideas.
