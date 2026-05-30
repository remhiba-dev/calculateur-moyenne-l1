document.getElementById('btn-calc-annuel').addEventListener('click', function() {
    const s1 = parseFloat(document.getElementById('moy-s1').value);
    const s2 = parseFloat(document.getElementById('moy-s2').value);

    const averageDisplay = document.getElementById('final-average');
    const statusDisplay = document.getElementById('status-message');
    const helpDisplay = document.getElementById('help-message');

    
    if (isNaN(s1) || isNaN(s2) || s1 < 0 || s1 > 20 || s2 < 0 || s2 > 20) {
        averageDisplay.textContent = "-- / 20";
        statusDisplay.textContent = "Attention !";
        helpDisplay.textContent = "Veuillez entrer des moyennes valides entre 0 et 20.";
        averageDisplay.style.color = "#333";
        return;
    }

    
    const moyenneAnnuelle = (s1 + s2) / 2;
    averageDisplay.textContent = moyenneAnnuelle.toFixed(2) + " / 20";

    
    if (moyenneAnnuelle >= 10) {
        averageDisplay.style.color = "#2ecc71"; 
        statusDisplay.textContent = "Félicitations ! Année validée ! 🎓🎉";
        
        if (s1 < 10) {
            helpDisplay.textContent = `Le S2 (${s2.toFixed(2)}) a compensé le S1 (${s1.toFixed(2)}). Vous passez grâce à la compensation annuelle !`;
        } else if (s2 < 10) {
            helpDisplay.textContent = `Le S1 (${s1.toFixed(2)}) a compensé le S2 (${s2.toFixed(2)}). Vous passez grâce à la compensation annuelle !`;
        } else {
            helpDisplay.textContent = "Excellent travail ! Vous avez validé les deux semestres haut la main.";
        }
    } 
    
    else {
        averageDisplay.style.color = "#e74c3c"; 
        statusDisplay.textContent = "Année non validée (Rattrapage) ⛔";

        const noteS2Requise = 20 - s1;

        if (noteS2Requise <= 20 && noteS2Requise > 0) {
            helpDisplay.innerHTML = `Pour valider ton année par compensation, il te fallait une moyenne de <strong>${noteS2Requise.toFixed(2)} / 20</strong> au S2.<br>Il vous a manqué ${(noteS2Requise - s2).toFixed(2)} points au S2. Bon courage pour les rattrapages ! 💪`;
        } else {
            
            helpDisplay.textContent = "Le retard du S1 est trop grand pour être compensé mathématiquement au S2 alone. Il faudra absolument racheter des modules aux rattrapages !";
        }
    }
});