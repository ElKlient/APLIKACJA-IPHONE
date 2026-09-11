# START HERE — pełne przekazanie projektu

Ten dokument jest pierwszą i główną instrukcją dla każdego nowego czatu, agenta lub kontenera. Przeczytaj go w całości przed analizą i przed zmianą plików.

## 1. Cel projektu

Tymczasowa nazwa aplikacji: **Aplikacja iPhone**.

Aktualny prototyp to dotykowa gra 3×3 inspirowana kółkiem i krzyżykiem:

- zamiast X używany jest znak BMW,
- zamiast O używane są cztery pierścienie Audi,
- po zakończeniu partii wyświetlany jest tekst: „Audi to gówno tylko BMW i M50”,
- aplikacja ma ciemny interfejs pionowy dla iPhone,
- przycisk „Nowa gra” zeruje planszę.

Nazwa, wygląd i przeznaczenie aplikacji mogą się później całkowicie zmienić. Nie zakładaj, że kółko i krzyżyk jest produktem końcowym.

## 2. Źródła prawdy

- Repozytorium: **ElKlient/APLIKACJA-IPHONE**
- Gałąź produkcyjna: **main**
- Expo owner: **race99**
- Expo project: **race99/aplikacja-iphone**
- EAS projectId: **a4578175-e960-4393-9f1f-fcbe93e51b2a**
- Bundle identifier: **pl.elklient.aplikacjaiphone**

Uwaga: poprawny projectId zapisany w app.json jest nadrzędny. Jeżeli tekst powyżej różni się od app.json, użyj wartości z app.json.

Nie mieszaj projektu z repozytoriami IDOL-Genesis ani Kalendarz Kierowcy. Są to osobne aplikacje.

## 3. Oczekiwania użytkownika

Użytkownik nie chce ręcznie kopiować kodu, wykonywać wielu komend ani obsługiwać GitHuba. Typowy przebieg ma wyglądać tak:

1. Użytkownik opisuje zmianę i ewentualnie wysyła zrzut ekranu.
2. Agent pobiera aktualny main.
3. Agent sam implementuje zmianę.
4. Agent sprawdza składnię, zależności i eksport.
5. Agent robi commit bezpośrednio do main, o ile użytkownik nie poprosi o gałąź lub PR.
6. Po pushu Expo EAS publikuje nową aktualizację.
7. Użytkownik otwiera podgląd w Expo Go i testuje.

Odpowiedzi dla użytkownika powinny być krótkie: wynik, commit, status workflow i link do aktualizacji. Nie każ użytkownikowi wykonywać pracy, którą agent może wykonać sam.

## 4. Technologia i struktura

Projekt używa Expo oraz React Native.

- App.js — obecny interfejs i cała logika prototypu.
- app.json — nazwa aplikacji, owner Expo, projectId, updates URL, runtimeVersion i konfiguracja iOS.
- package.json — zależności i skrypty.
- package-lock.json — dokładnie zablokowane wersje zależności.
- eas.json — profile development, preview i production.
- .eas/workflows/build-ios.yml — workflow uruchamiany po pushu do main.
- AGENTS.md — bezwzględna instrukcja wejścia dla agentów.
- START_HERE.md — niniejszy pełny dokument przekazania.
- WORKFLOW_FIRST.md — krótszy skrót zasad.
- HANDOFF.md — bieżący stan i lista następnych kroków.

## 5. Aktualny przepływ GitHub → Expo → iPhone

Repozytorium ElKlient/APLIKACJA-IPHONE jest połączone w panelu Expo z projektem race99/aplikacja-iphone przez Expo GitHub App.

Workflow w .eas/workflows/build-ios.yml uruchamia się po każdym pushu do main i publikuje EAS Update przeznaczony do podglądu w Expo Go.

Pierwsza próba używała zadania build dla iOS i zakończyła się na etapie Resolve build configuration, ponieważ nie skonfigurowano jeszcze poświadczeń Apple. To nie był błąd kodu. Workflow został świadomie zmieniony na zadanie update, aby prototyp można było oglądać bez Apple Developer.

Pełny samodzielny plik IPA, TestFlight i App Store będą wymagały później:

- członkostwa Apple Developer,
- konfiguracji certyfikatów i provisioning profile w EAS,
- pierwszego podpisanego buildu iOS,
- ewentualnej rejestracji urządzenia do dystrybucji wewnętrznej.

Nie przełączaj obecnego workflow ponownie na build, dopóki użytkownik nie skonfiguruje Apple Developer albo wyraźnie nie poprosi o pełny build.

## 6. Procedura rozpoczęcia każdej pracy

