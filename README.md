# Diagnostic Boa
 - Bluetooth Low Energy OBD2 Application
 
Projekt stworzony jako praca dyplomowa na Wydziale Elektroniki Politechniki Wrocławskiej. 

Aplikacja działa wyłącznie z interfejsami obsługującymi standard Bluetooth v4.0.


## Aplikacja umożliwia: 
 - odczytywanie bieżących parametrów silnika
 - odczytywanie i kasowanie błędów silnika
 - zapisywanie parametrów do bazy danych w celu późniejszej analizy (czarna skrzynka)
 
 ## Użyte technologie, biblioteki:
 - React Native
 - Redux
 - Google Maps API
 - WatermelonDB
 - react-native-ble-plx
 - react-native-bluetooth-status
 - react-native-gesture-handler
 - react-navigation
 - moment.js
 - lottie
 
 
## Film prezentacyjny
 <img src=" https://github.com/juriakajurek/ble-obd-app/blob/master/assets/boa_logo.png " />
 <img
src=screens/Prezentacja.gif
raw=true
alt=“main screen”
width="600"
style=“margin-right: 10px;”
/>
 
## Plik instalacyjny
<a href="https://drive.google.com/file/d/1YFgDRI-s61ZILmwGuCoN2Ss_bpuNBNSd/view?fbclid=IwAR1GHjaR2sFdlpKiQ3etsoEPr-YEkizLcjs1hvytbivlqyN6g_drXDUi-YQ" target="_blank">.apk file</a>
 
## Podręcznik użytkownika
 ### Instalacja
W celu instalacji aplikacji „Diagnostic Boa” potrzeba włączyć opcję instalacji z nieznanych źródeł w ustawieniach systemowych. Zazwyczaj znajduje się ona w ustawieniach dodatkowych,
zabezpieczeniach, bądź ustawieniach bezpieczeństwa. Następnie należy uruchomić plik instalacyjny aplikacji i postępować zgodnie ze wskazówkami na ekranie w celu zainstalowania programu.
 ### Uruchomienie
Aplikację można uruchomić poprzez wybranie ikony z podpisem „Diagnostic Boa” z menu systemowego. Po uruchomieniu wyświetlany jest ekran główny, na którym znajdują się cztery
przyciski: „Parametry pojazdu”, „Błędy silnika”, „Czarna skrzynka”, „Ustawienia”.


 <img src=" https://github.com/juriakajurek/ble-obd-app/blob/master/assets/boa_logo.png " />
 <img
src=screens/1.jpg
raw=true
alt=“main screen”
width="400"
style=“margin-right: 10px;”
/>

 ### Połączenie
W celu połączenia ze sterownikiem należy przejść do ustawień. Bluetooth powinien być włączony; jeśli jest inaczej można włączyć go za pomocą przycisku znajdującego się na ekranie
ustawień.

 <img src=" https://github.com/juriakajurek/ble-obd-app/blob/master/assets/boa_logo.png " />
 <img
src=screens/2.jpg
raw=true
width="400"
alt=“settings screen”
style=“margin-right: 10px;”
/>

Następnie należy wybrać przycisk „Wyszukaj urządzenia” i poczekać,
aż zostanie wyświetlona nazwa urządzenia wpiętego do portu OBD2. Po wybraniu szukanego
urządzenia z listy dostępnych urządzeń zostanie zainicjowane połączenie, po czym zostanie wyświetlony alert informujący o udanym połączeniu.

 <img src=" https://github.com/juriakajurek/ble-obd-app/blob/master/assets/boa_logo.png " />
 <img
src=screens/3.jpg
raw=true
width="400"
alt=“connected alert”
style=“margin-right: 10px;”
/>

 ### Odczytywanie parametrów
Przed odczytaniem parametrów pojazdu, należy upewnić się, że poprawnie zostało ustanowione
połączenie. Można to potwierdzić, jeśli na ekranie głównym znajduje się informacja o nazwie połączonego urządzenia oraz numerze VIN pojazdu.

 <img src=" https://github.com/juriakajurek/ble-obd-app/blob/master/assets/boa_logo.png " />
 <img
src=screens/4.jpg
raw=true
width="400"
alt=“main screen with VIN”
style=“margin-right: 10px;”
/>

Następnie, z menu głównego, należy wybrać przycisk „Parametry pojazdu”. Zostanie wyświetlony ekran parametrów, 
na którym głównym elementem jest przewijana lista trzydziestu sześciu parametrów możliwych do odczytania. 

 <img src=" https://github.com/juriakajurek/ble-obd-app/blob/master/assets/boa_logo.png " />
 <img
