#############
Documentation
#############

The documentation for this repo is built using Sphinx, the site is re-built
on each release of the card and pushed to github pages.

*****************
How to Contribute
*****************

There are two ways of contributing to the documentation:

#. Editing the files within the ``docs`` folder.
#. Raising an issue for something to be fixed on the next release.

The documentation utilises `Sphinx RestructuredText <https://www.sphinx-doc.org/en/master/usage/restructuredtext/>`_

************
Adding pages
************

To add new pages, add a new file in the appropriate directory, and then add a reference
to the ``toc.rst`` file under the correct heading.

You can test the pages added by running the command ``yarn run docs-build``
