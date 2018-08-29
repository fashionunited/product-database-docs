export { default as theme } from '../../theme'

---

title: FashionUnited for Websites
layout: page
path: "/docs/fashionunited-for-websites"

---

Fashionunited for Websites is a suite of embeddable widgets, buttons, and client-side scripting tools to integrate Fashionunited and display jobs on your website or JavaScript application, including Embedded Jobs.

### Embedded Job Accordion

(Embed jobs on your site, loaded from our API)

With this API one can easily display jobs on one's own website while the jobs are being hosted by us. This allows people to not worry about having to setup an infrastructure to handle vacancies and also generates far more traffic than publishing jobs on their own website.

Some examples:

[WE fashion Branding Page](https://fashionunited.nl/wefashion-vacatures), [A.S.Adventure Branding Page](https://fashionunited.be/asadventure-vacatures), [Adidas Branding Page](https://fashionunited.de/adidas-jobs), [GAB](http://www.gab.eu/jobs/)

To place this API in your own website, all you need to do is paste a bit of code on any page or site you want for it to display. It is in fact more easy than embedding a YouTube video.

```html
<div
  class="fu-embed-jobs"
  data-locales="en-US,nl-NL"
  data-category="Design & Creative"
  data-profile_id="2HycEba6EMxMYbyJN"
  data-keywords="fashionweek"
  data-limit="20"
  data-skip="15"
  data-component="CompanyJobs">
</div>
<div
  class="fu-embed-jobs"
  data-locales="de-DE,es-PE"
  data-component="HomePageJobs">
</div>
<script src="https://fashionunited.com/global-assets/jobs-embed/embed.js" async></script>
```

_Remove the filters which are not needed._

### Attributes

- data-locales: Comma separated list of locales to be displayed, all meteor job board locales if ommitted

- data-category: Name of category to be displayed, possible values:

  - "Design & Creative",
  - "Internships",
  - "Other",
  - "Product & Supply Chain",
  - "Retail Management & In-store",
  - "Sales & Marketing"

- data-profile_id: mongodb \_id of the profile to be displayed

- data-keywords: keywords to filter on (same as you would type it in the search field in the meteor job board)

- data-limit: number of jobs to be displayed (default is 10)

- data-skip: number of jobs to be skipped (for pagination)

- data-component: which component to use when displaying jobs:
  - "CompanyJobs": show the jobs for an external company page (default).
  - "HomePageJobs": show jobs for our home pages.
  - "SearchJobs": add a search box to the CompanyJobs.
