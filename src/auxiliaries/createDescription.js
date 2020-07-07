import moment from 'moment';

export default (createDescription = entriesArray => {
  let description = '';
  let i = entriesArray.findIndex(element => {
    return element[0].toString().includes('date');
  });
  if (i != -1 && entriesArray[i][1]) {
    description +=
      '• Data: ' + moment(entriesArray[i][1]).format('D.MM.YYYY') + '\n';
  }
  i = entriesArray.findIndex(element => {
    return element[0].toString().includes('route');
  });
  if (i != -1 && entriesArray[i][1]) {
    description += '• Nr trasy: ' + entriesArray[i][1] + '\n';
  }
  i = entriesArray.findIndex(element => {
    return element[0].toString().includes('geo');
  });
  if (i != -1 && entriesArray[i][1]) {
    description +=
      '• Współrzędne gps: ' + entriesArray[i][1].split(':').join(', ') + '\n';
  }
  i = entriesArray.findIndex(element => {
    return element[0].toString().includes('acc');
  });
  if (i != -1 && entriesArray[i][1]) {
    description +=
      '• Dokładność gps: ' +
      Math.round(parseFloat(entriesArray[i][1] * 100) / 100) +
      'm\n';
  }
  i = entriesArray.findIndex(element => {
    return element[0].toString().includes('speed');
  });
  if ((i != -1 && entriesArray[i][1]) || entriesArray[i][1] === 0) {
    description += '• Prędkość gps: ' + entriesArray[i][1] + '\n';
  }
  i = entriesArray.findIndex(element => {
    return element[0].toString().includes('paramsData');
  });
  if (i != -1 && entriesArray[i][1]) {
    description +=
      '• Zapisane parametry: ' +
      entriesArray[i][1].split(',').map(el => {
        return '\n  ' + el;
      }) +
      '\n';
  }
  return description;
});
