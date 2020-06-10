export const responseConverter = (code, hex) => {
  let value = '';
  switch (code) {
    case '04': //obliczone obciążenie silnika[%]
      value = parseInt(hex[0], 16) / 2.55;
      value = Math.round(value * 10) / 10;
      return value.toString();
    case '05': //Temperatura płynu chłodzącego [°C]
      value = parseInt(hex[0], 16) - 40;
      return value.toString();

    case '0A': //cisnienie paliwa [kPa]
      value = parseInt(hex[0], 16) * 3;
      return value.toString();
    case '0B': //ciśnienie w kolektorze dolotowym
      value = parseInt(hex[0], 16);
      return value.toString();

    case '0C': //Prędkość obrotowa silnika
      value = (256 * parseInt(hex[0], 16) + parseInt(hex[1], 16)) / 4;
      return value.toString();

    case '0D': //prędkość pojazdu
      value = parseInt(hex[0], 16);
      return value.toString();
    case '0E': // Timing advance  -	° przed górnym martwym położeniem [od -64° do 63.5°]
      value = parseInt(hex[0], 16) / 2 - 64;
      return value.toString();
    case '0F': //temperatura pobieranego powietrza
      value = parseInt(hex[0], 16) - 40;
      return value.toString();
    case '10': //przepływ powietrza w gramach na sekundę [0 - 655.35]
      value = (256 * parseInt(hex[0], 16) + parseInt(hex[1], 16)) / 100;
      return value.toString();

    case '11': //stopień otwarcia przepustnicy 0%-100%
      value = parseInt(hex[0], 16) / 2.55;
      return value.toString();

    case '1F': //czas który upłynął od uruchomienia silnika od 0	do 65535	seconds
      value = 256 * parseInt(hex[0], 16) + parseInt(hex[1], 16);
      return value.toString();

    case '21': //przejechany dystans od zapalenia kontrolki sygnalizującej usterki
      value = 256 * parseInt(hex[0], 16) + parseInt(hex[1], 16);
      return value.toString();
    case '22': //	ciśnienie w szynie paliwa w stosunku do ciśnienia w kolektorze dolotowym
      value = (256 * parseInt(hex[0], 16) + parseInt(hex[1], 16)) * 0.079;
      return value.toString();
    case '23': //	wskazanie czujnika ciśnienia w szynie paliwa
      value = (256 * parseInt(hex[0], 16) + parseInt(hex[1], 16)) * 10;
      return value.toString();
    case '2C': //zadany dla EGR stopień recyrkulacji spalin [0%-100%]
      value = parseInt(hex[0], 16) / 2.55;
      return value.toString();
    case '2D': //błąd EGR obliczany z różnicy pomiędzy wartością zadaną a rzeczywistą zaworu EGR [-100 do 100%]
      value = parseInt(hex[0], 16) / 1.28 - 100;
      return value.toString();
    case '2F': // poziom paliwa [0 do 100%]
      value = parseInt(hex[0], 16) / 2.55;
      return value.toString();
    case '30': //liczba uruchomień od czasu wykasowania pamięci błędów (0 do 255)
      value = parseInt(hex[0], 16);
      return value.toString();
    case '31': //przejechany dystans od wykasowania pamięci błędów (0 do 65535)
      value = 256 * parseInt(hex[0], 16) + parseInt(hex[1], 16);
      return value.toString();
    case '42': //napięcie modułu sterującego [V]
      value = (256 * parseInt(hex[0], 16) + parseInt(hex[1], 16)) / 1000;
      return value.toString();
    case '44': //zadany stosunek współczynnika paliwo-powietrze (0 do 2)
      value = (256 * parseInt(hex[0], 16) + parseInt(hex[1], 16)) * (2 / 65536);
      return value.toString();
    case '45': //względny stopień otwarcia przepustnicy
      value = parseInt(hex[0], 16) / 2.55;
      return value.toString();
    case '46': //temperatura otoczenia
      value = parseInt(hex[0], 16) - 40;
      return value.toString();
    case '4D': //czas jaki upłynął od zapalenia kontrolki sygnalizującej usterki [min] (0 do 65535)
      value = 256 * parseInt(hex[0], 16) + parseInt(hex[1], 16);
      return value.toString();
    case '4E': //czas jaki upłynął od wyczyszczenia pamięci błędów [min]
      value = 256 * parseInt(hex[0], 16) + parseInt(hex[1], 16);
      return value.toString();
    case '51': //typ paliwa
      value = parseInt(hex[0], 16);
      switch (value.toString) {
        case '1':
          return 'Gasoline';
        case '2':
          return 'Methanol';
        case '3':
          return 'Ethanol';
        case '4':
          return 'Diesel';
        case '5':
          return 'LPG';
        case '6':
          return 'CNG';
        case '7':
          return 'Propane';
        case '8':
          return 'Electric';
        case '9':
          return 'Bifuel running Gasoline';
        case '10':
          return 'Bifuel running Methanol';
        case '11':
          return 'Bifuel running Ethanol';
        case '12':
          return 'Bifuel running LPG';
        case '13':
          return 'Bifuel running CNG';
        case '14':
          return 'Bifuel running Propane';
        case '15':
          return 'Bifuel running Electricity';
        case '16':
          return 'Bifuel running electric and combustion engine';
        case '17':
          return 'Hybrid gasoline';
        case '18':
          return 'Hybrid Ethanol';
        case '19':
          return 'Hybrid Diesel';
        case '20':
          return 'Hybrid Electric';
        case '21':
          return 'Hybrid running electric and combustion engine';
        case '22':
          return 'Hybrid Regenerative';
        case '23':
          return 'Bifuel running diesel';
        case '0':
        default:
          return 'Not available';
      }
    case '59': //ciśnienie absolutne szyny paliwa [kPa]
      value = (256 * parseInt(hex[0], 16) + parseInt(hex[1], 16)) * 10;
      return value.toString();
    case '5A': //względna pozycja pedału przyspieszenia [0-100%]
      value = parseInt(hex[0], 16) / 2.55;
      return value.toString();
    case '5C': //temperatura oleju [°C]
      value = parseInt(hex[0], 16) - 40;
      return value.toString();
    case '5D': //kąt wyprzedzenia wtrysku paliwa (od -210 do 301.992°)
      value = (256 * parseInt(hex[0], 16) + parseInt(hex[1], 16)) / 128 - 210;
      return value.toString();
    case '5E': //spalanie silnika [L\h]
      value = (256 * parseInt(hex[0], 16) + parseInt(hex[1], 16)) / 20;
      return value.toString();
    case '63': //moment obrotowy silnika (referencyjny) [Nm]
      value = 256 * parseInt(hex[0], 16) + parseInt(hex[1], 16);
      return value.toString();
    case '67': //temperatura cieczy chłodzącej
      value = parseInt(hex[0], 16) - 40;
      return value.toString();
    case '7C': //temperatura DPF(Diesel Particulate filter) [°C]
      value = (256 * parseInt(hex[0], 16) + parseInt(hex[1], 16)) / 10 - 40;
      return value.toString();
    case '7F': //czas pracy silnika [sec]
      value = parseInt(hex[0], 16);
      return value.toString();
    case '9D': //spalanie silnika [g/s]
      value = parseInt(hex[0], 16) / 2.55; //??
      return value.toString();
  }
};
