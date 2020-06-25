### General
- Home.html is the entry page, please use it to start for testing all the functions.
- You can also start from other pages to check the structure however, some of their functions may be wrong(lacking in parameter from other pages).

### Pages
#### Pages which connected into group:
- Home.html: the entry page.
- HowToPlay.html: manual page.
- Loading.html: loading page.
- Gaming.html: page for game.
- Result.html: page for result of the game.

#### Unused page:
- Pause.html: for pause function(if is needed).

### Functions for current design
#### General
- Current UI can function in both PC browser and mobile view(most of the mobile phone types given in chrome).
- If use Chrome browser, please use F11 button for developer tool and select mobile view to check for different types of mobile devices.
#### Home.html
- Three start buttons for different difficulty levels, click then jump to Loading page with level parameter.
- HowToPlay button for manual, click than link to the manual.

#### HowToPlay.html
- Home button for backing to the Homepage.

#### Loading.html
- Wait for 2s then jump to Gaming page with difficulty level parameter.

#### Gaming.html
- Now I add a button "click here" for clicking to simulate the inreraction with the inner game system, the "score" will count the number.
- Countdown starts from 8s/5s/3s for different difficulty levels respectively, when become 0s, jump to Result page.

#### Result.html
- Shows the score counted in Game page.
- Countdown starts from 3s, when become 0s, jump to Loading page with the same difficulty level then start the game again.
- Home button for backing to the Homepage.