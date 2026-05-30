document.getElementById('btn-verifier').addEventListener('click', function() {
    // 1. Définition des modules et de leurs coefficients
    const modules = [
        { name: "ASD 2", cc: "r-asd-cc", exam: "r-asd-exam", coef: 5 },
        { name: "Analyse 2", cc: "r-analyse-cc", exam: "r-analyse-exam", coef: 4 },
        { name: "SM2", cc: "r-sm-cc", exam: "r-sm-exam", coef: 3 },
        { name: "Algebre 2", cc: "r-algebre-cc", exam: "r-algebre-exam", coef: 2 },
        { name: "Electronique fondamentale", cc: "r-elec-cc", exam: "r-elec-exam", coef: 2 },
        { name: "Introduction a l'IA", cc: "r-ia-cc", exam: "r-ia-exam", coef: 1 },
        { name: "Logique mathématique", cc: "r-logique-cc", exam: "r-logique-exam", coef: 1 }
    ];

    let totalPoints = 0;
    let totalCoef = 0;
    let modulesNonValides = [];

    // 2. Calcul des moyennes initiales
    modules.forEach(function(mod) {
        const valCC = parseFloat(document.getElementById(mod.cc).value) || 0;
        const valExam = parseFloat(document.getElementById(mod.exam).value) || 0;
        
        const moyenneModule = (valCC * 0.4) + (valExam * 0.6);
        
        totalPoints += (moyenneModule * mod.coef);
        totalCoef += mod.coef;

        // Si le module n'est pas validé (< 10), on le garde pour le bulletin de rattrapage
        if (moyenneModule < 10) {
            modulesNonValides.push({
                name: mod.name,
                cc: valCC,
                moyenneActuelle: moyenneModule
            });
        }
    });

    const moyenneSemestre = totalPoints / totalCoef;
    
    // 3. Affichage du résultat principal
    const initAverageDisplay = document.getElementById('init-average');
    const initStatusDisplay = document.getElementById('init-status');
    const bulletinBox = document.getElementById('bulletin-rattrapage');
    const rattrapageList = document.getElementById('rattrapage-list');

    initAverageDisplay.textContent = moyenneSemestre.toFixed(2) + " / 20";
    rattrapageList.innerHTML = ""; // Vider l'ancienne liste

    // Cas 1 : Semestre Validé 🎉
    if (moyenneSemestre >= 10) {
        initAverageDisplay.style.color = "#2ecc71";
        initStatusDisplay.textContent = "Félicitations ! Votre semestre est validé par moyenne générale, pas besoin de rattrapage ! ✨";
        bulletinBox.classList.add('hidden'); // On cache le bulletin s'il était ouvert
    } 
    // Cas 2 : Rattrapage ⛔
    else {
        initAverageDisplay.style.color = "#e74c3c";
        initStatusDisplay.textContent = "Semestre non validé. Génération de votre bulletin de rattrapage ci-dessous...";
        bulletinBox.classList.remove('hidden'); // On affiche le bulletin !

        // Génération dynamique des lignes du bulletin
        modulesNonValides.forEach(function(mod) {
            // Formule magique inversée : (10 - CC * 0.4) / 0.6
            let noteRattrapageRequise = (10 - (mod.cc * 0.4)) / 0.6;
            
            // Sécurité si la note requise dépasse 20 (cas où le CC est extrêmement bas)
            if (noteRattrapageRequise > 20) noteRattrapageRequise = 20;
            if (noteRattrapageRequise < 0) noteRattrapageRequise = 0;

            // Création de l'élément HTML pour ce module
            const row = document.createElement('div');
            row.className = 'rattrapage-row';
            row.innerHTML = `
                <div>
                    <strong>${mod.name}</strong> <br>
                    <small style="color:#7f8c8d;">Moyenne actuelle: ${mod.moyenneActuelle.toFixed(2)} (CC: ${mod.cc})</small>
                </div>
                <div class="target-note">Viser : ${noteRattrapageRequise.toFixed(2)} / 20</div>
            `;
            rattrapageList.appendChild(row);
        });
    }
});