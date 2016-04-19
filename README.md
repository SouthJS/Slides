
# SouthJS - Slides and Talks

## Overview

This repository contains all slides and talks held by us
on professional events and conferences. They are intended
to work standalone and don't require any prerequisites.

## CommonMark to HTML

We use CommonMark (Markdown) to write our slides, because
we are much faster with that than with manually escaping
all HTML entities 'n shit.

The Generator for the slides requires `node.js` installed.

```bash
cd /path/to/Slides;

./bin/generate.sh;  # Generator requires node.js
./bin/serve.sh;     # Simple HTTP server (using python or python3)
```
