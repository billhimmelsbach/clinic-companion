# Clinic Companion: Helping You Find The Right Choice For Your Abortion Services

*When people seek abortive medical services online, they face a confusing mix of search results: questionable and advertisements, anti-choice crisis pregnancy centers masquerading as abortion clinics, and siloed and outdated lists of clinics without user-centric designs. Clinic Companion empowers patients to decide the best choice for them, giving them highly relevant search results from a curated abortion clinic database. By incorporating a forum for the sharing of clinic experiences, linking to financial assistance, and a empathetic user-first design philosophy, Clinic Companion seeks to dismantle the stigma and confusion around making reproductive services decisions.*


## Technologies Used

* Google Map JavaScript API
* MongoDB / Mongoose / $.near & 2Dindex
* Materialize CSS
* Passport / Express User Authorization
* Handlebars with Conditional Templating and Custom Helper Functions
* JavaScript
* jQuery
* HTML/CSS
* Object Orientated Design


## Existing Features

* Google Geocoded search bar that allows for any search parameters while also correcting for spelling
* Custom Google Maps API implementation for displaying and manipulating MongoDB databases
* Modular $.near search functionality for sorting custom geodata
* Secure admin login for access to add clinic API functionality
* Conditional templating for displaying pertinent clinic information to the user
* DocASAP API linking for booking appointments
* Object orientated design and modular database structure allows allows easy scope scalability and data portability
* Materialize CSS and custom jQuery animations provide a one page, fluid user experience
* Users can post their own stories about their experiences, with stories sorted by clinic


## Planned Features

* Increase database scope: Clinic Companion currently only has a database seeded with North Bay clinics. The database structure and website design were constructed with a national scope in mind, but the site is currently limited by data entry drudgery. Either time had to be dedicated to more data entry, or a python based data entry automization program needs to be implemented.
* An appealing splash page was designed, but never implemented. Currently the page lacks Clinic Companion branding.
* More responsive design, particularly for small and large devices with more precise Materialize and CSS styling. Since many users may be using their phone for access, a more mobile-first design is needed.
* A refactoring run to cut down on repetition, particularly in repetitive Handlebars functions.
* With the ability to display custom information for each clinic, a more responsive template needs to be created based on the available data. For instance, if a user is searching for a clinic in a restrictive state like Mississippi, more relevant information should be displayed regarding price, what anti-choice restrictions are in place, etc.
* Although there is an error message for server failure, there needs to be a fail message if a bad geocode is generated instead of an alert. Methods were attempted but failed.
* The seed file isn't as modular as it needs to be for a national database. The seeding function needs to modularized.
* Images of clinics are based on static URLs which are cumbersome, a dynamic Google Street view should be instead implemented.
* The DocASAP link should instead use a collapsable API call to dynamically load the scheduling information directly onto the page.


---

![clinic-companion:](https://i.imgur.com/os2b2VZ.png "clinic-companion")
