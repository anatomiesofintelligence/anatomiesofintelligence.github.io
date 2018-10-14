---
layout: default
---

Collection: {{ page.collection }}
All Collections: {{ site.collections }}

# Anatomies of Intelligence Landing Page

## ToDos
* Get catalog working.
* Figure out css system

## All entries

{% assign mycoll = "entries" %}

{% for coll in site.collections %}
  {% if coll.label == "entries" %}
    {% assign entries = coll.docs %}
    {% for entry in entries %}
      <a class="entrylist" href="{{ entry.url }}">{{ entry.title }}</a>
    {% endfor %}
  {% endif %}
{% endfor %}

## All Posts

{% for coll in site.collections %}
  {% if coll.label == "posts" %}
    {% assign posts = coll.docs %}
    {% for post in posts %}
      <a class="entrylist" href="{{ post.url }}">{{ post.title }}</a>
    {% endfor %}
  {% endif %}
{% endfor %}
