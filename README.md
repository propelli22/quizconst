> [!NOTE]
> Tämä projekti on viellä kesken ;(  / Project is still under developement ;(
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

## Info

Quizconstin toteutti,

Boris Savushkin, Kalle Kahri, Mike Luong, Thomas Zeilstra

Projekti toteutettu osana Business College Helsingin ohjelmistokehittäjänä toimiminen -kurssia, 2024-2025
