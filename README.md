<hr />
<div align="center">
    <img src="client/public/usenanologo.png" alt="Logo" width='300px' height='auto'/>
</div>
<hr />

## UseNano.org


[UseNano.org](https://usenano.org) is a website that lists all merchants that accept Nano as payment.


### Contributing


If you want to contribute, that's great! We need designers, programmers and everybody that want's us to add a new store.

To add a new store, simple head over to the [Physical Store](https://github.com/LilleJohs/UseNano.org/blob/master/public/physical.yml) or [Online Store](https://github.com/LilleJohs/UseNano.org/blob/master/public/merchants.yml) yaml file and fill in the required information. Make sure that every new listing has all the fields filled out. Put logos in the [Logo](https://github.com/LilleJohs/UseNano.org/tree/master/client/public/logos) folder. The logos should be 128x128 pixels and preferably .png. If you have no logo for the store, just enter 'none.png' as logo. For website links, remember to add 'http://' or 'https://'.

You can also just send me a message on Reddit [u/LilleJohs](https://www.reddit.com/user/LilleJohs) or send an email to spendnano@gmail.com with the store details.

If you want to add a new feature or make a better design for the website, please contact me and we'll discuss it.


### Run in development

The website runs with Nodejs on backend and React on front end. To run it locally, download all dependencies on both client side and server side, go to root folder and run the command 'npm run dev' in the root folder. Note that you will need to provide your own Google Maps API key to make the map function work.