src=screens/5.jpg
raw=true
width="400"
alt=“params screen”
style=“margin-right: 10px;”
/>

Aby odczytać wartość parametru, należy wybrać go z listy.
Za każdym razem, kiedy któryś z elementów listy zostanie wybrany, do sterownika wysyłane
jest żądanie pobrania wartości danego parametru, a na ekranie obok nazwy wyświetlana jest
jego wartość. Elementy można wybierać wielokrotnie, za każdym razem obok nazwy zostanie wyświetlona aktualna wartość. 
Dostępność konkretnego parametru do odczytania zależy od modelu pojazdu i jego konstrukcji, jeśli po kilkukrotnym naciśnięciu nazwy parametru nie jest
wyświetlana jego wartość, najpewniej nie jest on obsługiwany przez ten pojazd.
Istnieje możliwość długiego przytrzymania elementu listy, co doprowadzi do wizualnego zaznaczenia go na liście. Wybrane w ten sposób elementy aktualizują swoją wartość co 3 sekundy.
Jednocześnie można wybrać do czterech parametrów, których wartość będzie cyklicznie aktualizowana. Dodatkowo wybranie parametru determinuje zapisywanie jego wartości w czarnej
skrzynce, co zostanie omówione w podrozdziale Czarna skrzynka.

 ### Odczytywanie i kasowanie błędów
Aby skorzystać z pełni dostępnych funkcjonalności należy upewnić się, że urządzenie posiada
dostęp do internetu. Potrzebne to będzie do wyszukania kodu błędu. Jeśli zostało ustanowione
poprawne połączenie, aby odczytać kod błędu należy przejść do ekranu błędów przez wybranie
z głównego menu pozycji „Błędy silnika”. Następnie należy wybrać przycisk „Pobierz kody
usterek”. Do sterownika zostanie wysłane żądanie pobrania kodów błędów, a po otrzymaniu
odpowiedzi zostanie wyświetlony alert informujący o liczbie znalezionych błędów. Jeśli zostaną znalezione jakieś błędy, będą one wyświetlone w postaci listy, w formie kodów „Pxxxx”.

 <img src=" https://github.com/juriakajurek/ble-obd-app/blob/master/assets/boa_logo.png " />
 <img
src=screens/6.jpg
raw=true
width="400"
alt=“params screen”
style=“margin-right: 10px;”
/>

Można wybrać dowolną pozycję z listy, wtedy kod błędu zostanie wyszukany w wyszukiwarce Google przy użyciu domyślnej przeglądarki systemowej. Zdarza się, że sterownik
wysyła kody błędów dopiero za drugim, lub nawet trzecim podejściem. Dlatego jeśli nie zostanie znaleziony żaden błąd, można powtórzyć pobieranie poprzez ponowne naciśnięcie przycisku
„Pobierz kody usterek”.
Kasowanie błędów następuje po naciśnięciu przycisku „Kasuj błędy”. Wtedy to do sterownika zostaje wysłane polecenie wyczyszczenia pamięci błędów, a na ekranie wyświetlany jest
alert informujący użytkownika o przeprowadzeniu tej operacji.

 <img src=" https://github.com/juriakajurek/ble-obd-app/blob/master/assets/boa_logo.png " />
 <img
src=screens/7.jpg
raw=true
width="400"
alt=“deleting errors”
style=“margin-right: 10px;”
/>

Możliwym jest, że
komputer nie zareaguje na to polecenie za pierwszym razem, dlatego w niektórych przypadkach
potrzebne będzie naciśnięcie przycisku dwu- lub nawet trzykrotnie.

 ### Czarna skrzynka
Funkcjonalność czarnej skrzynki pozwala na cykliczne zapisywanie do bazy danych informacji
na temat położenia i prędkości GPS oraz wartości wybranych parametrów. Aby były zapisywane
wartości parametrów należy uprzednio zaznaczyć je na ekranie parametrów.
Można zaznaczyć do czterech parametrów, których wartości będą zapisywane. Jeśli nie zostanie
zaznaczony żaden parametr, do bazy danych będą zapisywane jedynie dane na temat położenia
i prędkości GPS.
Przed rozpoczęciem cyklicznego zapisywanie danych, należy upewnić się, że włączony jest
moduł GPS w ustawieniach systemowych. Następnie należy wybrać przycisk „Rozpocznij podróż” z ekranu czarnej skrzynki, po czym na ekranie pojawi się animacja zapisywania danych, a
sześcienna kostka zacznie się obracać.

 <img src=" https://github.com/juriakajurek/ble-obd-app/blob/master/assets/boa_logo.png " />
 <img
