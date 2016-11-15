Informations about the structure of the app M2B.


Menubar on top (from right to left)


loupe symbol:
opens sidebar which fade in from left to right. On the top of the sidebar there is a input box. On the left there is a sign, which expands the searching filter.
On the right there is the loupe, which starts the search.

If you searched something, the items are listed bellow the searchbar. You can select and deselect the items if u click on the circle on the right side of a item.
You can also expand it if u click anywhere else. In the expantion there is the picture and the other informations.


(last seen) symbol:
opens a list which shows you chronolocigaly the sets, which were learnt last.

star symbol:
shows the sets and cards, which were marked as favorite. Also a list like the last seen list.

gear symbol:
opens the option menu. Functions(options) can be added bellow
-Save data localy
- ...
- ...


Learn Side:
Asks the selected informations of the selected cards.


Functions, which have to be implemented:

objectarray search(string) --> scan all cards / sets by a name
objectarray filter(objectarray in, int option1, int option2, int option3) -->	Filters the inputarray with by the options.
data giveCard(string Cardname / int CardID) --> Gives the full cardinformations of a card
void saveLatest(string Cardname / int CardID) --> Saves the Card into a lastseen file (for example in a json)
objectarray giveLatest() --> Gives the saved Cardarray
void saveFavorite(string Cardname / int CardID) --> "
objectarray giveFavorite() --> "




Data Structure:


index.html --> opens the splashscreen, the main.js and incorporates all the includes
main.html --> opens the menubar and loads the content. As default, the last seen tab is opened.
configurationfile --> The main configurations can be set in this file.
options.js --> loaded by main.js and includes all the options
search.js --> " (maybe already included in main.js)
favorite.js --> "
filter.js --> " (maybe already included in search.js)
latest.js --> "
Folder with the functions library
