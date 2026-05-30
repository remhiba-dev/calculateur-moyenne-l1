// Cacher la ligne CC si l'utilisateur choisit "Examen Seul"
document.getElementById('bareme-select').addEventListener('change', function() {
    const ccRow = document.getElementById('cc-row');
    if (this.value === '100-exam') {
        ccRow.style.display = 'none';
    } else {
        ccRow.style.display = 'flex';
    }
});

document.getElementById('btn-simuler').addEventListener('click', function() {
    const bareme = document.getElementById('bareme-select').value;
    const ccInput = parseFloat(document.getElementById('current-cc').value);
    
    const targetDisplay = document.getElementById('final-average');
    const statusDisplay = document.getElementById('status-message');
    
    let cc = isNaN(ccInput) ? 0 : ccInput;
    let examRequis = 0;

    // Validation de la note CC rentrée
    if ((bareme !== '100-exam') && (cc < 0 || cc > 20)) {
        targetDisplay.textContent = "-- / 20";
        statusDisplay.textContent = "Veuillez entrer une note de CC valide entre 0 et 20.";
        targetDisplay.style.color = "#333";
        return;
    }

    // Calcul selon le barème sélectionné
    if (bareme === '40-60') {
        // Formule : 10 = (CC * 0.4) + (Exam * 0.6) -> Exam = (10 - CC * 0.4) / 0.6
        examRequis = (10 - (cc * 0.4)) / 0.6;
    } 
    else if (bareme === '30-70') {
        // Formule : Exam = (10 - CC * 0.3) / 0.7
        examRequis = (10 - (cc * 0.3)) / 0.7;
    } 
    else if (bareme === '50-50') {
        // Formule : Exam = (10 - CC * 0.5) / 0.5
        examRequis = (10 - (cc * 0.5)) / 0.5;
    } 
    else if (bareme === '100-exam') {
        examRequis = 10;
    }

    // Affichage intelligent des résultats
    if (examRequis <= 0) {
        // Le CC est tellement haut que l'étudiant a déjà validé le module !
        targetDisplay.textContent = "00.00 / 20";
        targetDisplay.style.color = "#2ecc71"; // Vert
        statusDisplay.textContent = "🎉 Tu as déjà validé ce module grâce à ton excellent CC ! Même avec un 0 à l'examen, tu passes.";
    } 
    else if (examRequis > 20) {
        // Le CC est trop bas, même un 20/20 à l'examen ne suffit pas pour avoir 10 pile.
        targetDisplay.textContent = examRequis.toFixed(2) + " / 20";
        targetDisplay.style.color = "#e74c3c"; // Rouge
        statusDisplay.textContent = "⚠️ Attention: Mathématiquement, le CC est trop bas pour atteindre 10/20 pile via l'examen. Il faudra viser la compensation avec les autres modules !";
    } 
    else {
        // Cas normal
        targetDisplay.textContent = examRequis.toFixed(2) + " / 20";
        
        if (examRequis <= 10) {
            targetDisplay.style.color = "#2ecc71"; // Vert (Objectif facile à atteindre)
            statusDisplay.textContent = `Objectif très accessible ! Obtiens au moins ${examRequis.toFixed(2)} à l'examen pour valider ce module.`;
        } else {
            targetDisplay.style.color = "#f39c12"; // Orange (Demande du travail)
            statusDisplay.textContent = `Courage ! Il te faut un bon ${examRequis.toFixed(2)}/20 à l'examen pour décrocher la moyenne dans ce module.`;
        }
    }
});