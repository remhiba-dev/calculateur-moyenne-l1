document.getElementById('btn-calc').addEventListener('click', function() {
    // Fonction pour récupérer la note ou mettre 0 si vide
    function getNote(id) {
        const val = parseFloat(document.getElementById(id).value);
        return isNaN(val) ? 0 : val;
    }

    // Calcul de la moyenne de chaque module (40% CC + 60% Examen)
const asdCC = (getNote('asd-tp') + getNote('asd-td')) / 2;
    const asdMoy = (asdCC * 0.4) + (getNote('asd-exam') * 0.6);
    const analyseMoy = (getNote('analyse-cc') * 0.4) + (getNote('analyse-exam') * 0.6);
    const smMoy = (getNote('sm-cc') * 0.4) + (getNote('sm-exam') * 0.6);
    const algebreMoy = (getNote('algebre-cc') * 0.4) + (getNote('algebre-exam') * 0.6);
    const elecMoy = (getNote('elec-cc') * 0.4) + (getNote('elec-exam') * 0.6);
    const iaMoy = (getNote('ia-cc') * 0.4) + (getNote('ia-exam') * 0.6);
    const logiqueMoy = (getNote('logique-cc') * 0.4) + (getNote('logique-exam') * 0.6);

    // Calcul de la note globale pondérée par les coefficients
    const totalPoints = (asdMoy * 5) + (analyseMoy * 4) + (smMoy * 3) + (algebreMoy * 2) + (elecMoy * 2) + (iaMoy * 1) + (logiqueMoy * 1);
    
    // Somme totale des coefficients = 18
    const totalCoeff = 18;
    const moyenneGenerale = totalPoints / totalCoeff;

    // Affichage du résultat
    const averageDisplay = document.getElementById('final-average');
    const statusDisplay = document.getElementById('status-message');

    averageDisplay.textContent = moyenneGenerale.toFixed(2) + " / 20";

    if (moyenneGenerale >= 10) {
        averageDisplay.style.color = "#2ecc71"; // Vert
        statusDisplay.textContent = "Semestre validé ! ";
    } else {
        averageDisplay.style.color = "#e74c3c"; // Rouge
        statusDisplay.textContent = "Semestre non validé !";
    }
});