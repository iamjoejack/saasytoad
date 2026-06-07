# Character art

Each SaaSyToad's portrait. These show up automatically across the site: the
homepage crew explorer, the `/crew` page, the in-app agent tags, and the "Ask
the crew" chat. If a file is missing, that toad falls back to its line icon (so
a missing file never breaks anything).

## Files

512x512 transparent PNG, cropped to just the toad (no "Saasytoad" wordmark
banner, no background box), since the avatars are shown in a round frame.

| File          | Character |
| ------------- | --------- |
| `ronald.png`  | business toad, monocle + suit + thumbs up |
| `camille.png` | marketing toad |
| `dbug.png`    | punk engineer toad, tongue out |
| `amanda.png`  | social toad with the phone, pink hair |
| `sammy.png`   | creative toad, backwards cap + laptop |

## How the current set was made

Source: the transparent five-character sheet (kept in the gitignored
`brand-assets/`). Each toad was face-framed with `sharp` (extract a square that
keeps the toad and pushes the wordmark banner below the bottom edge, then resize
onto a 512x512 transparent canvas) and saved as a 256-color palette PNG
(`palette: true, colors: 256, dither: 1.0`), which keeps the art sharp while
landing each file around 150KB instead of ~540KB.

Per-toad square crops used (source-sheet pixel coords, left/top/side):

    ronald  144,  60, 250
    camille 691,  85, 210
    dbug   1121,  55, 285
    amanda  405, 545, 258
    sammy   908, 545, 268

To replace the art, drop new square transparent PNGs here under the same
filenames (400x400 or larger) and they take over.
