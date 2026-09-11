# WORKFLOW FIRST — Aplikacja iPhone

## Pierwsza czynność

Przeczytaj najpierw cały plik START_HERE.md. Jest on nadrzędną, kompletną instrukcją przejęcia projektu. Następnie przeczytaj HANDOFF.md.

## Cel

Repozytorium jest głównym źródłem projektu aplikacji na iPhone. Właściciel opisuje zmianę w ChatGPT Work, a agent wykonuje implementację, testy, commit i push. Użytkownik nie powinien ręcznie kopiować kodu.

## Zasady dla kolejnego agenta

1. Najpierw przeczytaj WORKFLOW_FIRST.md, HANDOFF.md, README.md, package.json, app.json i App.js.
2. Nie twórz projektu od nowa i nie mieszaj go z IDOL-Genesis ani Kalendarzem Kierowcy.
3. Pracuj na aktualnym main i zachowuj istniejące funkcje.
4. Po zmianie uruchom kontrolę, sprawdź diff, zrób czytelny commit i push.
5. Aktualizuj HANDOFF.md, gdy zmienia się architektura, workflow lub stan prac.
6. Docelowy przepływ: agent -> GitHub main -> Expo/EAS -> iPhone.

## Minimalna obsługa użytkownika

- Użytkownik opisuje oczekiwany efekt.
- Agent robi łatkę i publikuje ją do main.
- Użytkownik otwiera lub odświeża aplikację na iPhonie.

## Technologia

- Expo / React Native
- GitHub jako transport i historia zmian
- Expo Go na początku
- EAS Update oraz TestFlight po konfiguracji kont
