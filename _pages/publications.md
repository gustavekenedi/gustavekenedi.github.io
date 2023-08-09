---
layout: page
permalink: /research/
title: research
description: Publications, working papers, ongoing research, and policy reports
years: [2025,2024,2023,2022,2021,2020,2019,2018]
type: [in progress]
nav: true
publications: false
---

### publications
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

{% for y in page.type %}
  <!-- <h2 class="year">{{y}}</h2> -->
  {% bibliography -f ongoing -q @*[abbr={{y}}]* %}
{% endfor %}

</div>

### pre-phd publications and policy reports
<div class="publications">

{% for y in page.years %}
  <!-- <h2 class="year">{{y}}</h2> -->
  {% bibliography -f policy -q @*[year={{y}}]* %}
{% endfor %}

</div>
