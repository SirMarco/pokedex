async function init1() {
  const response = await fetch('bundesland.json');
  if (!response.ok) {
    errorFunction(`Fehler beim Abrufen von 'bundesland.json'. Statuscode: ${response.status}`);
  }
}

function errorFunction(error) {
  console.log('Fehler aufgetreten:', error);
}