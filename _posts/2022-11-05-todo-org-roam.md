---
layout: post
title: "Org-roam TODO and Version Control"
preview: "How I use org-roam."
---

At my last job (ArcheMedX), I was exposed to [Roam Research][roam-research]{:target="_blank"}
(thanks Justin 🙂). For those who don't know what Roam Research is, it's
a note-taking tool that allows you to write notes that bidirectionally link
to each other. After leaving ArcheMedX, I started to use a similar Emacs library:
[`org-roam`][org-roam]{:target="_blank"}.

I extensively use `org-roam` to track my TODO items by tagging each task
with the TODO node. I then use the following function to quickly view my
todo tasks (bound to `C-c n t`).

{% highlight elisp %}
(defun org-roam-display-todo ()
  "Display and select org-roam dedicated buffer for TODO."
  (interactive)
  (-> (org-roam-node-from-title-or-alias "TODO")
      org-roam-buffer-display-dedicated
      select-window)
  (magit-section-show-level-2))
{% endhighlight %}

From within Emacs, the above function will render a buffer like:

```
TODO
Backlinks (3)
2022-11-04 (TODO Redesign PartyQs home screen)...
2022-11-04 (TODO Write blog-post about org-roam)...
2022-11-05 (TODO Setup RSS for site)...
```

As I complete tasks, I'll update the node to be DONE which will
prevent it from showing up when calling the above function. I
also utilize MIGHTDO for tasks that I'd like to get to one day.

I utilize Git to version control all my notes. Even though my
notes are only modified by me, I like to see how they have
changed over time. It also allows me to completely change my
notes without worrying about losing them.

I wrote an Emacs function that runs at a regular interval using
[Midnight][midnight]{:target="_blank"} to call `git add`,
`git commit`, and `git push`.

{% highlight elisp %}
(defun org-roam-git (cmd)
  "Execute `git CMD` from the org-roam repo."
  (shell-command
   (format "cd %s && git %s"
           org-roam-directory
           cmd)))

(defun org-roam-git-add-commit-push ()
  "Add files, commit them, and then push to org-roam repo."
  (interactive)
  (org-roam-git "add ./**/*.org")
  (org-roam-git "commit -m 'Add notes using emacs.'")
  (org-roam-git "push"))

;; Trigger midnight-hook every 7200 seconds (2 hours)
(setq midnight-period 7200)
(midnight-delay-set 'midnight-delay "00:00")

(add-hook 'midnight-hook 'org-roam-git-add-commit-push)
{% endhighlight %}

You can check out my full Emacs config on
[Github][emacs]{:target="_blank"}.

[emacs]:         https://github.com/dehli/.emacs.d/
[midnight]:      https://www.emacswiki.org/emacs/MidnightMode
[org-roam]:      https://www.orgroam.com/
[roam-research]: https://roamresearch.com/