src=screens/8.jpg
raw=true
width="400"
alt=“journey started”
style=“margin-right: 10px;”
/>

Podczas zapisywania danych ekran telefonu
nie może być wygaszony, a ekran czarnej skrzynki musi znajdować się na pierwszym planie. Aby
zakończyć podróż należy wybrać przycisk „Zakończ podróż”, wtedy to animacja zapisywania
danych zniknie, a sześcienna kostka przestanie się obracać.
Przeglądanie tras jest możliwe wyłącznie, jeśli nie jest rozpoczęta podróż. Aby przeglądać
trasy należy wybrać przycisk „Przeglądaj trasy” znajdujący się na ekranie czarnej skrzynki. Zamiast sześciennej kostki zostanie wyświetlona lista zapisanych tras pogrupowanych chronologicznie. Aby zobaczyć zapisane dane, należy wybrać jedną z tras. Na ekranie zostanie wyświetlone okno zatytułowane „Co chcesz zrobić”, a w nim przyciski „Usuń trasę”, „Pokaż na mapie”
i „Przeglądaj dane trasy”.

 <img src=" https://github.com/juriakajurek/ble-obd-app/blob/master/assets/boa_logo.png " />
 <img
src=screens/9.jpg
raw=true
width="400"
alt=“what to do”
style=“margin-right: 10px;”
/>

Trasy można przeglądać na dwa sposoby:
- na mapie, wybierając opcję „Pokaż na mapie”. Na ekranie zamiast listy tras zostanie wyświetlona mapa z naniesionymi punktami, w których były zapisywane dane.
Mapa jest
w pełni interaktywna, pozwala na przesuwanie, przybliżanie, oddalanie i zmianę kąta widoku.
Aby wyświetlić dane zapisane w danym punkcie, należy go wybrać.

 <img src=" https://github.com/juriakajurek/ble-obd-app/blob/master/assets/boa_logo.png " />
 <img
src=screens/10.jpg
raw=true
width="400"
alt=“points on map”
style=“margin-right: 10px;”
/>

- w postaci listy punktów, poprzez wybranie opcji „Przeglądaj dane trasy”. Na ekranie zamiast
listy tras zostanie wyświetlona przewijana lista punktów zapisanych w danej trasie. Każdy
element listy można wybrać, co spowoduje wyświetlenie kolejnego okna zatytułowanego „Co
chcesz zrobić?” z dostępnymi opcjami „Usuń punkt” i „Zobacz zapisane dane”. Aby zobaczyć
zapisane dane należy wybrać drugą opcję, wtedy to zostanie wyświetlone okno z wszystkimi
zapisanymi informacjami.

 <img src=" https://github.com/juriakajurek/ble-obd-app/blob/master/assets/boa_logo.png " />
 <img
src=screens/11.jpg
raw=true
width="400"
alt=“saved data”
style=“margin-right: 10px;”
/>

Usunąć punkt można poprzez wyszukanie go na liście punktów korzystając z funkcji „Przeglądaj dane trasy”, a następnie naciśnięcie go i wybranie opcji „Usuń punkt”. W podobny sposób
można również usuwać całe trasy, w tym celu w widoku tras (po wybraniu przycisku „Przeglądaj
trasy”) należy wybrać trasę do usunięcia, a w wyświetlonym oknie dialogowym należy wybrać
opcję „Usuń trasę”. Wtedy zostanie usunięta cała trasa wraz z wszystkimi punktami należącymi
do niej.

 ### Odczytywanie numeru VIN pojazdu
Numer VIN pojazdu odczytywany jest automatycznie po poprawnym zainicjowaniu połączenia i
jest wyświetlany na ekranie głównym aplikacji.

 <img src=" https://github.com/juriakajurek/ble-obd-app/blob/master/assets/boa_logo.png " />
 <img
src=screens/12.jpg
raw=true
width="400"
alt=“main screen with VIN”
style=“margin-right: 10px;”
/>

Dlatego aby poznać numer VIN, wystarczy połączyć się z urządzeniem jak przedstawiono to powyżej. Jeśli wyświetlany
jest numer VIN, gwarantuje to poprawną inicjacje połączenia.
