---
name: opencreator-download
description: Download every public video link in the task into the project folder. Request approval before installing yt-dlp if missing. Do not search for additional links.
---

# OpenCreator download

Use when the task has one or more public video links and no corresponding local files exist.

Download all links in the task. Do not fetch additional links. Do not use login cookies. Do not strip DRM.

1. Write each link, source site, and format to be downloaded in `produce.md` under Sources.
2. If `yt-dlp` is not installed, that is a system-wide software install — high risk. Write a `RISK-` file and wait for approval. Install only after approval, then download. Do not install OpenCreator. If the command still fails after installation, write the error and stop.
3. One video file or one audio file per link — exactly what the task needs — into the project working folder. Choose one viewable format per link; do not download every resolution.
4. Write the path of each downloaded file. The subtitle step uses those paths. If a link errors, write that link's error; keep the files that downloaded successfully.

Do not claim a file exists when it does not. When all links are done, the next step is `opencreator-subtitle`.
