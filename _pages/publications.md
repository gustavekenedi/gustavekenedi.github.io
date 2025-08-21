---
layout: page
permalink: /research/
title: research
description: publications, working papers, ongoing research, and policy reports
years: [2025,2024,2023,2022,2021,2020,2019,2018]
type: [WP soon, in progress]
nav: true
nav_order: 2
---

### publications
<!-- _pages/publications.md -->
<div class="publications">

  {% for y in page.years %}
    <!-- <h2 class="year">{{y}}</h2> -->
    {% bibliography -f papers -q @*[year={{y}}]* %}
  {% endfor %}
</div>

### working papers
<div class="publications">

{% for y in page.years %}
  <!-- <h2 class="year">{{y}}</h2> -->
  {% bibliography -f working_papers -q @*[year={{y}}]* %}
{% endfor %}

</div>

### ongoing research
<div class="publications">

{% for y in page.years %}
  <!-- <h2 class="year">{{y}}</h2> -->
  {% bibliography -f ongoing -q @*[year={{y}}]* %}
{% endfor %}

</div>

### pre-phd publications and policy reports
<div class="publications">

{% for y in page.years %}
  <!-- <h2 class="year">{{y}}</h2> -->
  {% bibliography -f policy -q @*[year={{y}}]* %}
{% endfor %}

</div>
