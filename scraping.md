For ratemyprofessor I first expanded the list of all the professors with

```js
let click_interval = setInterval(() => document.getElementsByClassName("Buttons__Button-sc-19xdot-1 PaginationButton__StyledPaginationButton-txi1dr-1 glImpo")[0].click(), 1000)
```
and then got the data with
```js
document.getElementsByClassName("CardName__StyledCardName-sc-1gyrgim-0")
```
I then parsed through it using Uiua with the following code:
```
&fras "rmp_dump.json"
°json
SplitNewline ← ⊜□⊸≠ @\n
ParseProf ← (
  ↘₁
  ⍜⊡₀⋕
  ⍜⊡₁(⋕↘₋₈°□)
  ⍜↻₄↘₁
  ⍣⍜⊡₄(⋕↘₋₁°□)
  ⍜↻₅↘₁
  ⍜⊡₅⋕
  ⍜↻₆↘₁
)
⍚SplitNewline
⍚ParseProf
json
°&clip
```
This copied the output into my clipboard for ease of putting it into another file.