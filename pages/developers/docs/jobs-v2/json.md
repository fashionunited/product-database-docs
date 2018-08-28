---
title: Jobs v2 json
layout: page
path: "/docs/jobs-v2/json"
---

**Jobs Push API V2** enables you to _post_, _update_, and _unpublish_ jobs on the FashionUnited platform. We also provide the possibility to _retrieve_ existing jobs from our database for verification purposes. Our API follows the [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) principles and implements full [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) functionality. This page explains the usage with the **JSON** format for XML please read the [XML format documentation](/docs/jobs-v2/xml).

## Before you start

To make sure the requests are always received, we suggest you implement
[exponential backoff](https://developers.google.com/analytics/devguides/reporting/core/v3/errors#backoff)
to retry the API calls when the service is temporarily unavailable.

## Create `POST https://fashionunited.com/api/push/:sender`

Creates (or if already exists updates) multiple jobs, returns all the created (or modified jobs) in one array.

### Request

#### Headers

| header       | value            |
| ------------ | ---------------- |
| Content-Type | application/json |

#### Body

```js
;[
  {
    // unique id for the job in the external (your) system
    externalId: '00001',
    // title of the job
    // can only contain the name of the position
    // not the city, area or company
    title: 'Design Assistant',
    // list of job categories
    // supported categories are 'Design & Creative',
    // 'Internships', 'Other', 'Product & Supply Chain',
    // 'Retail Management & In-store', 'Sales & Marketing'
    categories: ['Design & Creative', 'Internships'],
    // teaser text displayed in the job list, plaintext only, no HTML allowed
    qualifications: 'Very teasing teaser',
    // description of the job, HTML is allowed
    // (when using templates, leave it empty)
    // javascript is not allowed
    description: 'We are looking for a <em>motivated</em> employee, who...',
    salary: {
      amount: 2000,
      // salary currency in ISO 4217
      currency: 'EUR',
    },
    // number of available positions
    positions: 2,
    // city of job location
    city: 'Amsterdam',
    // country of job location
    country: 'Netherlands',
    // local address of company
    address: 'Vijzelstraat 1234',
    // list of platforms where the job is to be published
    locales: ['nl-NL'],
    // true if the job receives applications via FashionUnited universal application form
    // false otherwise (external Applicant Tracking System)
    universalForm: true,
    // show the job title between the company description and the job description
    // should be false when using a template
    showTitle: false,
    company: {
      // the name of the company
      name: 'Example Fashion',
      // description about company
      // decription can be html string as well
      description:
        'Example Fashion is a <strong>great</strong> place to work...',
      // the URL of the company logo, supports: SVG, PNG, JPEG
      // SVG is recommended, since it's vector based and scalable
      logoUrl: 'https://example.com/logos/logo.svg',
      // social media sharing image (og:image) URL, supports: PNG, JPEG
      // PNG is recommended, since OpenGraph does not support SVG
      // minimum size 200 x 200 pixels
      // see: https://developers.facebook.com/docs/sharing/best-practices/
      imageUrl: 'https://example.com/images/image.png',
      // name of contact person from company
      contact: 'John Smith',
      // company contact person's phone number
      phone: '012 345 6789',
      // company contact person's email
      // this email address is used to send applications
      email: 'hr@example.com',
    },
    // the template used while displaying the job
    // when using templates, description and company description is discarded
    // the job will be displayed according to the template
    template: 'Example Fashion - Orange',
    // the properties that are provided for the template
    // for more information please refer to the used template
    // in this example, the template accepts a youtube video id
    // and an introduction text
    properties: [
      {
        // name of the property
        name: 'youtubeId',
        // type of the property, in this case text
        type: 'text',
        // value should be always a string or null
        // when using type text, HTML content is not allowed
        value: 'abcd12345',
      },
      {
        // name of the property
        name: 'introduction',
        // type of the property, in this case html
        type: 'html',
        // value should be html string
        value:
          '<div><p>This job is for people who like <strong>challenge</strong>!</p></div>',
      },
      {
        // name of the property
        name: 'disclaimer',
        // type of the property, in this case markdown
        type: 'markdown',
        // value should be html string
        value: '### Disclaimer\n\nApplying to this job...',
      },
    ],
  },
  // ...
]
```

### Response

#### Headers

| header       | value            |
| ------------ | ---------------- |
| Content-Type | application/json |

#### Body

```js
;[
  {
    // the same attributes that has been sent with attributes that we added
    id: 12345,
    // the id of the job in our system,
    // not to be confused with externalId
    createdAt: '2017-12-19T14:52:55.412Z',
    // the creation date
    updatedAt: '2017-12-19T14:52:55.412Z',
    // the date of last modification
    externalId: '00001',
    title: 'Design Assistant',
    categories: ['Design & Creative', 'Internships'],
    qualifications: 'Very teasing teaser',
    description: 'We are looking for a <em>motivated</em> employee, who...',
    salary: {
      amount: 2000,
      currency: 'EUR',
    },
    positions: 2,
    city: 'Amsterdam',
    country: 'Netherlands',
    address: 'Vijzelstraat 1234',
    locales: ['nl-NL'],
    universalForm: true,
    showTitle: false,
    company: {
      name: 'Example Fashion',
      description:
        'Example Fashion is a <strong>great</strong> place to work...',
      logoUrl: 'https://example.com/logos/logo.svg',
      imageUrl: 'https://example.com/images/image.png',
      contact: 'John Smith',
      phone: '012 345 6789',
      email: 'hr@example.com',
    },
    template: 'Example Fashion - Orange',
    properties: [
      {
        name: 'youtubeId',
        type: 'text',
        value: 'abcd12345',
      },
      {
        name: 'introduction',
        type: 'html',
        value:
          '<div><p>This job is for people who like <strong>challenge</strong>!</p></div>',
      },
      {
        name: 'disclaimer',
        type: 'markdown',
        value: '### Disclaimer\n\nApplying to this job...',
      },
    ],
  },
  // ...
]
```

## List `GET https://fashionunited.com/api/push/:sender`

Returns all the jobs from this source.

### Request

#### Headers

| header       | value            |
| ------------ | ---------------- |
| Content-Type | application/json |

#### Body

n/a

### Response

#### Headers

| header        | value                                              |
| ------------- | -------------------------------------------------- |
| Content-Type  | application/json                                   |
| Last-Modified | the last modification date of the last updated job |
| Cache-Control | must-revalidate                                    |

#### Body

```js
;[
  {
    id: 12345,
    createdAt: '2017-12-19T14:52:55.412Z',
    updatedAt: '2017-12-19T14:52:55.412Z',
    externalId: '00001',
    title: 'Design Assistant',
    categories: ['Design & Creative', 'Internships'],
    qualifications: 'Very teasing teaser',
    description: 'We are looking for a <em>motivated</em> employee, who...',
    salary: {
      amount: 2000,
      currency: 'EUR',
    },
    positions: 2,
    city: 'Amsterdam',
    country: 'Netherlands',
    address: 'Vijzelstraat 1234',
    locales: ['nl-NL'],
    universalForm: true,
    showTitle: false,
    company: {
      name: 'Example Fashion',
      description:
        'Example Fashion is a <strong>great</strong> place to work...',
      logoUrl: 'https://example.com/logos/logo.svg',
      imageUrl: 'https://example.com/images/image.png',
      contact: 'John Smith',
      phone: '012 345 6789',
      email: 'hr@example.com',
    },
    template: 'Example Fashion - Orange',
    properties: [
      {
        name: 'youtubeId',
        type: 'text',
        value: 'abcd12345',
      },
      {
        name: 'introduction',
        type: 'html',
        value:
          '<div><p>This job is for people who like <strong>challenge</strong>!</p></div>',
      },
      {
        name: 'disclaimer',
        type: 'markdown',
        value: '### Disclaimer\n\nApplying to this job...',
      },
    ],
  },
  // ...
]
```

## List headers `HEAD https://fashionunited.com/api/push/:sender`

Returns the same headers as GET, but no content. Useful to verify if the jobs have been modified.

### Request

#### Headers

| header       | value            |
| ------------ | ---------------- |
| Content-Type | application/json |

#### Body

n/a

### Response

#### Headers

| header        | value                                              |
| ------------- | -------------------------------------------------- |
| Content-Type  | application/json                                   |
| Last-Modified | the last modification date of the last updated job |
| Cache-Control | must-revalidate                                    |

#### Body

n/a

## Retrieve `GET https://fashionunited.com/api/push/:sender/:externalId`

Retrieves one job by externalId.

### Request

#### Headers

| header       | value            |
| ------------ | ---------------- |
| Content-Type | application/json |

#### Body

n/a

### Response

#### Headers

| header        | value                                 |
| ------------- | ------------------------------------- |
| Content-Type  | application/json                      |
| Last-Modified | the last modification date of the job |
| Cache-Control | must-revalidate                       |

#### Body

```js
{
  "id": 12345,
  "createdAt": "2017-12-19T14:52:55.412Z",
  "updatedAt": "2017-12-19T14:52:55.412Z",
  "externalId": "00001",
  "title": "Design Assistant",
  "categories": [
    "Design & Creative",
    "Internships"
  ],
  "qualifications": "Very teasing teaser",
  "description": "We are looking for a <em>motivated</em> employee, who...",
  "salary": {
    "amount": 2000,
    "currency": "EUR"
  },
  "positions": 2,
  "city": "Amsterdam",
  "country": "Netherlands",
  "address": "Vijzelstraat 1234",
  "locales": [
    "nl-NL"
  ],
  "universalForm": true,
  "showTitle": false,
  "company": {
    "name": "Example Fashion",
    "description": "Example Fashion is a <strong>great</strong> place to work...",
    "logoUrl": "https://example.com/logos/logo.svg",
    "imageUrl": "https://example.com/images/image.png",
    "contact": "John Smith",
    "phone": "012 345 6789",
    "email": "hr@example.com"
  },
  "template": "Example Fashion - Orange",
  "properties": [
    {
      "name": "youtubeId",
      "type": "text",
      "value": "abcd12345"
    },
    {
      "name": "introduction",
      "type": "html",
      "value": "<div><p>This job is for people who like <strong>challenge</strong>!</p></div>"
    },
    {
      "name": "disclaimer",
      "type": "markdown",
      "value": "### Disclaimer\n\nApplying to this job..."
    }
  ]
}
```

## Retrieve headers `HEAD https://fashionunited.com/api/push/:sender/:externalId`

Returns the same headers as GET, but without the body. Useful to verify if the job has been modified.

### Request

#### Headers

| header       | value            |
| ------------ | ---------------- |
| Content-Type | application/json |

#### Body

n/a

### Response

#### Headers

| header        | value                                 |
| ------------- | ------------------------------------- |
| Content-Type  | application/json                      |
| Last-Modified | the last modification date of the job |
| Cache-Control | must-revalidate                       |

#### Body

n/a

## Update `PUT/PATCH https://fashionunited.com/api/push/:sender/:externalId`

Updates one job referenced by its externalId.
Both `PUT` and `PATCH` HTTP verbs can be used.
It returns the modified job.

### Request

#### Headers

| header       | value            |
| ------------ | ---------------- |
| Content-Type | application/json |

#### Body

```js
{
  "externalId": "00001",
  "title": "Design Assistant",
  "categories": [
    "Design & Creative",
    "Internships"
  ],
  "qualifications": "Very teasing teaser",
  "description": "We are looking for a <em>motivated</em> employee, who...",
  "salary": {
    "amount": 2000,
    "currency": "EUR"
  },
  "positions": 2,
  "city": "Amsterdam",
  "country": "Netherlands",
  "address": "Vijzelstraat 1234",
  "locales": [
    "nl-NL"
  ],
  "universalForm": true,
  "showTitle": false,
  "company": {
    "name": "Example Fashion",
    "description": "Example Fashion is a <strong>great</strong> place to work...",
    "logoUrl": "https://example.com/logos/logo.svg",
    "imageUrl": "https://example.com/images/image.png",
    "contact": "John Smith",
    "phone": "012 345 6789",
    "email": "hr@example.com"
  },
  "template": "Example Fashion - Orange",
  "properties": [
    {
      "name": "youtubeId",
      "type": "text",
      "value": "abcd12345"
    },
    {
      "name": "introduction",
      "type": "html",
      "value": "<div><p>This job is for people who like <strong>challenge</strong>!</p></div>"
    },
    {
      "name": "disclaimer",
      "type": "markdown",
      "value": "### Disclaimer\n\nApplying to this job..."
    }
  ]
}
```

### Response

#### Headers

| header       | value            |
| ------------ | ---------------- |
| Content-Type | application/json |

#### Body

```js
{
  "id": 12345,
  "createdAt": "2017-12-19T14:52:55.412Z",
  "updatedAt": "2017-12-19T14:52:55.412Z",
  "externalId": "00001",
  "title": "Design Assistant",
  "categories": [
    "Design & Creative",
    "Internships"
  ],
  "qualifications": "Very teasing teaser",
  "description": "We are looking for a <em>motivated</em> employee, who...",
  "salary": {
    "amount": 2000,
    "currency": "EUR"
  },
  "positions": 2,
  "city": "Amsterdam",
  "country": "Netherlands",
  "address": "Vijzelstraat 1234",
  "locales": [
    "nl-NL"
  ],
  "universalForm": true,
  "showTitle": false,
  "company": {
    "name": "Example Fashion",
    "description": "Example Fashion is a <strong>great</strong> place to work...",
    "logoUrl": "https://example.com/logos/logo.svg",
    "imageUrl": "https://example.com/images/image.png",
    "contact": "John Smith",
    "phone": "012 345 6789",
    "email": "hr@example.com"
  },
  "template": "Example Fashion - Orange",
  "properties": [
    {
      "name": "youtubeId",
      "type": "text",
      "value": "abcd12345"
    },
    {
      "name": "introduction",
      "type": "html",
      "value": "<div><p>This job is for people who like <strong>challenge</strong>!</p></div>"
    },
    {
      "name": "disclaimer",
      "type": "markdown",
      "value": "### Disclaimer\n\nApplying to this job..."
    }
  ]
}
```

## Unpublish `DELETE https://fashionunited.com/api/push/:sender/:externalId`

Unpublishes one job by externalId and returns it.

### Request

#### Headers

| header       | value            |
| ------------ | ---------------- |
| Content-Type | application/json |

#### Body

n/a

### Response

#### Headers

| header       | value            |
| ------------ | ---------------- |
| Content-Type | application/json |

#### Body

```js
{
  "id": 12345,
  "createdAt": "2017-12-19T14:52:55.412Z",
  "updatedAt": "2017-12-19T14:52:55.412Z",
  "externalId": "00001",
  "title": "Design Assistant",
  "categories": [
    "Design & Creative",
    "Internships"
  ],
  "qualifications": "Very teasing teaser",
  "description": "We are looking for a <em>motivated</em> employee, who...",
  "salary": {
    "amount": 2000,
    "currency": "EUR"
  },
  "positions": 2,
  "city": "Amsterdam",
  "country": "Netherlands",
  "address": "Vijzelstraat 1234",
  "locales": [
    "nl-NL"
  ],
  "universalForm": true,
  "showTitle": false,
  "company": {
    "name": "Example Fashion",
    "description": "Example Fashion is a <strong>great</strong> place to work...",
    "logoUrl": "https://example.com/logos/logo.svg",
    "imageUrl": "https://example.com/images/image.png",
    "contact": "John Smith",
    "phone": "012 345 6789",
    "email": "hr@example.com"
  },
  "template": "Example Fashion - Orange",
  "properties": [
    {
      "name": "youtubeId",
      "type": "text",
      "value": "abcd12345"
    },
    {
      "name": "introduction",
      "type": "html",
      "value": "<div><p>This job is for people who like <strong>challenge</strong>!</p></div>"
    },
    {
      "name": "disclaimer",
      "type": "markdown",
      "value": "### Disclaimer\n\nApplying to this job..."
    }
  ]
}
```

## Errors

When error happens while processing the request
the respective status code is set and the errors are returned in an array.
When the HTTP status code is 200 we can assume that everything went fine,
the response is a job or an array of jobs,
otherwise, the request body contains the error messages.

* API endpoint not found, job not found (404)

  ```js
  {"errors": ["Not found"]}
  ```

  **Possible reasons:** Wrong sender or externalId provided in the URL.

* Wrong credentials, unauthorized (401)

  ```js
  {"errors": ["Not found"]}
  ```

  **Possible reasons:** Wrong username, password or the user does not have rights to post with this API.

* Method not allowed (405)

  ```js
  {"errors": ["Method not allowed"]}
  ```

  **Possible reasons:** The used HTTP verb is not valid for the provided URL.

* Validation errors, unprocessable entity (422)

  ```js
  {"errors": ["Title is required"]}
  ```

  **Possible reasons:** The created or updated jobs have missing fields or wrong values set.

* Internal server errors (500)

  ```js
  {"errors": ["Error while receiving PushAPI call"]}
  ```

  **Possible reasons:**
  Usually, this means temporary outage of the service.
  We suggest you implement
  [exponential backoff](https://developers.google.com/analytics/devguides/reporting/core/v3/errors#backoff)
  to retry the calls when these errors happen.
  When the error persists please report it
  [here](https://fashionunited.atlassian.net/servicedesk/customer/portal/9/create/24).
