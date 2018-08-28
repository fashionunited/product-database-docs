---
title: Logo
layout: page
path: "/docs/logo"
---

## Quality Assurance

### SVG logo

SVG is an image format for vector graphics. It literally means Scalable Vector Graphics. Basically, what you work with in Adobe Illustrator. You can use SVG on the web pretty easily, but there is plenty you should know.

#### Why use SVG at all?

* Small file sizes that compress well
* Scales to any size without losing clarity (except very tiny)
* Looks great on retina displays
* Design control like interactivity and filters

#### SVG requirements

In order to make the SVG images responsive in all the browsers it's important to follow the following requirements:

* Remove the height and width from the svg tags.
* Add preserveAspectRatio="xMinYMin meet".

Example:

SVG tag before:

```html
<svg version="1.1" id="underground-sign" xmlns="http://www.w3.org/2000/svg"
width="960px" height="560px" viewBox="0 0 960 560" xml:space="preserve">
```

SVG tag after:

```html
<svg version="1.1" id="underground-sign" xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 960 560" preserveAspectRatio="xMinYMin meet">
```

This will ensure that the SVG image will resize to any container.

In addition, the aim of this section is to ensure the maximun quality of the images in any device specially smartphones. Thus, we strongly recommend to use the path property for shaping the image instead of an image tag inside the svg tag.

[Source: W3C](https://www.w3.org/TR/SVG/single-page.html#coords-PreserveAspectRatioAttribute)

#### SVG at FashionUnited

For all job feed integrations and job postings we are able to use SVG. Logo's are therefore best supplied in SVG format.

TLDR; If you want your brand to look best on the internet, on all devices, use SVG.

### FashionUnited Logo Usage

The logo makes the link between fashion and uniting everyone working within the industry, which of course the name FashionUnited embodies. It is displayed in a stylish and modern font, with an emphasis on the word United by making that bold.

The normal logo with FASHIONUNITED spelled together is preferred. But in terms of size, this is sometimes suboptimal,
therefore the square version created. It must always be accompanied by the circular logo with the F in it, or favicon.

In principle, the logo will only be used in black or in white. The background color or the image the logo is placed upon may vary in color, so obviously it depends on that whether the white or black logo is to be used.
