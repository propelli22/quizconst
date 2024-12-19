> [!NOTE]
> Tämä projekti on vielä kesken ;(  / Project is still under developement ;(
> 
> Versio 1 valmiina 13 tammikuuta 2025 mennessä / Version 1 to be finished by 13 of January 2025

## 🇫🇮
# Quizconst

Quizconst on (kröhm... quizletin ja kahootin kopio/sekoitus) tietovisa peli jossa voi pelata kavereiden kanssa kisaa eri aiheiden kanssa ja selvittää kuka on kaikista fiksuin jossakin aiheessa.

## Idea

Quizconstin idea on saatu osittain quizletistä ja osittain netistä löydettyjen ideoiden sekoituksena. Projektissa oli tavoitteena täyttää kurssin ryhmäprojektin vaatimukset, eli piti keksiä luovia (tai ei niin luovia) ratkaisuja jotta vaatimukset tuli täyteen.

Keksimme useita projekti ideoita kuten tuotteen hintojen vertailu sivusto, tarina peli, keskutelualusta, verkkokauppa, jne. Lopulta päädyimme tietovisa peliin, koska siinä oli monipuolisesti tekemistä ja tiedettiin täyttävän lähes kaikki arviointi kriteerit.

## Suunnittelu

Projektin suunnittelu vaiheessa käytiin läpi yhdessä sivuston rautalanka -malli, palvelin puolen suunnittelu ja tietokanna suunnittelu. 

Suunnittelu vaiheessa käytiin myös läpi yleisesti sivuston visuaalinen suunitelma, johon tehtiin muutoksia myöhemmin projektin loppuvaiheissa. Visuaalisessa suunittelussa käytiin läpi useita eri väripaletteja ja teemoja.

Yleisten suunitteluiden jälkeen pohdittiin lisä toimintoja mitä peliin voisi lisätä, kuten, käyttäjätilit, omien aiheiden luonti, ylläpitäjien asetukset, jne.

Pelin tekniseen toteutuksen suuniteltiin läpi miten pelin dataa siiretään palvelimelta toiselle, ja mitä tietoja lähetetään käyttäjälle.

## Työnjako

Projektissa työnjako toteutettiin tasaisesti huomioiden kaikkien taidot

* Boris Savushkin - frontend (aiheen luonti -sivu)
* Kalle Kahri - front- ja backend (etu -sivu, peli -sivu, aula -sivu, aiheen luonti -sivu), tietokannan toteutus
* Mike Luong - front- ja backend (etu -sivu, admin asetukset, kirjautumis ja rekisteröitymis -modal, piste laskuri)
* Thomas Zeilstra - frontend (aula -sivu)

## Toteutus

Sivuston frontend päätettiin toteuttaa käyttäen EJS -muotoa kieli tuen ja uudelleen käytettävien komponenttien takia, oli tiedossa projektin alusta alkaen jo että sivustoille ladataan lähes aina eri tietoa ja todettiin että EJS on tässä tapauksessa sopiva, toinen vaihtoehto olisi ollut React, mutta sitä ei valittu koska Kalle oli projektissa ainut joka osasi käyttää Reactia.

Backend toteutettin Node.js express palvelimena, Node.js valittiin ryhmän kokemuksen takia, ryhmässä ei projektin aloituksessa oikein osattu muita backend kieliä joten Node.js oli helppo valinta. Samasta syystä valittiin myös MySQL tietokannan puolelle.

## Testaus

Testaus/tuomio -päivä, 13.1.2025. WEB23A kaverit kutsuttu testaamaan / rikkomaan projektimme täysin.

## Kiitokset!

Projektissa avusti:

* Aava Kiesilä - värimäärittely

## Info

Quizconstin toteutti,

Boris Savushkin, Kalle Kahri, Mike Luong, Thomas Zeilstra

Projekti toteutettu osana Business College Helsingin ohjelmistokehittäjänä toimiminen -kurssia, 2024-2025
  

## 🇬🇧
# Quizconst

Quizconst is a multiplayer trivia game where you can compete against your friend in different subjects, and figure out whos the smartest in the group.

## Idea

The idea for quizconst was inspired from quizlet and other sources from the internet. The goal of the project was to fill all the requirements of the group project, so alot of creative (and not so creative) solutions had be figured out.

We came up with multiple different ideas, like, a price comparison website, a story game, a forum website, a webstore, etc. In the end we ended up on a trivia game, because it had a lot of versatile things to do and we knew it would meet most of the grading requirements.

## Planning of the project

During the planning phase of the project, we made a wireframe model of the websites structure, server side planning and the database structure.

In the planning phase, we went trough the visual style of the website, how everything would be structred in the final result, these were changed later on as the project went further. We also went trough different color palettes and themes.

After planning all the main stuff that we knew the project needed/we wanted in it, we listed different extra functions that we could implement like, user profiles, custom games, admin settings, etc.

The technical implementation was also planned, we discussed how data would be sent from a server to another, and what would be sent to the user.

## Task distributation

The distributation of tasks was made fairly aknowledging the skills of all participants

* Boris Savushkin - frontend (create a game)
* Kalle Kahri - front- ja backend (frontpage, main game, lobby, create a game), database implementation
* Mike Luong - front- ja backend (frontpage, admin setting, login- and register modal, point calculator)
* Thomas Zeilstra - frontend (lobby)

## Developement

The frontend was made using EJS, we chose EJS as we needed to implement multiple languages and reusable compnents, we didn't chose something like React as the only one in the project who knew React in the beginning was Kalle, so using anything else was not really an option.

The backend was built using an Node.js express server, we chose Node.js as that was what everyone in the project knew best in the beginning of the project. For the same reason, we chose MySQL for the database.

## Testing

Testing of v1 -day, 13.1.2025. WEB23A friends have been invited to test / break the project entirely.

## Special thanks to!

This project was made with the help of:

* Aava Kiesilä - color selection

## Info

Quizconst was made by,

Boris Savushkin, Kalle Kahri, Mike Luong, Thomas Zeilstra

Project done at Business College Helsinki, as part of the "Ohjelmistokehittäjänä toimiminen" -course, 2024-2025
