# Przekazanie projektu

## Stan

- Tymczasowa nazwa: Aplikacja iPhone.
- Pierwszy prototyp: grywalne kółko i krzyżyk dla dwóch osób.
- Interfejs: pionowy, ciemny i dotykowy.
- Kod aplikacji: App.js.
- Projekt Expo: race99/aplikacja-iphone.
- Project ID: a4578175-e960-4393-9f1f-fcbe93e51b2a.
- Workflow EAS dla iOS znajduje się w .eas/workflows/build-ios.yml.
- Push uruchamiający pierwszy workflow wykonany 11.09.2026.

## Uzgodniony workflow

Użytkownik nie chce ręcznie edytować plików ani wykonywać wielu komend. Agent ma samodzielnie pobierać projekt, wdrażać zmiany, testować, commitować i wysyłać do main. GitHub służy przede wszystkim jako kanał transportu wersji między agentem a telefonem.

## Kolejne kroki

1. Sprawdzić wynik workflow EAS po pushu.
2. Udostępnić pierwszy build do instalacji na iPhonie.
3. Skonfigurować EAS Update dla kolejnych poprawek.
4. Później skonfigurować Apple Developer, TestFlight i App Store.

## Ważne

- Nie umieszczać projektu jako podfolderu IDOL-Genesis.
- Nie nadpisywać pozostałych projektów.
- Aktualizować ten dokument po istotnych decyzjach.
