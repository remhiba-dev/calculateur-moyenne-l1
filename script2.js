document.getElementById('btn-calc').addEventListener('click', function() {
    // Fonction pour récupérer la note ou mettre 0 si vide
    function getNote(id) {
        const element = document.getElementById(id);
        if (!element) return 0; // Sécurité si l'ID n'existe pas
        const val = parseFloat(element.value);
        return isNaN(val) ? 0 : val;
    }

    // 1. Calcul de la moyenne de chaque module
    
    // ASD 1 : (TP + TD) / 2 pour le CC, puis 40% CC + 60% Examen
    const asdCC = (getNote('asd-tp') + getNote('asd-td')) / 2;
    const asdMoy = (asdCC * 0.4) + (getNote('asd-exam') * 0.6);
    
    // Analyse 1, SM1, Algebre 1, Électricité : 40% TD + 60% Examen
    const analyseMoy = (getNote('analyse-td') * 0.4) + (getNote('analyse-exam') * 0.6);
    const smMoy = (getNote('sm-td') * 0.4) + (getNote('sm-exam') * 0.6);
    const algebreMoy = (getNote('algebre-td') * 0.4) + (getNote('algebre-exam') * 0.6);
    const electrecitéMoy = (getNote('electrecité-td') * 0.4) + (getNote('electrecité-exam') * 0.6);
    
    // Logiciel libre et Anglais : Examen seul (100%)
    const logicielMoy = (getNote('logiciel-libre-exam'));
    const anglaisMoy = (getNote('anglais-exam'));

    // 2. Calcul de la note globale pondérée par les coefficients
    const totalPoints = (asdMoy * 5) + (analyseMoy * 4) + (smMoy * 3) + 
                        (algebreMoy * 2) +(electrecitéMoy * 2) +(logicielMoy * 1) + (anglaisMoy * 1);
    
    // Somme totale des coefficients = 18
    const totalCoeff = 18;
    const moyenneGenerale = totalPoints / totalCoeff;

    // 3. Affichage du résultat
    const averageDisplay = document.getElementById('final-average');
    const statusDisplay = document.getElementById('status-message');

    averageDisplay.textContent = moyenneGenerale.toFixed(2) + " / 20";

    if (moyenneGenerale >= 10) {
        averageDisplay.style.color = "#2ecc71"; // Vert
        statusDisplay.textContent = "Félicitations ! Semestre 1 validé ! 🎉";
    } else {
        averageDisplay.style.color = "#e74c3c"; // Rouge
        statusDisplay.textContent = "Semestre non validé ! Bon courage pour le S2 ou les rattrapages. 💪";
    }
});