1. Otwórz repozytorium ElKlient/APLIKACJA-IPHONE.
2. Odczytaj aktualny main.
3. Przeczytaj AGENTS.md, START_HERE.md i HANDOFF.md.
4. Sprawdź ostatnie commity, ponieważ wcześniejszy czat mógł właśnie wykonać zmianę.
5. Przeczytaj pliki, których dotyczy zadanie.
6. Nie opieraj zmian wyłącznie na pamięci rozmowy.
7. Sprawdź, czy nie nadpisujesz równoległej pracy.

## 7. Procedura wykonania łatki

1. Zdiagnozuj problem na podstawie kodu i zrzutu.
2. Wprowadź najmniejszą spójną zmianę rozwiązującą problem.
3. Zachowaj działające zachowania, których użytkownik nie kazał zmieniać.
4. Jeżeli zmienia się architektura lub workflow, zaktualizuj START_HERE.md i HANDOFF.md.
5. Uruchom możliwie najbliższą kontrolę:
   - instalacja: npm install lub npm ci,
   - eksport: npx expo export --platform ios,
   - sprawdzenie konfiguracji Expo/EAS.
6. Obejrzyj diff.
7. Zrób krótki commit po polsku opisujący efekt.
8. Wyślij commit do main.
9. Sprawdź status powiązany z commitem.
10. Jeśli status jest pending, przekaż link do zadania. Jeśli failed, odczytaj konkretny krok i napraw przyczynę.

## 8. Zasady UI i obecna naprawa 3×3

Plansza musi być prawdziwym kwadratem 3×3 na wszystkich szerokościach iPhone.

Nie wracaj do układu dziewięciu elementów z flexWrap oraz szerokością procentową. Taki układ na rzeczywistym iPhonie zawijał trzecią kolumnę i tworzył dwie kolumny. Obecne rozwiązanie renderuje trzy jawne rzędy, w każdym trzy pola. Każdy rząd i każde pole używają flex: 1, a pola mają aspectRatio: 1.

Przy zmianach mobilnych sprawdzaj:

- małe i duże iPhone,
- orientację pionową,
- SafeArea,
- brak wychodzenia przycisku poza ekran,
- czy tekst końcowy nie nachodzi na planszę,
- czy pola nadal mają identyczną szerokość i wysokość.

## 9. Konta i bezpieczeństwo

GitHub i Expo używają celowo różnych kont:

- kod jest na GitHubie ElKlient,
- projekt EAS należy do Expo race99.

Expo GitHub App ma dostęp do ElKlient/APLIKACJA-IPHONE. Nie zmieniaj właściciela ani projectId bez wyraźnej potrzeby.

Nie zapisuj w repozytorium:

- haseł,
- tokenów Expo,
- kluczy API,
- certyfikatów Apple,
- plików provisioning,
- prywatnych danych logowania.

Sekrety należy przechowywać wyłącznie w ustawieniach Expo/EAS lub GitHub Secrets.

## 10. Równoległe chaty i zapobieganie konfliktom

Przed zapisem zawsze pobierz aktualny main i ponownie sprawdź SHA pliku lub commitu.

Jeżeli inny agent zmienił ten sam plik:

- nie wykonuj force push,
- nie cofaj jego zmian,
- połącz obie zmiany świadomie,
- ponownie wykonaj test.

Każdy agent po istotnej pracy dopisuje do HANDOFF.md:

- co zmienił,
- jaki był wynik testu,
- SHA lub opis commitu,
- co pozostało do zrobienia,
- znane blokady.

## 11. Znane ograniczenia i diagnostyka

### Workflow nie uruchamia się

Sprawdź, czy:

- repo nadal jest połączone w Expo Project settings → GitHub,
- workflow leży w .eas/workflows,
- push trafił do main,
- YAML zawiera trigger dla main.

### Build iOS zatrzymuje się na credentials

To oczekiwane bez Apple Developer. Użyj workflow update do Expo Go. Pełny build uruchamiaj dopiero po skonfigurowaniu Apple.

### Aktualizacja nie pojawia się w Expo Go

Sprawdź wynik workflow oraz stronę Updates projektu Expo. Otwórz opublikowaną aktualizację, wybierz Preview i uruchom ją w Expo Go. Upewnij się, że SDK i biblioteki są zgodne z Expo Go.

### Błąd zależności

Nie zmieniaj ręcznie wersji przypadkowo. Użyj Expo install dla bibliotek Expo i zachowaj zgodność package.json z package-lock.json.

## 12. Obowiązek aktualizowania dokumentacji

Ten dokument ma pozostawać aktualny. Po zmianie konta, repozytorium, projectId, struktury, technologii, procesu aktualizacji lub publikowania agent musi uaktualnić START_HERE.md.

HANDOFF.md służy do częstych wpisów operacyjnych. START_HERE.md opisuje stabilny pełny workflow.
