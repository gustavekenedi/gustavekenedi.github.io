---
layout: page
permalink: /research/
title: research
description: Ongoing research, working papers, publications and policy reports
years: [2021,2020,2019,2018]
nav: true
---

### ongoing research
<div class="publications">

{% for y in page.years %}
  <!-- <h2 class="year">{{y}}</h2> -->
  {% bibliography -f ongoing -q @*[year={{y}}]* %}
{% endfor %}

</div>

### working papers
<div class="publications">

{% for y in page.years %}
  <!-- <h2 class="year">{{y}}</h2> -->
  {% bibliography -f working_papers -q @*[year={{y}}]* %}
{% endfor %}

</div>

### publications
<div class="publications">

{% for y in page.years %}
  <!-- <h2 class="year">{{y}}</h2> -->
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>

### policy reports
<div class="publications">

{% for y in page.years %}
  <!-- <h2 class="year">{{y}}</h2> -->
  {% bibliography -f policy -q @*[year={{y}}]* %}
{% endfor %}

</div>
